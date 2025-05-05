import * as THREE from 'three';

/**
 * Initializes and returns a minimal Three.js setup.
 * Intended for use in testing, experimentation, or component isolation.
 *
 * @returns An object containing the scene, a perspective camera, and a WebGL renderer.
 */
export function createScene(): {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
} {
  // Create a new scene to hold all 3D content
  const scene = new THREE.Scene();

  // Set up a perspective camera with:
  // - FOV: 75 degrees
  // - Aspect ratio: 1 (square viewport for tests)
  // - Clipping planes: 0.1 (near) to 1000 (far)
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  // Create a WebGL renderer to render the scene and camera
  const renderer = new THREE.WebGLRenderer();

  // Position the camera slightly away from the origin so it can view the scene
  camera.position.z = 5;

  // Return all core components for rendering
  return { scene, camera, renderer };
}
