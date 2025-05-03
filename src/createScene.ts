import * as THREE from 'three';

/**
 * Creates a basic Three.js setup with a scene, camera, and renderer.
 * This function is useful for isolating initialization logic in tests or simple demos.
 *
 * @returns An object containing the scene, camera, and renderer.
 */
export function createScene(): {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
} {
  // Create a new 3D scene — this is the container where objects, lights, and cameras go
  const scene = new THREE.Scene();

  // Set up a perspective camera with:
  // - Field of view: 75 degrees
  // - Aspect ratio: 1 (square viewport for simplicity in tests)
  // - Near and far clipping planes: 0.1 and 1000 units respectively
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  // Create a WebGL renderer — this renders the scene from the camera's point of view
  const renderer = new THREE.WebGLRenderer();

  // Position the camera slightly away from the origin on the Z-axis
  // so that it can see objects placed at the center of the scene
  camera.position.z = 5;

  // Return the initialized components for use in the main app or unit tests
  return { scene, camera, renderer };
}
