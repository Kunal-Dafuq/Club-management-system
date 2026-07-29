import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
 
/**
 * Dense multi-layer starfield with subtle parallax drift + a few
 * drifting "space dust" points for depth. Cheap: single BufferGeometry
 * per layer, no per-star draw calls.
 */
export default function Starfield({ count = 4000, radius = 300 }) {
  const groupRef = useRef();
  const dustRef = useRef();
 
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#bcd9ff'),
      new THREE.Color('#9ad8ff'),
      new THREE.Color('#d9b8ff'),
    ];
 
    for (let i = 0; i < count; i++) {
      // distribute on a spherical shell for an even "deep space" look
      const r = radius * (0.6 + Math.random() * 0.4);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
 
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
 
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count, radius]);
 
  const dustPositions = useMemo(() => {
    const n = Math.floor(count * 0.15);
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * radius * 0.6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * radius * 0.6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * radius * 0.6;
    }
    return arr;
  }, [count, radius]);
 
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.003;
    if (dustRef.current) dustRef.current.rotation.y -= delta * 0.008;
  });
 
  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.9}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
 
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustPositions.length / 3}
            array={dustPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          color="#8fd8ff"
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}
