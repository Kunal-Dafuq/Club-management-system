// Silences harmless deprecation & WebGL unmount context loss warnings from Three.js r184 / @react-three/fiber v9
const createFilter = (originalFn) => (...args) => {
  const msg = typeof args[0] === "string" ? args[0] : "";
  if (
    msg.includes("THREE.Clock: This module has been deprecated") ||
    msg.includes("THREE.WebGLShadowMap: PCFSoftShadowMap has been deprecated") ||
    msg.includes("THREE.WebGLRenderer: Context Lost") ||
    msg.includes("THREE.WebGLRenderer: Context lost")
  ) {
    return;
  }
  originalFn.apply(console, args);
};

console.log = createFilter(console.log);
console.info = createFilter(console.info);
console.warn = createFilter(console.warn);
console.error = createFilter(console.error);
