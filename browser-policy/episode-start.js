// Matches PushTRealEnv._initialize_task: independent uniform x/y offsets
// from the goal and uniform yaw. The website keeps the goal at its nominal pose.
export function seededRandom(seed) {
  let state=seed>>>0;
  return ()=>{
    let value=state=(state+0x6d2b79f5)>>>0;
    value=Math.imul(value^(value>>>15),value|1);
    value^=value+Math.imul(value^(value>>>7),value|61);
    return ((value^(value>>>14))>>>0)/4294967296;
  };
}

export function sampleTrainingStart(spec,seed) {
  const tee=spec.task.tee,goal=structuredClone(spec.task.goal.nominal_pose),random=seededRandom(seed);
  const uniform=([low,high])=>low+(high-low)*random();
  const x=goal.p[0]+uniform(tee.spawn_dx_range),y=goal.p[1]+uniform(tee.spawn_dy_range),yaw=uniform(tee.spawn_yaw_range);
  return {goal,tee:{p:[x,y,tee.pose.p[2]],q:[0,0,Math.sin(yaw/2),Math.cos(yaw/2)]}};
}
