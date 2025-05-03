import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { store } from './store/store';

/**
 * Starts the main animation loop for the scene, including orbiting, spinning, and label alignment.
 * Also adds and removes helpers based on Redux UI state.
 *
 * @param scene - The main Three.js scene
 * @param camera - The perspective camera
 * @param renderer - The WebGL renderer
 * @param controls - OrbitControls for camera interaction
 * @param pivots - A map of pivot objects controlling orbits
 * @param planets - A map of planet mesh objects
 * @param labels - An array of label objects that should face the camera
 */
export function animate(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    controls: OrbitControls,
    pivots: Record<string, THREE.Object3D>,
    planets: Record<string, THREE.Mesh>,
    labels: THREE.Object3D[],
    panels?: THREE.Mesh[],
): void {
    let axesHelper: THREE.AxesHelper | null = null;
    let gridHelper: THREE.GridHelper | null = null;
    const objectHelpers = new Map<THREE.Object3D, THREE.AxesHelper>();

    const orbitalSpeeds: Record<string, number> = {
        skills: 0.05,
        education: 0.02,
        experience: 0.01,
        certifications: 0.03,
        contact: 0.07,
    };

    const spinSpeeds: Record<string, number> = {
        skills: 0.01,
        education: 0.003,
        experience: 0.008,
        certifications: 0.006,
        contact: 0.015,
    };

    function addHelpers(): void {
        if (!axesHelper) {
            axesHelper = new THREE.AxesHelper(10);
            scene.add(axesHelper);
        }
        if (!gridHelper) {
            gridHelper = new THREE.GridHelper(50, 50);
            scene.add(gridHelper);
        }

        // Add per-object helpers to planets and pivots
        [...Object.values(planets), ...Object.values(pivots)].forEach((object) => {
            if (!objectHelpers.has(object)) {
                const helper = new THREE.AxesHelper(4);
                object.add(helper);
                objectHelpers.set(object, helper);
            }
        });
    }

    function removeHelpers(): void {
        if (axesHelper) {
            scene.remove(axesHelper);
            axesHelper = null;
        }
        if (gridHelper) {
            scene.remove(gridHelper);
            gridHelper = null;
        }

        for (const [object, helper] of objectHelpers.entries()) {
            object.remove(helper);
        }
        objectHelpers.clear();
    }

    // Redux: react to helpers toggle state
    try {
        let prevHelpers = store.getState().ui?.helpers;

        if (prevHelpers) addHelpers();

        store.subscribe(() => {
            const { helpers } = store.getState().ui;
            if (helpers !== prevHelpers) {
                helpers ? addHelpers() : removeHelpers();
                prevHelpers = helpers;
            }
        });
    } catch (error) {
        console.error('Redux integration error in animate.ts:', error);
    }

    // Main render loop
    function render(): void {
        requestAnimationFrame(render);

        const time = Date.now() * 0.001;

        for (const [name, pivot] of Object.entries(pivots)) {
            const speed = orbitalSpeeds[name] || 0.02;
            pivot.rotation.y = time * speed;
        }

        for (const [name, planet] of Object.entries(planets)) {
            const spin = spinSpeeds[name] || 0.005;
            planet.rotation.y += spin;
        }

        for (const label of labels) {
            label.lookAt(camera.position);
        }

        if (panels) {
            for (const panel of panels) {
                panel.lookAt(camera.position);
            }
        }

        controls.update();
        renderer.render(scene, camera);
    }

    // Make the renderer responsive to screen size changes
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    });

    render();
}
