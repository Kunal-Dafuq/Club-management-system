import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { CAMPUS_BUILDINGS } from "../../constants/landingData";

/**
 * Realistic University Campus & Grand Main Gates (Section 3)
 * Renders:
 * - Monumental University Main Entrance Gate with illuminated arch
 * - Tree-lined Campus Boulevard with street lamps
 * - Architectural Academic Buildings with illuminated window grids
 * - Modern entrance gates to "The Club Office"
 */
const Campus3D = ({ progress = 0 }) => {
  const campusGroupRef = useRef();
  const gateRef = useRef();

  // Active during Section 3 & 4 (progress 0.35 to 0.85)
  const visibility = useMemo(() => {
    if (progress < 0.32 || progress > 0.85) return 0;
    const fadeIn = Math.min(1, (progress - 0.32) * 8);
    const fadeOut = Math.min(1, (0.85 - progress) * 8);
    return Math.min(fadeIn, fadeOut);
  }, [progress]);

  useFrame((state) => {
    if (visibility <= 0.01) return;
    const time = state.clock.getElapsedTime();

    // Subtle ambient lighting pulse on the Main Gates
    if (gateRef.current) {
      gateRef.current.position.y = -6 + Math.sin(time * 1.5) * 0.02;
    }
  });

  if (visibility <= 0.01) return null;

  return (
    <group
      ref={campusGroupRef}
      position={[0, -6, -42]}
      scale={[visibility, visibility, visibility]}
    >
      {/* 1. Realistic Terrazzo/Asphalt Campus Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial
          color="#0B0F19"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* 2. Central Campus Boulevard Pathway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -10]}>
        <planeGeometry args={[10, 80]} />
        <meshStandardMaterial
          color="#161E2E"
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {/* =========================================================
          3. GRAND UNIVERSITY MAIN ENTRANCE GATES (Z = 12)
      ========================================================= */}
      <group ref={gateRef} position={[0, 0, 12]}>
        {/* Left Stone Column Pillar */}
        <mesh position={[-5.5, 4.5, 0]}>
          <boxGeometry args={[1.8, 9, 1.8]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.5}
            metalness={0.4}
          />
        </mesh>

        {/* Right Stone Column Pillar */}
        <mesh position={[5.5, 4.5, 0]}>
          <boxGeometry args={[1.8, 9, 1.8]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.5}
            metalness={0.4}
          />
        </mesh>

        {/* Sweeping Architectural Gate Arch Beam Spanning Across */}
        <mesh position={[0, 9.5, 0]}>
          <boxGeometry args={[14, 1.6, 2.2]} />
          <meshStandardMaterial
            color="#1E293B"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Glowing Gate Crest Emblem */}
        <mesh position={[0, 9.5, 1.2]}>
          <boxGeometry args={[8, 0.6, 0.2]} />
          <meshBasicMaterial color="#06B6D4" />
        </mesh>

        {/* University Gate Banner (HTML Signage) */}
        <Html
          position={[0, 11.2, 0]}
          center
          distanceFactor={18}
          style={{
            pointerEvents: "none",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          <div className="px-5 py-2 rounded-2xl border border-cyan-400/50 bg-black/80 backdrop-blur-xl text-center shadow-[0_0_30px_rgba(6,182,212,0.4)]">
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-cyan-400 font-extrabold">
              UNIVERSITAS CAMPUS
            </div>
            <div className="text-sm font-extrabold text-white tracking-wider mt-0.5">
              MAIN ENTRANCE // GATE 01
            </div>
          </div>
        </Html>

        {/* Entrance Gate Pillar Lamps */}
        {[-5.5, 5.5].map((x, i) => (
          <mesh key={i} position={[x, 9.5, 0]}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshBasicMaterial
              color="#06B6D4"
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
      </group>

      {/* =========================================================
          4. CAMPUS ACADEMIC ARCHITECTURE FLANKING THE BOULEVARD
      ========================================================= */}
      {CAMPUS_BUILDINGS.map((b) => (
        <group key={b.id} position={b.position}>
          {/* Main Architectural Structure */}
          <mesh position={[0, b.height / 2, 0]}>
            <boxGeometry args={[4.2, b.height, 4.2]} />
            <meshStandardMaterial
              color={b.isGlow ? "#0E1726" : "#1E293B"}
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>

          {/* Architectural Window Grid Lines */}
          <mesh position={[0, b.height / 2, 2.15]}>
            <planeGeometry args={[3.6, b.height * 0.85]} />
            <meshBasicMaterial
              color={b.isGlow ? "#06B6D4" : "#475569"}
              transparent
              opacity={b.isGlow ? 0.35 : 0.15}
            />
          </mesh>

          {/* Special High-Tech Exterior for The Club Office Building */}
          {b.isGlow && (
            <>
              {/* Entrance Overhang Canopy */}
              <mesh position={[0, 2.5, 3]}>
                <boxGeometry args={[5, 0.4, 2]} />
                <meshStandardMaterial
                  color="#334155"
                  roughness={0.2}
                  metalness={0.8}
                />
              </mesh>
              {/* Glowing Club Office Beacon */}
              <mesh position={[0, b.height + 7, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 14, 16]} />
                <meshBasicMaterial
                  color="#06B6D4"
                  transparent
                  opacity={0.8}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            </>
          )}

          {/* Architectural Building Badge */}
          <Html
            position={[0, b.height + 2.2, 0]}
            center
            distanceFactor={18}
            style={{
              pointerEvents: "none",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            <div
              className={`px-3.5 py-1.5 rounded-xl border backdrop-blur-md text-xs font-mono font-bold shadow-xl transition-all ${
                b.isGlow
                  ? "bg-cyan-500/30 border-cyan-400 text-white shadow-cyan-500/50 scale-110"
                  : "bg-black/70 border-white/20 text-zinc-300"
              }`}
            >
              {b.isGlow && (
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-ping" />
              )}
              {b.name}
            </div>
          </Html>
        </group>
      ))}

      {/* =========================================================
          5. CAMPUS BOULEVARD TREES & STREET LAMPS
      ========================================================= */}
      {[-8, 8].map((x, colIdx) =>
        [-5, 5, 15].map((z, rowIdx) => (
          <group key={`${colIdx}-${rowIdx}`} position={[x, 0, z]}>
            {/* Tree Trunk */}
            <mesh position={[0, 1.5, 0]}>
              <cylinderGeometry args={[0.25, 0.35, 3, 8]} />
              <meshStandardMaterial color="#3E2723" roughness={0.9} />
            </mesh>
            {/* Tree Foliage Canopy */}
            <mesh position={[0, 3.5, 0]}>
              <dodecahedronGeometry args={[1.5, 1]} />
              <meshStandardMaterial
                color="#065F46"
                roughness={0.8}
                metalness={0.1}
              />
            </mesh>
          </group>
        ))
      )}
    </group>
  );
};

export default Campus3D;
