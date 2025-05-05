import * as THREE from 'three';

/**
 * Adds a central "sun" object to the scene.
 * The sun is represented as a glowing yellow sphere positioned at the origin.
 *
 * @param scene - The Three.js scene where the sun should be added
 */
export function addSun(scene: THREE.Scene): void {
    // Create a sphere geometry to visually represent the sun
    const sunGeometry = new THREE.SphereGeometry(8, 32, 32);

    // Use MeshBasicMaterial so the sun appears self-illuminated (unaffected by scene lighting)
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    // Combine geometry and material into a mesh
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);

    // Position the sun at the center of the scene (origin)
    sun.position.set(0, 0, 0);

    // Add the sun mesh to the scene graph
    scene.add(sun);
}
