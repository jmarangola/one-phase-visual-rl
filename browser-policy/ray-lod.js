// Standalone integration reference. Call only for the optional spectator clone.
// THREE and getAsset are injected so this helper does not touch the live renderer.
export async function loadRayLod({THREE,getAsset,basePath='assets/ray-lod/'}) {
  const manifest=JSON.parse(new TextDecoder().decode(await getAsset(basePath+'manifest.json')));
  if(manifest.version!==1)throw new Error('Unsupported ray LOD manifest');
  const bytes=await getAsset(basePath+manifest.binary);
  const buffer=bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength);
  const records=new Map();
  for(const asset of manifest.assets)for(const primitive of asset.primitives)
    records.set(JSON.stringify([asset.source,primitive.meshIndex,primitive.primitiveIndex]),primitive);
  function array(descriptor) {
    const Type={float32:Float32Array,uint32:Uint32Array}[descriptor.componentType];
    const length=descriptor.count*descriptor.itemSize;
    if(!Type||descriptor.byteOffset%4||descriptor.byteOffset<0||descriptor.byteOffset+length*4>buffer.byteLength)
      throw new Error('Invalid ray LOD buffer descriptor');
    return new Type(buffer,descriptor.byteOffset,length).slice();
  }
  return {manifest,createGeometry(source,meshIndex,primitiveIndex) {
    const record=records.get(JSON.stringify([source,meshIndex,primitiveIndex]));
    if(!record)return null;
    const geometry=new THREE.BufferGeometry();
    const names={POSITION:'position',NORMAL:'normal',TEXCOORD_0:'uv',TEXCOORD_1:'uv1',COLOR_0:'color',TANGENT:'tangent'};
    try {
      for(const [semantic,descriptor]of Object.entries(record.attributes)) {
        if(!names[semantic])throw new Error('Unsupported ray LOD attribute '+semantic);
        geometry.setAttribute(names[semantic],new THREE.BufferAttribute(array(descriptor),descriptor.itemSize));
      }
      geometry.setIndex(new THREE.BufferAttribute(array(record.indices),1));
      geometry.computeBoundingBox();geometry.computeBoundingSphere();
      return geometry;
    }catch(error){geometry.dispose();throw error;}
  }};
}
