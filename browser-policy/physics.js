/** Native PhysX WASM dynamics for the exported Push-T scene. No renderer or policy. */
import {sampleTrainingStart} from './episode-start.js';
import {createForcePulses} from './planar-forces.js';
const ID = {p:[0,0,0],q:[0,0,0,1]};
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const valueAt=(v,i,fallback=0)=>Array.isArray(v)?v[i]??fallback:v??fallback;
const qmul=(a,b)=>[a[3]*b[0]+a[0]*b[3]+a[1]*b[2]-a[2]*b[1],a[3]*b[1]-a[0]*b[2]+a[1]*b[3]+a[2]*b[0],a[3]*b[2]+a[0]*b[1]-a[1]*b[0]+a[2]*b[3],a[3]*b[3]-a[0]*b[0]-a[1]*b[1]-a[2]*b[2]];
const rotate=(q,v)=>{const u=[q[0],q[1],q[2]],t=[2*(u[1]*v[2]-u[2]*v[1]),2*(u[2]*v[0]-u[0]*v[2]),2*(u[0]*v[1]-u[1]*v[0])];return [v[0]+q[3]*t[0]+u[1]*t[2]-u[2]*t[1],v[1]+q[3]*t[1]+u[2]*t[0]-u[0]*t[2],v[2]+q[3]*t[2]+u[0]*t[1]-u[1]*t[0]];};
const compose=(a,b)=>({p:rotate(a.q,b.p).map((v,i)=>v+a.p[i]),q:qmul(a.q,b.q)});
function alignX(axis=[1,0,0]) {const n=Math.hypot(...axis),b=axis.map(v=>v/n);if(b[0]<-.999999)return[0,0,1,0];const q=[0,-b[2],b[1],1+b[0]],qn=Math.hypot(...q);return q.map(v=>v/qn);}
function objectVertices(text,scale=[1,1,1]) {const out=[];for(const line of text.split(/\r?\n/)){if(!/^v\s/.test(line))continue;const v=line.trim().split(/\s+/).slice(1,4).map(Number);out.push(...v.map((x,i)=>x*scale[i]));}if(out.length<12)throw Error('Collision mesh has fewer than four vertices');return out;}
const point2=(pose,p)=>{const v=rotate(pose.q,[p[0],p[1],0]);return[v[0]+pose.p[0],v[1]+pose.p[1]];};
function rectangle(body,part) {const pose=compose(body,part.pose??ID),[x,y]=part.half_extents;return [[-x,-y],[x,-y],[x,y],[-x,y]].map(p=>point2(pose,p));}
const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
function intersectionArea(subject,clip) {let poly=subject;for(let i=0;i<clip.length;i++){const a=clip[i],b=clip[(i+1)%clip.length],next=[];for(let j=0;j<poly.length;j++){const p=poly[j],q=poly[(j+1)%poly.length],cp=cross(a,b,p),cq=cross(a,b,q);if(cp>=-1e-12)next.push(p);if((cp>=0)!==(cq>=0)){const t=cp/(cp-cq);next.push([p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1])]);}}poly=next;if(!poly.length)return 0;}let area=0;for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length];area+=a[0]*b[1]-a[1]*b[0];}return Math.abs(area)*.5;}

export async function createPhysics(P,spec,{assetBase='./scene-export/',getAsset,readAsset}={}) {
  const read=readAsset??(getAsset?async path=>{const bytes=await getAsset(path);return typeof bytes==='string'?bytes:new TextDecoder().decode(bytes);}:async path=>{const response=await fetch(new URL(path,new URL(assetBase,globalThis.location.href)));if(!response.ok)throw Error(`Mesh ${path}: ${response.status}`);return response.text();});
  const foundation=P.CreateFoundation(P.PHYSICS_VERSION,new P.PxDefaultAllocator(),new P.PxDefaultErrorCallback());
  const scale=new P.PxTolerancesScale(),physics=P.CreatePhysics(P.PHYSICS_VERSION,foundation,scale);P.InitExtensions(physics);
  const vec=v=>new P.PxVec3(...v),transform=(p=ID)=>new P.PxTransform(vec(p.p),new P.PxQuat(...p.q));
  const poseOf=body=>{const t=body.getGlobalPose(),p=t.p,q=t.q;return{p:[p.x,p.y,p.z],q:[q.x,q.y,q.z,q.w]};};
  const desc=new P.PxSceneDesc(scale),dispatcher=P.DefaultCpuDispatcherCreate(0);desc.gravity=vec([0,0,-9.81]);desc.cpuDispatcher=dispatcher;desc.filterShader=P.DefaultFilterShader();
  desc.solverType=spec.physics?.enable_tgs===false?P.PxSolverTypeEnum.ePGS:P.PxSolverTypeEnum.eTGS;
  const scene=physics.createScene(desc),robot=physics.createArticulationReducedCoordinate();
  robot.setArticulationFlag(P.PxArticulationFlagEnum.eFIX_BASE,true);
  robot.setArticulationFlag(P.PxArticulationFlagEnum.eDISABLE_SELF_COLLISION,true);
  robot.setSolverIterationCounts(spec.physics?.solver_position_iterations??15,spec.physics?.solver_velocity_iterations??1);robot.setSleepThreshold(0);
  const bodies=new Map(),joints=new Map(),fixedPose=new Map(),meshCache=new Map(),shapes=[];
  const shapeFlags=new P.PxShapeFlags(P.PxShapeFlagEnum.eSIMULATION_SHAPE|P.PxShapeFlagEnum.eSCENE_QUERY_SHAPE);
  const filter=new P.PxFilterData(1,1,0,0),cooking=new P.PxCookingParams(scale);
  const defaultMu=spec.physics?.default_friction??.3,gripperMu=spec.physics?.robot_gripper_friction??2;
  const armMaterial=physics.createMaterial(defaultMu,defaultMu,0),gripperMaterial=physics.createMaterial(gripperMu,gripperMu,0),tableMaterial=physics.createMaterial(spec.task.table.static_friction??.1,spec.task.table.dynamic_friction??.1,0);
  const teeSpec=spec.task.tee,teeMaterial=physics.createMaterial(teeSpec.static_friction??.6,teeSpec.dynamic_friction??.46,0);
  const linksByName=new Map(spec.robot.links.map(x=>[x.name,x]));
  async function geometry(c) {
    if(c.type==='box')return new P.PxBoxGeometry(...c.half_extents);
    if(c.type==='sphere')return new P.PxSphereGeometry(c.radius);
    let vertices=c.vertices;
    if(c.type==='mesh'&&c.mesh_key){const key=c.mesh_key+'|'+(c.scale??[1,1,1]).join(',');if(meshCache.has(key))return new P.PxConvexMeshGeometry(meshCache.get(key));const source=spec.collisionMeshes?.[c.mesh_key]?.vertices;if(!source)throw Error(`Missing exported convex hull ${c.mesh_key}`);vertices=source.map((v,i)=>v*(c.scale??[1,1,1])[i%3]);c={...c,key};}
    if(c.type==='cylinder'){vertices=[];for(let i=0;i<24;i++){const t=i*Math.PI/12;for(const z of[-c.length/2,c.length/2])vertices.push(c.radius*Math.cos(t),c.radius*Math.sin(t),z);}}
    if(c.type==='mesh'&&!vertices){const key=c.mesh_obj+'|'+(c.scale??[1,1,1]).join(',');if(meshCache.has(key))return new P.PxConvexMeshGeometry(meshCache.get(key));vertices=objectVertices(await read(c.mesh_obj),c.scale??[1,1,1]);c={...c,key};}
    if(!vertices)throw Error(`Unsupported collision geometry ${c.type}`);
    const arr=new Float32Array(vertices.flat()),nativeVertices=new P.PxArray_PxVec3(arr.length/3),ptr=nativeVertices.begin().ptr;new Float32Array(P.HEAPU8.buffer).set(arr,ptr/4);
    const points=new P.PxBoundedData();points.count=arr.length/3;points.stride=12;points.data=ptr;
    const meshDesc=new P.PxConvexMeshDesc();meshDesc.points=points;meshDesc.flags=new P.PxConvexFlags(P.PxConvexFlagEnum.eCOMPUTE_CONVEX);
    const mesh=P.CreateConvexMesh(cooking,meshDesc);P.destroy(nativeVertices);P.destroy(meshDesc);P.destroy(points);
    if(!mesh||!mesh.ptr)throw Error(`PhysX convex cooking failed: ${c.mesh_obj??c.type}`);
    meshCache.set(c.key??`generated-${meshCache.size}`,mesh);return new P.PxConvexMeshGeometry(mesh);
  }
  async function attach(body,c,material){const g=await geometry(c),shape=physics.createShape(g,material,true,shapeFlags);shape.setLocalPose(transform(c.pose??ID));shape.setSimulationFilterData(filter);shape.setContactOffset(spec.physics?.contact_offset??.02);shape.setRestOffset(spec.physics?.rest_offset??0);body.attachShape(shape);shapes.push(shape);P.destroy(g);}
  async function addLink(name,parent,globalPose){const l=linksByName.get(name);if(!l)throw Error(`Missing exported link ${name}`);const body=robot.createLink(parent,transform(globalPose));body.setName(name);body.setActorFlag(P.PxActorFlagEnum.eDISABLE_GRAVITY,true);
    const inertial=l.inertial??{};body.setMass(Math.max(inertial.mass??.001,1e-6));body.setMassSpaceInertiaTensor(vec((inertial.inertia_diag??[1e-6,1e-6,1e-6]).map(v=>Math.max(v,1e-9))));body.setCMassLocalPose(transform(inertial.pose??ID));
    for(const c of l.collisions??[])await attach(body,c,/finger/.test(name)?gripperMaterial:armMaterial);bodies.set(name,body);fixedPose.set(name,globalPose);return body;
  }
  await addLink(spec.robot.root_link,null,spec.robot.base_pose);
  const remaining=[...spec.robot.joints];while(remaining.length){let added=false;for(let i=remaining.length-1;i>=0;i--){const j=remaining[i],parent=bodies.get(j.parent);if(!parent)continue;const body=await addLink(j.child,parent,compose(fixedPose.get(j.parent),j.pose??ID));const joint=body.getInboundJoint();const alignment={p:[0,0,0],q:alignX(j.axis??[1,0,0])};joint.setParentPose(transform(compose(j.pose??ID,alignment)));joint.setChildPose(transform(alignment));
      const fixed=j.type==='fixed',axis=j.type==='prismatic'?P.PxArticulationAxisEnum.eX:P.PxArticulationAxisEnum.eTWIST;
      joint.setJointType(fixed?P.PxArticulationJointTypeEnum.eFIX:j.type==='prismatic'?P.PxArticulationJointTypeEnum.ePRISMATIC:P.PxArticulationJointTypeEnum.eREVOLUTE);
      if(!fixed){joint.setMotion(axis,Number.isFinite(j.lower)&&Number.isFinite(j.upper)?P.PxArticulationMotionEnum.eLIMITED:P.PxArticulationMotionEnum.eFREE);if(Number.isFinite(j.lower)&&Number.isFinite(j.upper))joint.setLimitParams(axis,new P.PxArticulationLimit(j.lower,j.upper));joints.set(j.name,{joint,axis,definition:j});}
      remaining.splice(i,1);added=true;
    }if(!added)throw Error('Exported articulation has unresolved parent links');}
  const ctrl=spec.controller,armNames=ctrl.arm_joint_names,arm=armNames.map(n=>{const j=joints.get(n);if(!j)throw Error(`Missing arm joint ${n}`);return j;});
  for(let i=0;i<arm.length;i++){const {joint,axis}=arm[i];joint.setDriveParams(axis,new P.PxArticulationDrive(valueAt(ctrl.kp,i),valueAt(ctrl.kd,i),valueAt(ctrl.torque_limits,i,arm[i].definition.effort??87),P.PxArticulationDriveTypeEnum.eFORCE));joint.setArmature(axis,valueAt(ctrl.armature,i));joint.setFrictionCoefficient(valueAt(ctrl.friction,i));}
  const grip=ctrl.gripper??{},gripper=[...joints.entries()].filter(([name])=>!armNames.includes(name));
  for(let i=0;i<gripper.length;i++){const {joint,axis,definition}=gripper[i][1];joint.setDriveParams(axis,new P.PxArticulationDrive(valueAt(grip.kp,i,1000),valueAt(grip.kd,i,100),valueAt(grip.force_limit??grip.force_limits,i,definition.effort??100),P.PxArticulationDriveTypeEnum.eFORCE));}
  scene.addArticulation(robot);
  const table=physics.createRigidStatic(transform(spec.task.table.pose??ID));await attach(table,{type:'box',...spec.task.table.collision},tableMaterial);scene.addActor(table);
  const tee=physics.createRigidDynamic(transform(teeSpec.pose));for(const part of teeSpec.parts)await attach(tee,{...part,type:'box'},teeMaterial);
  if(teeSpec.inertial){tee.setMass(teeSpec.inertial.mass);tee.setCMassLocalPose(transform(teeSpec.inertial.pose??ID));tee.setMassSpaceInertiaTensor(vec(teeSpec.inertial.inertia_diag));}else P.PxRigidBodyExt.prototype.setMassAndUpdateInertia(tee,teeSpec.mass??.3);tee.setSleepThreshold(0);scene.addActor(tee);
  let goalPose=structuredClone(spec.task.goal?.pose??spec.task.goal_tee?.pose??ID),stepCount=0,coveredSteps=0,prevTorque=arm.map(()=>0),target=arm.map(()=>0),seedValue=0;
  const dt=1/ctrl.simulation_hz,substeps=Math.round(ctrl.simulation_hz/ctrl.policy_hz);
  const forcePulses=createForcePulses(ctrl.simulation_hz,(target,force)=>{
    const body=target==='tee'?tee:bodies.get('fr3_gripper_base');
    const value=vec(force);body.addForce(value,P.PxForceModeEnum.eFORCE,true);P.destroy(value);
  });
  function applyPlanarForce(target,force){return forcePulses.start(target,force);}
  function getForces(){return forcePulses.snapshot();}
  function getProprio(){return new Float32Array([...arm.map(({joint,axis})=>joint.getJointPosition(axis)),...arm.map(({joint,axis})=>joint.getJointVelocity(axis))]);}
  function getBodyPoses(){const result=Object.fromEntries([...bodies].map(([name,body])=>[name,poseOf(body)]));result.tee=poseOf(tee);result.goal=structuredClone(goalPose);result.table=poseOf(table);return result;}
  function coverage(){const a=teeSpec.parts.map(p=>rectangle(poseOf(tee),p)),parts=spec.task.goal?.parts??teeSpec.parts,b=parts.map(p=>rectangle(goalPose,p));let area=0;for(const x of a)for(const y of b)area+=intersectionArea(x,y);const goalArea=parts.reduce((s,p)=>s+4*p.half_extents[0]*p.half_extents[1],0);return clamp(area/goalArea,0,1);}
  function getState(){const q=getProprio(),cover=coverage(),v=tee.getLinearVelocity(),w=tee.getAngularVelocity(),speed=Math.hypot(v.x,v.y,v.z),angularSpeedZ=Math.abs(w.z),successSpec=spec.task.success??{};return{seed:seedValue,step:stepCount,time:stepCount/ctrl.policy_hz,coverage:cover,covered:cover>=(successSpec.coverage_threshold??.9),settled:speed<(successSpec.linear_speed_max??.02)&&angularSpeedZ<(successSpec.angular_speed_z_max??.1),linearSpeed:speed,angularSpeedZ,success:coveredSteps>=(successSpec.hold_control_steps??4),qpos:Array.from(q.slice(0,7)),qvel:Array.from(q.slice(7)),tee:poseOf(tee),goal:structuredClone(goalPose),bodyPoses:getBodyPoses()};}
  function reset(seed=0,{randomizeTee=false}={}){seedValue=seed;stepCount=0;coveredSteps=0;prevTorque.fill(0);robot.setRootGlobalPose(transform(spec.robot.base_pose));
    forcePulses.clear();bodies.get('fr3_gripper_base')?.clearForce(P.PxForceModeEnum.eFORCE);
    const start=randomizeTee?sampleTrainingStart(spec,seed):{tee:teeSpec.pose,goal:spec.task.goal?.pose??spec.task.goal_tee?.pose??ID};goalPose=structuredClone(start.goal);
    const order=spec.robot.joint_order??[...joints.keys()];for(let i=0;i<order.length;i++){const entry=joints.get(order[i]);if(!entry)continue;const q=spec.robot.qpos_initial[i]??0;entry.joint.setJointPosition(entry.axis,q);entry.joint.setJointVelocity(entry.axis,spec.robot.qvel_initial?.[i]??0);entry.joint.setDriveTarget(entry.axis,q);}
    robot.updateKinematic(new P.PxArticulationKinematicFlags(P.PxArticulationKinematicFlagEnum.ePOSITION|P.PxArticulationKinematicFlagEnum.eVELOCITY));
    tee.setGlobalPose(transform(start.tee));tee.setLinearVelocity(vec([0,0,0]));tee.setAngularVelocity(vec([0,0,0]));tee.clearForce(P.PxForceModeEnum.eFORCE);tee.clearTorque(P.PxForceModeEnum.eFORCE);tee.wakeUp();robot.wakeUp();target=arm.map(({joint,axis})=>joint.getJointPosition(axis));return getState();}
  function step(action){if(!action||action.length<7||!Array.from(action).every(Number.isFinite))throw Error('Policy action must contain at least seven finite values');
    target=arm.map(({joint,axis},i)=>{const lo=valueAt(ctrl.action_lower,i,-.1),hi=valueAt(ctrl.action_upper,i,.1),delta=lo+(clamp(action[i],-1,1)+1)*.5*(hi-lo);return joint.getJointPosition(axis)+delta;});
    for(let k=0;k<substeps;k++){for(let i=0;i<arm.length;i++){const {joint,axis}=arm[i],q=joint.getJointPosition(axis),qd=joint.getJointVelocity(axis),kp=valueAt(ctrl.kp,i),kd=valueAt(ctrl.kd,i);let goal=target[i];if(ctrl.torque_rate_limit_nmps){const desired=kp*(goal-q)-kd*qd,maxDelta=ctrl.torque_rate_limit_nmps*dt,tau=prevTorque[i]+clamp(desired-prevTorque[i],-maxDelta,maxDelta);prevTorque[i]=tau;if(kp>1e-6)goal=q+(tau+kd*qd)/kp;}joint.setDriveTarget(axis,goal);}
      for(let i=0;i<gripper.length;i++){const {joint,axis,definition}=gripper[i][1];joint.setDriveTarget(axis,valueAt(grip.target_positions??grip.closed_position??grip.closed_positions,i,definition.lower??0));}
      forcePulses.step();scene.simulate(dt);scene.fetchResults(true);
    }stepCount++;const state=getState();coveredSteps=state.covered&&state.settled?coveredSteps+1:0;state.success=coveredSteps>=(spec.task.success?.hold_control_steps??4);return state;}
  function dispose(){scene.release();robot.release();table.release();tee.release();P.CloseExtensions();physics.release();foundation.release();}
  reset(0);return{reset,step,getProprio,getBodyPoses,getState,applyPlanarForce,getForces,dispose,engine:'PhysX 5.6.1 WASM',spec};
}
