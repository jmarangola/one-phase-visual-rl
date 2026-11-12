/** Display the same raw observations sent to inference, without another render. */
export function createPolicyInputs(root,spec) {
  if(!root)return null;
  const canvas=root.querySelector('#policy-camera');
  canvas.width=spec.camera.width;canvas.height=spec.camera.height;
  const context=canvas.getContext('2d',{alpha:false});
  const frame=context.createImageData(canvas.width,canvas.height);
  const names=spec.controller.arm_joint_names;
  const definitions=new Map(spec.robot.joints.map(joint=>[joint.name,joint]));
  const list=root.querySelector('#joint-readings');
  const rows=names.map((name,index)=>{
    const row=document.createElement('div');row.className='joint-row';row.setAttribute('role','listitem');
    row.innerHTML=`<span class="joint-label" aria-hidden="true">J${index+1}</span><span aria-hidden="true"><span class="joint-value position-value">—</span><span class="joint-track"><span class="position-marker" hidden></span></span></span><span aria-hidden="true"><span class="joint-value velocity-value">—</span><span class="joint-track velocity-track"><span class="velocity-marker"></span></span></span>`;
    row.setAttribute('aria-label',`Joint ${index+1}: waiting for policy input`);
    list.append(row);
    return {row,definition:definitions.get(name),position:row.querySelector('.position-value'),velocity:row.querySelector('.velocity-value'),positionMarker:row.querySelector('.position-marker'),velocityMarker:row.querySelector('.velocity-marker')};
  });
  const clamp=value=>Math.max(0,Math.min(1,value));
  const format=value=>(Math.abs(value)<.005?0:value).toFixed(2);
  return {
    update(rgb,proprio,step=0){
      // readPolicyRGB already supplies top-to-bottom RGB. Do not flip, recolor,
      // normalize or modify the worker's input arrays for this visualization.
      for(let source=0,destination=0;source<rgb.length;source+=3,destination+=4){
        frame.data[destination]=rgb[source];frame.data[destination+1]=rgb[source+1];frame.data[destination+2]=rgb[source+2];frame.data[destination+3]=255;
      }
      context.putImageData(frame,0,0);
      rows.forEach(({row,definition,position,velocity,positionMarker,velocityMarker},index)=>{
        const q=proprio[index],qd=proprio[index+names.length];
        position.textContent=format(q);velocity.textContent=format(qd);
        const label=`Joint ${index+1}: position ${q.toFixed(3)} rad; velocity ${qd.toFixed(3)} rad/s`;
        row.setAttribute('aria-label',label);row.title=label;
        // Meters use the exported joint and velocity limits, not policy normalization.
        const lo=definition.lower,hi=definition.upper,speed=definition.velocity;
        positionMarker.style.left=`${100*clamp((q-lo)/(hi-lo))}%`;positionMarker.hidden=false;
        const signed=Math.max(-1,Math.min(1,qd/speed));
        velocityMarker.style.left=`${50+Math.min(0,signed)*50}%`;velocityMarker.style.width=`${Math.abs(signed)*50}%`;
        velocityMarker.classList.toggle('negative',signed<0);
      });
      root.classList.add('has-inputs');root.dataset.observationStep=String(step);
    },
  };
}
