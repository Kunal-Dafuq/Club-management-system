import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * CameraController for ClubPlanet OrgOS.
 * Smoothly interpolates camera position, look-at target, and FOV across 5 narrative beats:
 * 0.00 -> Deep Space approach to the Exoplanet
 * 0.25 -> Entering the Atmospheric Cloud Layer
 * 0.50 -> Facing the Grand Architectural University Main Entrance Gates
 * 0.75 -> Inside the architectural Glass-and-Steel Club Office Room
 * 1.00 -> Ascending into the Join the Orbit View
 */
const CameraController = ({ progress = 0 }) => {
  const { camera } = useThree();
  const currentPosRef = useRef(new THREE.Vector3(0, 1.5, 15));
  const currentTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  const keyframes = [
    { progress: 0.0, pos: [0, 1.5, 15], target: [0, 0, 0], fov: 60 },
    { progress: 0.25, pos: [0, -1.5, -18], target: [0, -4, -38], fov: 68 },
    { progress: 0.5, pos: [0, -4.5, -24], target: [0, -6, -42], fov: 56 },
    { progress: 0.75, pos: [0, -2.2, -66], target: [0, -2, -78], fov: 52 },
    { progress: 1.0, pos: [0, 8.5, -72], target: [0, 15, -105], fov: 60 },
  ];

  useFrame((_, delta) => {
    // Find surrounding keyframes
    let k1 = keyframes[0];
    let k2 = keyframes[1];
    for (let i = 0; i < keyframes.length - 1; i++) {
      if (
        progress >= keyframes[i].progress &&
        progress <= keyframes[i + 1].progress
      ) {
        k1 = keyframes[i];
        k2 = keyframes[i + 1];
        break;
      }
    }

    const span = Math.max(0.0001, k2.progress - k1.progress);
    const localT = THREE.MathUtils.clamp((progress - k1.progress) / span, 0, 1);
    const smoothT = localT * localT * (3 - 2 * localT);

    // Interpolate target pos and lookAt
    const targetPos = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...k1.pos),
      new THREE.Vector3(...k2.pos),
      smoothT
    );
    const targetLook = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...k1.target),
      new THREE.Vector3(...k2.target),
      smoothT
    );

    // Damped interpolation for cinematic feel
    const lerpFactor = Math.min(1, delta * 4);
    currentPosRef.current.lerp(targetPos, lerpFactor);
    currentTargetRef.current.lerp(targetLook, lerpFactor);

    camera.position.copy(currentPosRef.current);
    camera.lookAt(currentTargetRef.current);

    const targetFov = THREE.MathUtils.lerp(k1.fov, k2.fov, smoothT);
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, lerpFactor);
    camera.updateProjectionMatrix();
  });

  return null;
};

export default CameraController;
