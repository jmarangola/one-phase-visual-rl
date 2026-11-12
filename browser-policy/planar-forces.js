export const FORCE_LIMITS=Object.freeze({tee:5,gripper:80});
export const FORCE_DURATIONS=Object.freeze({tee:.05,gripper:.2});
export const MAX_DRAG_METERS=.2;
export const MIN_DRAG_PIXELS=6;

export function clampPlanarForce(target,force){
  const limit=FORCE_LIMITS[target];
  if(!limit||!force||!Number.isFinite(force[0])||!Number.isFinite(force[1]))return null;
  const magnitude=Math.hypot(force[0],force[1]);if(magnitude<1e-8)return null;
  const scale=Math.min(1,limit/magnitude);
  return [force[0]*scale,force[1]*scale,0];
}

export function dragForce(target,delta,pixels){
  if(pixels<MIN_DRAG_PIXELS)return null;
  const gain=FORCE_LIMITS[target]/MAX_DRAG_METERS;
  return clampPlanarForce(target,[delta[0]*gain,delta[1]*gain]);
}

/** Fixed world-space force, reapplied before each physics substep (never an impulse). */
export function createForcePulses(simulationHz,apply){
  const substeps=Object.fromEntries(Object.entries(FORCE_DURATIONS).map(([target,duration])=>{
    const steps=Math.round(duration*simulationHz);
    if(Math.abs(steps/simulationHz-duration)>1e-9)throw Error('Force duration must be an exact number of physics substeps');
    return [target,steps];
  })),active=new Map();let id=0;
  return {
    start(target,requested){
      const force=clampPlanarForce(target,requested);if(!force)return null;
      const pulse={id:++id,target,force,remainingSteps:substeps[target]};
      // A new release replaces this target's pulse; repeated drags cannot stack past its cap.
      active.set(target,pulse);return {...pulse,force:[...force],duration:FORCE_DURATIONS[target]};
    },
    step(){for(const [target,pulse] of active){apply(target,pulse.force);if(--pulse.remainingSteps===0)active.delete(target);}},
    snapshot(){return [...active.values()].map(pulse=>({id:pulse.id,target:pulse.target,force:[...pulse.force],remainingSeconds:pulse.remainingSteps/simulationHz}));},
    clear(){active.clear();},
    get active(){return active.size>0;},
  };
}
