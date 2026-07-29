import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
 
/**
 * Decorative floating nodes (holographic drones / data satellites) with
 * thin cyan energy lines connecting nearby nodes — reads as a "galactic
 * network" surrounding the planet. Instanced spheres = 1 draw call.
 */
export default function GalacticNetwork({ nodeCount = 22, radius = 26 }) {
  const meshRef = useRef();
  const linesRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
 
  const nodes = useMemo(() => {
    return new Array(nodeCount).fill(0).map(() => {
      const r = radius * (0.8 + Math.random() * 0.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      return {
        base: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.6,
          r * Math.cos(phi)
        ),
        speed: 0.2 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, [nodeCount, radius]);
 
  const lineGeometry = useMemo(() => {
    const positions = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].base.distanceTo(nodes[j].base) < radius * 0.55) {
          positions.push(...nodes[i].base.toArray(), ...nodes[j].base.toArray());
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes, radius]);
 
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    nodes.forEach((n, i) => {
      dummy.position.set(
        n.base.x + Math.sin(t * n.speed + n.offset) * 1.2,
        n.base.y + Math.cos(t * n.speed + n.offset) * 1.2,
        n.base.z + Math.sin(t * n.speed * 0.7 + n.offset) * 1.2
      );
      dummy.scale.setScalar(0.35 + Math.sin(t * 2 + n.offset) * 0.08);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
    if (linesRef.current) linesRef.current.rotation.y = t * 0.02;
  });
 
  return (
    <group>
      <instancedMesh ref={meshRef} args={[null, null, nodeCount]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#7fe7ff"
          emissive="#66d9ff"
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.6}
        />
      </instancedMesh>
 
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#8a5bff" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}
