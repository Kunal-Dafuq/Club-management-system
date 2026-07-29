import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Realistic Atmospheric Entry & Volumetric Cloud Dive (Section 2 -> 3)
 * Renders atmospheric haze layers, volumetric cloud sheets, and
 * plasma entry speed streaks as the camera plunges from space to campus.
 */
const AtmosphereTunnel = ({ progress = 0 }) => {
  const streaksRef = useRef();
  const cloudGroupRef = useRef();

  // Active during atmosphere plunge (progress 0.16 to 0.55)
  const activeIntensity = useMemo(() => {
    if (progress < 0.15 || progress > 0.58) return 0;
    const fadeIn = Math.min(1, (progress - 0.15) * 8);
    const fadeOut = Math.min(1, (0.58 - progress) * 8);
    return Math.min(fadeIn, fadeOut);
  }, [progress]);

  // High-speed atmospheric entry streaks (heat/plasma burn lines)
  const streakPositions = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 1.5 + Math.random() * 22;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = -50 + Math.random() * 90;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (streaksRef.current && activeIntensity > 0) {
      streaksRef.current.position.z += delta * 60;
      if (streaksRef.current.position.z > 40) {
        streaksRef.current.position.z = -40;
      }
    }

    // Volumetric cloud layer drift
    if (cloudGroupRef.current && activeIntensity > 0) {
      cloudGroupRef.current.rotation.z += delta * 0.08;
      cloudGroupRef.current.children.forEach((cloud, idx) => {
        cloud.position.y = Math.sin(time * 0.8 + idx) * 0.4;
      });
    }
  });

  if (activeIntensity <= 0.01) return null;

  return (
    <group position={[0, -2, -28]}>
      {/* 1. Atmospheric Plasma Entry Streaks */}
      <points ref={streaksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[streakPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.9}
          color="#06B6D4"
          transparent
          opacity={activeIntensity * 0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 2. Realistic Volumetric Stratosphere Cloud Sheets */}
      <group ref={cloudGroupRef}>
        {[-25, -15, -5, 5, 15].map((zPos, idx) => (
          <mesh key={idx} position={[0, 0, zPos]} rotation={[0, 0, idx * 1.2]}>
            <ringGeometry args={[3, 25, 48]} />
            <meshBasicMaterial
              color={idx % 2 === 0 ? "#1E293B" : "#06B6D4"}
              side={THREE.DoubleSide}
              transparent
              opacity={activeIntensity * 0.35}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* 3. Atmospheric Warm Horizon Haze */}
      <mesh position={[0, -5, -30]}>
        <sphereGeometry args={[40, 32, 32]} />
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={activeIntensity * 0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default AtmosphereTunnel;
