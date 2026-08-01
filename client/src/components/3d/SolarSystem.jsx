import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import ClubPlanet from "./ClubPlanet";

/**
 * Realistic Solar System Scene (Act 1: Space Approach)
 * Features an authentic incandescent Sun with coronal glow and our Exoplanet (ClubPlanet)
 * with rings, moons, and galactic network nodes.
 */
const SolarSystem = ({ progress = 0 }) => {
  const systemGroupRef = useRef();
  const moonRef = useRef();
  const ringRef = useRef();

  const visibility = useMemo(() => {
    if (progress > 0.35) return 0;
    return Math.max(0, 1 - progress * 2.8);
  }, [progress]);

  useFrame((state, delta) => {
    if (visibility <= 0.01) return;
    const time = state.clock.getElapsedTime();

    if (systemGroupRef.current) {
      systemGroupRef.current.rotation.y += delta * 0.05;
    }

    if (moonRef.current) {
      moonRef.current.position.x = Math.cos(time * 0.5) * 5.2;
      moonRef.current.position.z = Math.sin(time * 0.5) * 5.2;
      moonRef.current.position.y = Math.sin(time * 0.3) * 0.8;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.02;
    }
  });

  if (visibility <= 0.01) return null;

  return (
    <group ref={systemGroupRef} scale={[visibility, visibility, visibility]}>
      {/* 1. Realistic Incandescent Solar Star (Sun) */}
      <group position={[-30, 15, -45]}>
        <mesh>
          <sphereGeometry args={[8, 32, 32]} />
          <meshBasicMaterial color="#FFFBEB" />
        </mesh>
        <mesh scale={1.25}>
          <sphereGeometry args={[8, 32, 32]} />
          <meshBasicMaterial
            color="#F59E0B"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* 2. Primary Exoplanet (ClubPlanet) */}
      <ClubPlanet position={[0, 0, 0]} />

      {/* 3. Orbiting Planetary Dust & Debris Ring Belt */}
      <mesh
        ref={ringRef}
        rotation={[Math.PI / 2.8, 0.2, 0]}
        position={[0, 0, 0]}
      >
        <ringGeometry args={[3.4, 6.2, 64]} />
        <meshStandardMaterial
          color="#38BDF8"
          side={THREE.DoubleSide}
          transparent
          opacity={0.4}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* 4. Orbiting Rocky Moon */}
      <mesh ref={moonRef} position={[5.2, 0, 0]}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial
          color="#94A3B8"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

export default SolarSystem;
