import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

/**
 * Loads a font and creates 3D text labels for each planet.
 * Each label is a 3D mesh that sits above its associated planet and orbits with it.
 */
export function createLabels(
    scene: THREE.Scene,
    planets: Record<string, THREE.Mesh>,
    pivots: Record<string, THREE.Object3D>
): Promise<Record<string, THREE.Mesh>> {
    return new Promise((resolve) => {
        const loader = new FontLoader();
        loader.load(
            'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
            (font) => {
                const createLabel = (text: string, targetPlanet: THREE.Mesh): THREE.Mesh => {
                    // Create text geometry with a small depth (extrusion) to keep it thin
                    const geometry = new TextGeometry(text, {
                        font,
                        size: 2,
                        depth: 1,  // use 'depth' instead of deprecated 'height'
                        // (Other params like curveSegments or bevel can be added as needed)
                    });
                    geometry.computeBoundingBox();
                    const bbox = geometry.boundingBox;
                    const offsetX = bbox ? -0.5 * (bbox.max.x - bbox.min.x) : 0;
                    const offsetZ = bbox ? -0.5 * (bbox.max.z - bbox.min.z) : 0;
                    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
                    const mesh = new THREE.Mesh(geometry, material);
                    // Position the label above the planet: 
                    // horizontally centered over the planet, and 5 units higher in Y (planet radius)
                    mesh.position.set(
                        targetPlanet.position.x + offsetX,
                        targetPlanet.position.y + (targetPlanet.geometry.boundingSphere?.radius ?? 5) + 1,
                        targetPlanet.position.z + offsetZ
                    );
                    return mesh;
                };

                // Create labels for each planet
                const labels: Record<string, THREE.Mesh> = {
                    skills: createLabel('Skills', planets.skills),
                    education: createLabel('Education', planets.education),
                    experience: createLabel('Experience', planets.experience),
                    certifications: createLabel('Certifications', planets.certifications),
                    contact: createLabel('Contact', planets.contact),
                };

                // Attach each label to its planet's pivot so it orbits with the planet
                for (const key in labels) {
                    pivots[key].add(labels[key]);
                }
                resolve(labels);
            }
        );
    });
}
