import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
 
/**
 * Small orbiting satellites/drones around the planet, each trailed by a
 * pulsing "energy connection" (a light traveling along a curve back to
 * the planet surface). Purely decorative motion, cheap per-frame math.
 */
function Satellite({ curve, speed, color }) {
  const satRef = useRef();
  const pulseRef = useRef();
 
  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * speed) % 1;
    const pos = curve.getPointAt(t);
    if (satRef.current) satRef.current.position.copy(pos);
 
    // pulse dot chases slightly behind the satellite along the same curve
    const pulseT = (t + 0.08) % 1;
    const pulsePos = curve.getPointAt(pulseT);
    if (pulseRef.current) pulseRef.current.position.copy(pulsePos);
  });
 
  return (
    <group>
      <mesh ref={satRef}>
        <boxGeometry args={[0.35, 0.15, 0.15]} />
        <meshStandardMaterial color="#dfefff" emissive={color} emissiveIntensity={2} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}
 
export default function EnergyConnections({ planetScale = 8, count = 5 }) {
  const curves = useMemo(() => {
    return new Array(count).fill(0).map(() => {
      const r = planetScale * (1.4 + Math.random() * 0.8);
      const tiltA = Math.random() * Math.PI * 2;
      const tiltB = Math.random() * Math.PI;
      const points = [];
      for (let i = 0; i <= 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            r * Math.cos(a) * Math.cos(tiltB),
            r * Math.sin(a) * Math.sin(tiltA) * 0.5,
            r * Math.sin(a) * Math.cos(tiltA)
          )
        );
      }
      return new THREE.CatmullRomCurve3(points, true);
    });
  }, [planetScale, count]);
 
  const colors = ['#5fd4ff', '#b47bff', '#5fd4ff', '#9ff2ff', '#b47bff'];
 
  return (
    <group>
      {curves.map((curve, i) => (
        <Satellite key={i} curve={curve} speed={0.03 + i * 0.015} color={colors[i % colors.length]} />
      ))}
    </group>
  );
}
