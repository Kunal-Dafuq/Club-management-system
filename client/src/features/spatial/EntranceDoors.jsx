import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { spatialAudio } from "./audioManager";

export default function EntranceDoors({ isOpen, onOpenDoors, position = [0, 0, 15] }) {
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();
  const lockGlowRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Animate doors swinging open when isOpen === true
  useFrame((state, delta) => {
    const targetLeftAngle = isOpen ? -Math.PI * 0.75 : 0;
    const targetRightAngle = isOpen ? Math.PI * 0.75 : 0;

    if (leftDoorRef.current && rightDoorRef.current) {
      leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        leftDoorRef.current.rotation.y,
        targetLeftAngle,
        delta * 3.5
      );
      rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        rightDoorRef.current.rotation.y,
        targetRightAngle,
        delta * 3.5
      );
    }

    // Pulse lock glow
    if (lockGlowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.15;
      lockGlowRef.current.scale.set(scale, scale, scale);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      spatialAudio.playDoorOpen();
      onOpenDoors();
    }
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      setHovered(true);
      spatialAudio.playHover();
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <group position={position}>
      {/* Archway Frame */}
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[11, 9.5, 0.8]} />
        <meshStandardMaterial color="#090A0F" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Glowing Neon Archway Border */}
      <mesh position={[0, 4.5, 0.45]}>
        <boxGeometry args={[10.4, 8.8, 0.1]} />
        <meshBasicMaterial color={hovered ? "#06B6D4" : "#7C3AED"} />
      </mesh>

      {/* Left Door Panel */}
      <group position={[-4.5, 4.2, 0]} ref={leftDoorRef}>
        <mesh
          position={[2.25, 0, 0]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[4.5, 8.2, 0.4]} />
          <meshStandardMaterial
            color={hovered ? "#161D3B" : "#0D1124"}
            roughness={0.15}
            metalness={0.8}
            emissive={hovered ? "#06B6D4" : "#000000"}
            emissiveIntensity={0.25}
          />
        </mesh>
      </group>

      {/* Right Door Panel */}
      <group position={[4.5, 4.2, 0]} ref={rightDoorRef}>
        <mesh
          position={[-2.25, 0, 0]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[4.5, 8.2, 0.4]} />
          <meshStandardMaterial
            color={hovered ? "#161D3B" : "#0D1124"}
            roughness={0.15}
            metalness={0.8}
            emissive={hovered ? "#06B6D4" : "#000000"}
            emissiveIntensity={0.25}
          />
        </mesh>
      </group>

      {/* Center Lock Cyber Insignia & Hologram Label */}
      {!isOpen && (
        <group position={[0, 4.5, 0.35]} onClick={handleClick} onPointerOver={handlePointerOver}>
          <mesh ref={lockGlowRef}>
            <circleGeometry args={[0.8, 32]} />
            <meshBasicMaterial color={hovered ? "#06B6D4" : "#7C3AED"} />
          </mesh>

          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
            <Text
              position={[0, 1.8, 0.3]}
              fontSize={0.45}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf"
            >
              CHARTERED UNIVERSITY GATES
            </Text>
            <Text
              position={[0, -1.5, 0.3]}
              fontSize={0.28}
              color="#06B6D4"
              anchorX="center"
              anchorY="middle"
            >
              [ CLICK TO ENTER ORGOS UNIVERSE ]
            </Text>
          </Float>
        </group>
      )}

      {/* Metallic Floor Reflective Slab */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 2]}>
        <planeGeometry args={[24, 18]} />
        <meshStandardMaterial color="#0A0D18" roughness={0.3} metalness={0.9} />
      </mesh>
    </group>
  );
}
