import * as THREE from 'three';

/**
 * Creates a set of textured planet meshes and their corresponding pivot objects.
 * Each planet is placed at a specific X-axis distance from the origin (sun).
 *
 * @param scene - The Three.js scene to add the planets to
 * @param textureLoader - Loader used to load planet textures
 * @param options - Shared material properties for all planets
 * @returns An object containing two maps: planets and their pivots
 */
export function createPlanets(
    scene: THREE.Scene,
    textureLoader: THREE.TextureLoader,
    options: Partial<THREE.MeshStandardMaterialParameters>
): {
    planets: Record<string, THREE.Mesh>,
    pivots: Record<string, THREE.Object3D>
} {
    // Shared geometry for all planets (same size and detail)
    const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);

    // Texture paths for each planet (representing different CV sections)
    const textures: Record<string, string> = {
        skills: '/textures/venus.jpg',
        education: '/textures/mars.jpg',
        experience: '/textures/jupiter.jpg',
        certifications: '/textures/moon.jpg',
        contact: '/textures/venus_surface.jpg',
    };

    // X-axis positions for initial placement of each planet
    const positions: Record<string, number> = {
        skills: 20,
        education: 30,
        experience: 40,
        certifications: 50,
        contact: 60,
    };

    const planets: Record<string, THREE.Mesh> = {};
    const pivots: Record<string, THREE.Object3D> = {};

    // Create each planet mesh and attach it to its own pivot
    for (const key in textures) {
        const material = new THREE.MeshStandardMaterial({
            map: textureLoader.load(textures[key]),
            ...options,
        });

        const mesh = new THREE.Mesh(sphereGeometry, material);
        const pivot = new THREE.Object3D();

        // Position the planet along the X-axis
        mesh.position.set(positions[key], 0, 0);

        // Add mesh to its pivot, and pivot to the scene
        pivot.add(mesh);
        scene.add(pivot);

        planets[key] = mesh;
        pivots[key] = pivot;
    }

    return { planets, pivots };
}
