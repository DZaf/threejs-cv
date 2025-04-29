import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import * as THREE from 'three';

// Loads a font and creates 3D text labels for each planet
export function createLabels(scene, planets, pivots) {
    return new Promise((resolve) => {
        const loader = new FontLoader();

        // Load font asynchronously from Three.js CDN
        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {

            // Helper function that creates a label mesh for a given planet and text
            const createLabel = (text, targetPlanet) => {
                // Define 3D text geometry using the loaded font
                const geometry = new TextGeometry(text, {
                    font,
                    size: 2,
                    height: 0.2,
                    bevelEnabled: true,
                    bevelThickness: 0.02,
                    bevelSize: 0.02,
                    bevelSegments: 3,
                });

                // Use standard material so it's affected by lighting
                const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
                const mesh = new THREE.Mesh(geometry, material);

                // Center the label horizontally based on its bounding box
                geometry.computeBoundingBox();
                const centerOffset = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

                // Position the label above its associated planet
                mesh.position.set(
                    targetPlanet.position.x + centerOffset,
                    targetPlanet.position.y + 5,
                    targetPlanet.position.z
                );

                return mesh;
            };

            // Create all labels and associate them with their respective planets
            const labels = {
                skills: createLabel('Skills', planets.skills),
                education: createLabel('Education', planets.education),
                experience: createLabel('Experience', planets.experience),
                certifications: createLabel('Certifications', planets.certifications),
                contact: createLabel('Contact', planets.contact),
            };

            // Attach each label to its corresponding planet's pivot for orbit rotation
            for (const key in labels) {
                pivots[key].add(labels[key]);
            }

            // Resolve the promise with the created labels so they can be animated later
            resolve(labels);
        });
    });
}
