import * as THREE from 'three';
import { initScene } from './scene/initScene.js';
import { addSun } from './scene/addSun.js';
import { createPlanets } from './scene/planets.js';
import { createLabels } from './scene/labels.js';
import { setupInteraction } from './interaction/onClickHandler.js';
import { animate } from './animate.js';
import './style.css'; // Import global canvas and body styling

// Set up the core scene components: scene, camera, renderer, controls
const { scene, camera, renderer, controls } = initScene();

// Add a central sun object at the origin
addSun(scene);

// Create planet meshes and their rotation pivots
const textureLoader = new THREE.TextureLoader();
const planetMaterialOptions = {
    roughness: 0.8,
    metalness: 0.1
};
const { planets, pivots } = createPlanets(scene, textureLoader, planetMaterialOptions);

// Load labels and continue once font is ready (asynchronous step)
createLabels(scene, planets, pivots).then(labels => {
    // Set up interaction: clicking planets opens panels
    setupInteraction(scene, camera, planets);

    // Start rendering loop: animate planet spins, orbits, and labels
    animate(scene, camera, renderer, controls, pivots, planets, labels);
});
