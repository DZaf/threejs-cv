import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

/**
 * Loads a font and generates 3D text labels for each planet.
 * Each label is positioned above its corresponding planet and added to its pivot
 * so that it moves in sync with the planet's orbit.
 *
 * @param scene - The Three.js scene to add labels into
 * @param planets - A map of planet mesh objects
 * @param pivots - A map of pivot objects controlling orbital movement
 * @returns A promise that resolves with a map of planet names to their 3D label meshes
 */
export function createLabels(
    scene: THREE.Scene,
    planets: Record<string, THREE.Mesh>,
    pivots: Record<string, THREE.Object3D>
): Promise<Record<string, THREE.Mesh>> {
    return new Promise((resolve) => {
        const loader = new FontLoader();

        // Load the font JSON from the Three.js examples CDN
        loader.load(
            'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
            (font) => {
                /**
                 * Creates a single text label mesh for a planet.
                 * The text is horizontally centered above the planet.
                 *
                 * @param text - The label text
                 * @param targetPlanet - The planet to label
                 * @returns A THREE.Mesh representing the 3D label
                 */
                const createLabel = (text: string, targetPlanet: THREE.Mesh): THREE.Mesh => {
                    const geometry = new TextGeometry(text, {
                        font,
                        size: 2,
                        depth: 1, // small extrusion for 3D thickness
                    });

                    // Center the text horizontally using its bounding box
                    geometry.computeBoundingBox();
                    const bbox = geometry.boundingBox;
                    const offsetX = bbox ? -0.5 * (bbox.max.x - bbox.min.x) : 0;
                    const offsetZ = bbox ? -0.5 * (bbox.max.z - bbox.min.z) : 0;

                    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
                    const mesh = new THREE.Mesh(geometry, material);

                    // Position the label above the planet with a small vertical offset
                    const radius = targetPlanet.geometry.boundingSphere?.radius ?? 5;
                    mesh.position.set(
                        targetPlanet.position.x + offsetX,
                        targetPlanet.position.y + radius + 1,
                        targetPlanet.position.z + offsetZ
                    );

                    return mesh;
                };

                // Create labels for each defined planet
                const labels: Record<string, THREE.Mesh> = {
                    skills: createLabel('Skills', planets.skills),
                    education: createLabel('Education', planets.education),
                    experience: createLabel('Experience', planets.experience),
                    certifications: createLabel('Certifications', planets.certifications),
                    contact: createLabel('Contact', planets.contact),
                };

                // Attach each label to its corresponding pivot so it orbits with the planet
                for (const key in labels) {
                    pivots[key].add(labels[key]);
                }

                // Resolve the promise with the label mesh objects
                resolve(labels);
            }
        );
    });
}
