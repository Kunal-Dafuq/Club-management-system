import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Realistic Exoplanet (ClubPlanet)
 * Generates a procedural continental map with deep oceans, glowing urban networks,
 * and a custom Fresnel atmospheric rim glow.
 */
const ClubPlanet = ({ position = [0, 0, 0] }) => {
  const planetRef = useRef();
  const atmosphereRef = useRef();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Deep Ocean Base
    ctx.fillStyle = "#090D16";
    ctx.fillRect(0, 0, 1024, 512);

    // Continents / Landmasses
    ctx.fillStyle = "#111827";
    for (let i = 0; i < 45; i++) {
      const x = Math.random() * 1024;
      const y = 80 + Math.random() * 350;
      const r = 30 + Math.random() * 90;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glowing Urban Node Networks
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * 1024;
      const y = 60 + Math.random() * 390;
      const isCyan = Math.random() > 0.4;
      ctx.fillStyle = isCyan ? "#06B6D4" : "#8B5CF6";
      ctx.beginPath();
      ctx.arc(x, y, 1.5 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();

      // Soft Glow
      ctx.fillStyle = isCyan
        ? "rgba(6, 182, 212, 0.25)"
        : "rgba(139, 92, 246, 0.25)";
      ctx.beginPath();
      ctx.arc(x, y, 6 + Math.random() * 6, 0, Math.PI * 2);
      ctx.fill();
    }

    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.ClampToEdgeWrapping;
    return map;
  }, []);

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group position={position}>
      {/* Primary Exoplanet Sphere */}
      <mesh ref={planetRef} castShadow receiveShadow>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.7}
          metalness={0.2}
          emissive="#06B6D4"
          emissiveMap={texture}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Outer Atmospheric Fresnel Rim Glow */}
      <mesh ref={atmosphereRef} scale={1.06}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default ClubPlanet;
