import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { spatialAudio } from "./audioManager";

function SignboardNode({ node, onEnterRoom }) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (hovered ? 3.0 : 0.6);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    spatialAudio.playTeleport();
    onEnterRoom(node);
  };

  const handleOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    spatialAudio.playHover();
    document.body.style.cursor = "pointer";
  };

  const handleOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <group position={[0, 4.2, node.z]} onClick={handleClick} onPointerOver={handleOver} onPointerOut={handleOut}>
      {/* Holographic Portal Ring */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[3.8, 0.14, 16, 64]} />
        <meshBasicMaterial color={hovered ? "#06B6D4" : node.color} />
      </mesh>

      {/* Backdrop Glass Panel */}
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[7.2, 3.8]} />
        <meshStandardMaterial
          color="#0B0E1B"
          roughness={0.2}
          metalness={0.9}
          emissive={hovered ? node.color : "#000000"}
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Floating Typography Sign */}
      <Float speed={2.5} rotationIntensity={0.08} floatIntensity={0.35}>
        <Text
          position={[0, 0.9, 0.1]}
          fontSize={0.42}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {node.title}
        </Text>

        <Text
          position={[0, 0.15, 0.1]}
          fontSize={0.21}
          color={hovered ? "#06B6D4" : node.color}
          anchorX="center"
          anchorY="middle"
        >
          {node.subtitle}
        </Text>

        <Text
          position={[0, -0.9, 0.1]}
          fontSize={0.24}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {hovered ? "[ CLICK TO ENTER METRO STATION ]" : "[ HOVER TO SCAN METRICS ]"}
        </Text>
      </Float>
    </group>
  );
}

export default function CampusCorridor({ activeLine, onEnterRoom }) {
  const primaryColor = activeLine?.themeColor || "#06B6D4";
  const secondaryColor = activeLine?.secondaryColor || "#7C3AED";
  const stations = activeLine?.stations || [];

  return (
    <group>
      {/* Metro Tunnel Metallic Floor Slab (Z = 0 to -110) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -50]}>
        <planeGeometry args={[24, 120]} />
        <meshStandardMaterial color="#0A0C16" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Subway Tracks & Glowing Neon Floor Rails */}
      <mesh position={[-3.5, 0.06, -50]}>
        <boxGeometry args={[0.25, 0.12, 120]} />
        <meshStandardMaterial color="#1E233E" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[3.5, 0.06, -50]}>
        <boxGeometry args={[0.25, 0.12, 120]} />
        <meshStandardMaterial color="#1E233E" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[-7.5, 0.1, -50]}>
        <boxGeometry args={[0.2, 0.2, 120]} />
        <meshBasicMaterial color={primaryColor} />
      </mesh>
      <mesh position={[7.5, 0.1, -50]}>
        <boxGeometry args={[0.2, 0.2, 120]} />
        <meshBasicMaterial color={secondaryColor} />
      </mesh>

      {/* Arched Subway Tunnel Ribs (Torus Rings every 16 units) */}
      {[0, -16, -32, -48, -64, -80, -96].map((zPos, i) => (
        <group key={i} position={[0, 4.5, zPos]}>
          {/* Arched Rib Frame */}
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[8.8, 0.25, 12, 32, Math.PI]} />
            <meshStandardMaterial color="#12162B" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Neon Glow Arch Strip */}
          <mesh rotation={[0, 0, 0]} position={[0, 0, 0.15]}>
            <torusGeometry args={[8.6, 0.08, 12, 32, Math.PI]} />
            <meshBasicMaterial color={i % 2 === 0 ? primaryColor : secondaryColor} />
          </mesh>
        </group>
      ))}

      {/* Left Wall Metro Pillars */}
      {[0, -16, -32, -48, -64, -80, -96].map((zPos, i) => (
        <group key={i} position={[-8.8, 4.5, zPos]}>
          <mesh>
            <boxGeometry args={[1, 9, 1]} />
            <meshStandardMaterial color="#12162B" roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh position={[0.55, 0, 0]}>
            <boxGeometry args={[0.1, 7, 0.2]} />
            <meshBasicMaterial color={i % 2 === 0 ? primaryColor : secondaryColor} />
          </mesh>
        </group>
      ))}

      {/* Right Wall Metro Pillars */}
      {[0, -16, -32, -48, -64, -80, -96].map((zPos, i) => (
        <group key={i} position={[8.8, 4.5, zPos]}>
          <mesh>
            <boxGeometry args={[1, 9, 1]} />
            <meshStandardMaterial color="#12162B" roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh position={[-0.55, 0, 0]}>
            <boxGeometry args={[0.1, 7, 0.2]} />
            <meshBasicMaterial color={i % 2 === 0 ? secondaryColor : primaryColor} />
          </mesh>
        </group>
      ))}

      {/* Floating Holographic Station Portals */}
      {stations.map((node) => (
        <SignboardNode key={node.id} node={node} onEnterRoom={onEnterRoom} />
      ))}
    </group>
  );
}
