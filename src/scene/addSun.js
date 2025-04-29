import * as THREE from 'three';

// Adds a central sun object to the scene
export function addSun(scene) {
    // Create a yellow sphere to represent the sun
    // SphereGeometry(radius, widthSegments, heightSegments)
    const sun = new THREE.Mesh(
        new THREE.SphereGeometry(8, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffff00 }) // Emits constant color, not affected by lights
    );

    // Place the sun at the origin of the scene
    sun.position.set(0, 0, 0);

    // Add the sun mesh to the scene so it becomes visible
    scene.add(sun);
}