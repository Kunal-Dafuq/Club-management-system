import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { CLUBS_DATA } from "../../constants/landingData";

/**
 * Realistic Architectural Club Office Room (Section 4 & 5)
 * Renders:
 * - Modern Glass-and-Steel Architectural Office Room Interior
 * - Polished Terrazzo Office Floor with Linear Seam Lighting
 * - Ceiling Recessed Architectural LED Lighting Strips
 * - 9 Architectural Exhibition Stands with Interactive Hologram Displays
 */
const ClubOffice3D = ({ progress = 0, onSelectClub }) => {
  const roomGroupRef = useRef();
  const hologramCardsRef = useRef();

  // Randomly select 5 clubs every time the room loads so it never overlaps or glitches
  const displayedClubs = useMemo(() => {
    // Shuffle copy of clubs
    const shuffled = [...CLUBS_DATA].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);

    // 5 clean, well-spaced coordinates in an amphitheater semicircle (3.1+ units horizontal separation)
    const cleanPositions = [
      [-6.4, 1.8, -3.2],  // Left Pedestal
      [-3.2, 2.1, -4.6],  // Center-Left Pedestal
      [0.0, 2.4, -5.2],   // Center Flagship Pedestal (highest)
      [3.2, 2.1, -4.6],   // Center-Right Pedestal
      [6.4, 1.8, -3.2],   // Right Pedestal
    ];

    return selected.map((club, idx) => ({
      ...club,
      displayPosition: cleanPositions[idx],
    }));
  }, []);

  // Active during Section 4 & 5 (progress 0.62 to 1.0)
  const visibility = useMemo(() => {
    if (progress < 0.6) return 0;
    return Math.min(1, (progress - 0.6) * 8);
  }, [progress]);

  useFrame((state) => {
    if (visibility <= 0.01) return;
    const time = state.clock.getElapsedTime();

    if (hologramCardsRef.current) {
      hologramCardsRef.current.children.forEach((card, idx) => {
        // Smooth, glitch-free sine wave bobbing
        card.position.y = Math.sin(time * 1.5 + idx * 1.2) * 0.12;
      });
    }
  });

  if (visibility <= 0.01) return null;

  return (
    <group
      ref={roomGroupRef}
      position={[0, -2, -75]}
      scale={[visibility, visibility, visibility]}
    >
      {/* =========================================================
          1. POLISHED ARCHITECTURAL OFFICE FLOOR
      ========================================================= */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
        <circleGeometry args={[20, 64]} />
        <meshStandardMaterial
          color="#0C101A"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Floor Linear Seam Glowing Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -3.48, 0]}>
        <ringGeometry args={[14, 14.3, 64]} />
        <meshBasicMaterial
          color="#06B6D4"
          side={THREE.DoubleSide}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* =========================================================
          2. GLASS CURTAIN WALLS & STRUCTURAL MULLION PILLARS
      ========================================================= */}
      {[-12, -6, 0, 6, 12].map((x, idx) => (
        <group key={idx} position={[x, 1, -15]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.6, 9, 0.6]} />
            <meshStandardMaterial
              color="#1E293B"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {idx < 4 && (
            <mesh position={[3, 0, 0]}>
              <planeGeometry args={[5.4, 9]} />
              <meshStandardMaterial
                color="#06B6D4"
                transparent
                opacity={0.12}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* =========================================================
          3. ARCHITECTURAL CEILING & RECESSED LINEAR LED STRIPS
      ========================================================= */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5.5, 0]}>
        <circleGeometry args={[20, 64]} />
        <meshStandardMaterial color="#0A0E17" roughness={0.8} />
      </mesh>
      <mesh position={[0, 5.48, 0]}>
        <boxGeometry args={[16, 0.1, 0.8]} />
        <meshBasicMaterial color="#7C3AED" />
      </mesh>
      <mesh position={[0, 5.48, -4]}>
        <boxGeometry args={[16, 0.1, 0.8]} />
        <meshBasicMaterial color="#06B6D4" />
      </mesh>

      {/* =========================================================
          4. EXACTLY 5 RANDOMIZED EXHIBITION STANDS (ZERO OVERLAP)
      ========================================================= */}
      <group ref={hologramCardsRef}>
        {displayedClubs.map((club) => (
          <group key={club.id} position={club.displayPosition}>
            {/* Architectural Exhibition Stand / Pedestal Base */}
            <mesh position={[0, -2.4, 0]}>
              <cylinderGeometry args={[0.3, 0.45, 2.2, 16]} />
              <meshStandardMaterial
                color="#1E293B"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            {/* Illuminated Pedestal Cap Glow */}
            <mesh position={[0, -1.3, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.1, 16]} />
              <meshBasicMaterial color={club.color} />
            </mesh>

            {/* Floating Glass Hologram Display Pane */}
            <Float
              speed={1.5}
              rotationIntensity={0.15}
              floatIntensity={0.2}
              position={[0, 0.2, 0]}
            >
              <group
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectClub) onSelectClub(club);
                }}
              >
                {/* Glass Hologram Pane Mesh */}
                <mesh>
                  <boxGeometry args={[2.5, 1.5, 0.08]} />
                  <meshStandardMaterial
                    color="#0B132B"
                    metalness={0.9}
                    roughness={0.1}
                    transparent
                    opacity={0.85}
                  />
                </mesh>

                {/* Glowing Neon Display Border */}
                <mesh position={[0, 0, 0.01]}>
                  <boxGeometry args={[2.54, 1.54, 0.03]} />
                  <meshBasicMaterial
                    color={club.color}
                    wireframe
                    transparent
                    opacity={0.7}
                  />
                </mesh>

                {/* Interactive UI Card Overlay (Sleek Apple/Vercel style) */}
                <Html
                  position={[0, 0, 0.06]}
                  transform
                  occlude={false}
                  style={{
                    width: "220px",
                    height: "120px",
                    pointerEvents: "auto",
                    userSelect: "none",
                  }}
                >
                  <div
                    onClick={() => onSelectClub && onSelectClub(club)}
                    className="w-full h-full p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-105 shadow-xl group"
                    style={{
                      backgroundColor: "rgba(11, 19, 43, 0.92)",
                      borderColor: `${club.color}80`,
                      boxShadow: `0 0 20px ${club.color}25`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[9px] font-mono px-2 py-0.5 rounded uppercase font-semibold"
                        style={{
                          backgroundColor: `${club.color}25`,
                          color: club.color,
                        }}
                      >
                        {club.category}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {club.currentMembers} Members
                      </span>
                    </div>

                    <div>
                      <h5 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {club.name}
                      </h5>
                      <p className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5 font-normal">
                        {club.tagline}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono border-t border-white/10 pt-1.5 text-zinc-400 group-hover:text-white transition-colors">
                      <span>Headquarters</span>
                      <span>→</span>
                    </div>
                  </div>
                </Html>
              </group>
            </Float>
          </group>
        ))}
      </group>
    </group>
  );
};

export default ClubOffice3D;
