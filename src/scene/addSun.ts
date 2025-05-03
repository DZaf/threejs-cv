import * as THREE from 'three';

/**
 * Adds a central sun object to the provided scene.
 *
 * @param scene - The Three.js scene to add the sun to
 */
export function addSun(scene: THREE.Scene): void {
    // Create a yellow sphere to represent the sun
    const sun = new THREE.Mesh(
        new THREE.SphereGeometry(8, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffff00 }) // Emits constant color, not affected by lights
    );

    // Place the sun at the origin of the scene
    sun.position.set(0, 0, 0);

    // Add the sun to the scene
    scene.add(sun);
}
