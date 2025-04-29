import * as THREE from 'three';

// Creates a set of textured planet meshes and their corresponding pivot objects
export function createPlanets(scene, textureLoader, options) {
    // Base geometry for all planets (same size and resolution)
    const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);

    // Texture paths for each planet type, representing different CV sections
    const textures = {
        skills: '/textures/venus.jpg',
        education: '/textures/mars.jpg',
        experience: '/textures/jupiter.jpg',
        certifications: '/textures/moon.jpg',
        contact: '/textures/venus_surface.jpg',
    };

    // X-axis positions where each planet will be placed relative to the sun
    const positions = {
        skills: 20,
        education: 30,
        experience: 40,
        certifications: 50,
        contact: 60,
    };

    // Store references to each planet mesh and its pivot for animation
    const planets = {};
    const pivots = {};

    // Loop through each planet type and create its mesh and pivot
    for (const key in textures) {
        // Create a standard material using the planet texture and shared options
        const material = new THREE.MeshStandardMaterial({
            map: textureLoader.load(textures[key]),
            ...options
        });

        // Create the planet mesh and an empty Object3D to act as a rotation pivot
        planets[key] = new THREE.Mesh(sphereGeometry, material);
        pivots[key] = new THREE.Object3D();

        // Position the planet away from the origin (sun) along the X-axis
        planets[key].position.set(positions[key], 0, 0);

        // Attach the planet to its pivot so it can orbit
        pivots[key].add(planets[key]);

        // Add the pivot to the scene — this allows all children to rotate together
        scene.add(pivots[key]);
    }

    // Return both collections so the rest of the app can animate or interact with them
    return { planets, pivots };
}
