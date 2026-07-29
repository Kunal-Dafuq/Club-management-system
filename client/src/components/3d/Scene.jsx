import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

import CameraController from "./CameraController";
import SolarSystem from "./SolarSystem";
import AtmosphereTunnel from "./AtmosphereTunnel";
import Campus3D from "./Campus3D";
import ClubOffice3D from "./ClubOffice3D";

/**
 * Master Scene Component for ClubPlanet OrgOS.
 * Orchestrates:
 * - HDR space lighting and directional sunlight from our solar star
 * - Realistic Solar System with incandescent Sun and Exoplanet (Act 1)
 * - Stratosphere Cloud Layers & Entry Streaks (Act 2)
 * - Grand University Main Entrance Gates & Campus Boulevard (Act 3)
 * - Actual Architectural Glass-and-Steel Club Office Interior Room (Act 4)
 */
const Scene = ({ progress = 0, onSelectClub, isMobile = false }) => {
  const visibility = useMemo(() => {
    return {
      space: progress <= 0.25 ? 1 : Math.max(0, 1 - (progress - 0.25) * 8),
      clouds:
        progress >= 0.15 && progress <= 0.55
          ? Math.sin(((progress - 0.15) / 0.4) * Math.PI)
          : 0,
      campus:
        progress >= 0.35 && progress <= 0.85
          ? Math.sin(((progress - 0.35) / 0.5) * Math.PI)
          : 0,
      office: progress >= 0.65 ? Math.min(1, (progress - 0.65) * 4) : 0,
    };
  }, [progress]);

  return (
    <div className="fixed inset-0 pointer-events-auto z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 1.5, 15], fov: isMobile ? 70 : 60, near: 0.1, far: 500 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        shadows={{ type: THREE.PCFShadowMap }}
      >
        {/* Realistic Space Starfield */}
        <Stars
          radius={200}
          depth={80}
          count={isMobile ? 3000 : 7000}
          factor={4}
          saturation={0.5}
          fade
          speed={0.5}
        />

        {/* Realistic Solar Star Directional Sunlight */}
        <directionalLight
          position={[-50, 25, -90]}
          intensity={4.5}
          color="#FFFBEB"
          castShadow
        />
        <ambientLight intensity={0.4} color="#1E293B" />
        <directionalLight position={[20, 40, 30]} intensity={1.5} color="#38BDF8" />

        {/* Atmospheric Fog */}
        <fog attach="fog" args={["#06080F", 30, 220]} />

        {/* Narrative Camera Journey */}
        <CameraController progress={progress} />

        <Suspense fallback={null}>
          {/* Act 1: Solar System */}
          <group visible={visibility.space > 0.01}>
            <SolarSystem progress={progress} />
          </group>

          {/* Act 2: Atmospheric Tunnel & Volumetric Clouds */}
          <group visible={visibility.clouds > 0.01}>
            <AtmosphereTunnel progress={progress} />
          </group>

          {/* Act 3: Campus & Grand Main Entrance Gates */}
          <group visible={visibility.campus > 0.01}>
            <Campus3D progress={progress} />
          </group>

          {/* Act 4 & 5: Actual Architectural Club Office Interior */}
          <group visible={visibility.office > 0.01}>
            <ClubOffice3D progress={progress} onSelectClub={onSelectClub} />
          </group>
        </Suspense>

        {/* Optional Interactive OrbitControls when idle */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.3}
          makeDefault
        />
      </Canvas>

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-70" />
    </div>
  );
};

export default Scene;
