/** Match exported robot colors rather than assuming SAPIEN and GLB mesh order agree. */
export function matchNativeMaterial(materials,color) {
  let best=materials[0],distance=Infinity;
  for(const material of materials){
    if(!material.base_color)continue;
    const candidate=material.base_color.slice(0,3).reduce((sum,value,index)=>sum+(value-color[index])**2,0);
    if(candidate<distance){best=material;distance=candidate;}
  }
  return best;
}
