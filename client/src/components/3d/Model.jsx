import { useGLTF } from '@react-three/drei';
 
/**
 * Thin wrapper so any part of the experience can swap a procedural
 * placeholder (planet, campus, office) for a real .glb asset later
 * without touching Scene.jsx — just render <Model url="/models/x.glb" />
 * in place of the procedural component.
 *
 * Usage:
 *   <Model url="/models/campus.glb" scale={1} position={[0, -14, -30]} />
 *
 * Remember to call Model.preload('/models/campus.glb') once (e.g. in
 * HeroScene.jsx) so the asset starts loading before it's needed.
 */
export default function Model({ url, ...props }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} {...props} />;
}
 
Model.preload = (url) => useGLTF.preload(url);
