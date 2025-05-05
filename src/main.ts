import * as THREE from 'three';
import { initScene } from './scene/initScene';
import { addSun } from './scene/addSun';
import { createPlanets } from './scene/planets';
import { createLabels } from './scene/labels';
import { setupInteraction, selectPlanetByName } from './interaction/onClickHandler';
import { animate } from './animate';
import './style.css';
import './sidebar'; // Imports the React-based sidebar UI
import { store } from './store/store';
import { setPlanetKeys } from './store/uiSlice';

// --- Initialize the Three.js Scene, Camera, Renderer, and Controls ---
const { scene, camera, renderer, controls } = initScene();

// --- Add the Sun to the Scene ---
addSun(scene);

// --- Create Planet Meshes and Their Orbit Pivots ---
const textureLoader = new THREE.TextureLoader();
const { planets, pivots } = createPlanets(scene, textureLoader, {
    roughness: 0.8,
    metalness: 0.1,
});

// --- Store Planet Names in Redux to Sync UI State ---
store.dispatch(setPlanetKeys(Object.keys(planets)));

// --- Create Floating Labels and Set Up User Interactions ---
createLabels(scene, planets, pivots).then((labelsObj: Record<string, THREE.Object3D>) => {
    const labelArray = Object.values(labelsObj);

    // Enable click interactions with planets
    setupInteraction(scene, camera, planets);

    // Start the animation loop with planets and labels
    animate(scene, camera, renderer, controls, pivots, planets, labelArray);

    // --- React to Redux State Changes for Planet Selection ---
    // If a new planet is selected from the UI, center the camera on it
    let lastPlanet: string | null = null;
    store.subscribe(() => {
        const selectedPlanet = store.getState().ui.selectedPlanet;
        if (selectedPlanet !== lastPlanet && selectedPlanet) {
            selectPlanetByName(selectedPlanet);
            lastPlanet = selectedPlanet;
        }
    });
});
