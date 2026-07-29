import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Loader } from '@react-three/drei';
import * as THREE from 'three';
 
import CameraController from './CameraController';
import Scene from './Scene';
 
/**
 * Drop this into Home.jsx (or LandingPage.jsx) in place of a static hero:
 *
 *   import HeroScene from '../components/3d/HeroScene';
 *   <HeroScene onSelectClub={(club) => setActiveClub(club)} />
 *
 * `onSelectClub` fires whenever a card on the holographic club wall is
 * clicked (see ClubOffice3D.jsx) — wire it to your existing ClubModal:
 *
 *   const [activeClub, setActiveClub] = useState(null);
 *   <HeroScene onSelectClub={setActiveClub} />
 *   {activeClub && <ClubModal club={activeClub} onClose={() => setActiveClub(null)} />}
 *
 * `pages` below controls total scroll length — 6 "screen heights" of
 * scrolling to travel from deep space to the club office. Tune to taste.
 */
export default function HeroScene({ onSelectClub, pages = 6 }) {
  const [activeSection, setActiveSection] = useState('space');
 
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#05060c' }}>
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ fov: 55, near: 0.1, far: 500, position: [0, 4, 46] }}
        dpr={[1, 1.75]} // cap pixel ratio for perf on high-DPI screens
      >
        <Suspense fallback={null}>
          <ScrollControls pages={pages} damping={0.25}>
            <CameraController />
            <Scene onSelectClub={onSelectClub} />
 
            {/* HTML overlay content pinned to scroll position, e.g. section
                headings/CTAs. Kept minimal here — style to match your
                existing GlowButton / GlassCard components. */}
            <Scroll html style={{ width: '100%' }}>
              <OverlayText
                offset={0}
                eyebrow="ClubPlanet"
                title="A new world for your campus"
                body="Explore the platform reimagined as one continuous journey."
              />
              <OverlayText
                offset={0.58}
                eyebrow="Welcome"
                title="Your University, Reimagined"
                body="Prestigious. Futuristic. Alive with student life."
              />
              <OverlayText
                offset={0.85}
                eyebrow="The Club Office"
                title="Every club. One home."
                body="Tap a card to explore mission, members and events."
              />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
 
      <Loader
        containerStyles={{ background: '#05060c' }}
        innerStyles={{ background: '#1a1b24' }}
        barStyles={{ background: '#5fd4ff' }}
        dataStyles={{ color: '#5fd4ff', fontFamily: 'Inter, sans-serif' }}
      />
    </div>
  );
}
 
/** Simple scroll-pinned heading block — swap for your own components. */
function OverlayText({ offset, eyebrow, title, body }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${offset * 100}vh`,
        left: '8%',
        maxWidth: 480,
        color: '#eafcff',
        fontFamily: 'Inter, system-ui, sans-serif',
        pointerEvents: 'none',
      }}
    >
      <div style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.7, marginBottom: 8 }}>
        {eyebrow}
      </div>
      <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: 0, marginBottom: 12, fontWeight: 700 }}>{title}</h1>
      <p style={{ fontSize: 16, opacity: 0.85, margin: 0 }}>{body}</p>
    </div>
  );
}
