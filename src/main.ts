import * as THREE from 'three';
import { initScene } from './scene/initScene';
import { addSun } from './scene/addSun';
import { createPlanets } from './scene/planets';
import { createLabels } from './scene/labels';
import { setupInteraction, selectPlanetByName } from './interaction/onClickHandler';
import { animate } from './animate';
import './style.css';
import './sidebar.jsx'; // Presumed to be React, left as is
import { store } from './store/store';
import { setPlanetKeys } from './store/uiSlice';

// --- Scene Setup ---
const { scene, camera, renderer, controls } = initScene();
addSun(scene);

// --- Planet System Setup ---
const textureLoader = new THREE.TextureLoader();
const { planets, pivots } = createPlanets(scene, textureLoader, {
    roughness: 0.8,
    metalness: 0.1,
});

// --- Sync Redux with Available Planet Keys ---
store.dispatch(setPlanetKeys(Object.keys(planets)));

// --- Load Labels & Initialize Interaction ---
createLabels(scene, planets, pivots).then((labelsObj: Record<string, THREE.Object3D>) => {
    const labelArray = Object.values(labelsObj);

    setupInteraction(scene, camera, planets);
    animate(scene, camera, renderer, controls, pivots, planets, labelArray);

    // --- Redux Subscription for selected planet ---
    let lastPlanet: string | null = null;
    store.subscribe(() => {
        const selectedPlanet = store.getState().ui.selectedPlanet;
        if (selectedPlanet !== lastPlanet && selectedPlanet) {
            selectPlanetByName(selectedPlanet);
            lastPlanet = selectedPlanet;
        }
    });
});
