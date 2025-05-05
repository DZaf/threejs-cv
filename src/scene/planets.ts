import * as THREE from 'three';

/**
 * Creates a set of textured planet meshes and their corresponding pivot objects.
 * Each planet is placed at a unique distance from the origin along the X-axis.
 * Pivots allow each planet to orbit independently when rotated.
 *
 * @param scene - The Three.js scene to which all pivots and planets will be added
 * @param textureLoader - An instance of THREE.TextureLoader used to apply surface textures
 * @param options - Optional shared material properties for all planet materials
 * @returns An object containing:
 *   - 'planets': a map of planet name to mesh
 *   - 'pivots': a map of planet name to its pivot object
 */
export function createPlanets(
    scene: THREE.Scene,
    textureLoader: THREE.TextureLoader,
    options: Partial<THREE.MeshStandardMaterialParameters>
): {
    planets: Record<string, THREE.Mesh>,
    pivots: Record<string, THREE.Object3D>
} {
    // Reusable sphere geometry for all planets
    const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);

    // Texture paths for each planet representing different CV categories
    const textures: Record<string, string> = {
        skills: '/textures/venus.jpg',
        education: '/textures/mars.jpg',
        experience: '/textures/jupiter.jpg',
        certifications: '/textures/moon.jpg',
        contact: '/textures/venus_surface.jpg',
    };

    // Horizontal positions for each planet along the X-axis
    const positions: Record<string, number> = {
        skills: 20,
        education: 30,
        experience: 40,
        certifications: 50,
        contact: 60,
    };

    const planets: Record<string, THREE.Mesh> = {};
    const pivots: Record<string, THREE.Object3D> = {};

    // Create mesh and pivot for each planet
    for (const key in textures) {
        // Create a material with the planet's texture and shared options
        const material = new THREE.MeshStandardMaterial({
            map: textureLoader.load(textures[key]),
            ...options,
        });

        // Create the planet mesh
        const mesh = new THREE.Mesh(sphereGeometry, material);

        // Create a pivot object to enable orbit-like motion
        const pivot = new THREE.Object3D();

        // Position the planet along the X-axis relative to its pivot
        mesh.position.set(positions[key], 0, 0);

        // Add the planet to its pivot, and the pivot to the scene
        pivot.add(mesh);
        scene.add(pivot);

        // Store references in return objects
        planets[key] = mesh;
        pivots[key] = pivot;
    }

    return { planets, pivots };
}
