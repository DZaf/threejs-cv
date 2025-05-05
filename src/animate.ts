import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { store } from './store/store';

/**
 * Starts the main animation loop, handling:
 * - Planet orbit and rotation
 * - Label and panel alignment
 * - Toggleable scene helpers via Redux
 *
 * @param scene - The Three.js scene
 * @param camera - The active perspective camera
 * @param renderer - The WebGL renderer used to draw the scene
 * @param controls - OrbitControls for interactive camera movement
 * @param pivots - Objects that manage orbital rotation of each planet
 * @param planets - Planet meshes that rotate around their own axes
 * @param labels - Label meshes that always face the camera
 * @param panels - Optional info panels that also face the camera
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

    // Orbit speeds for each planet's pivot (simulating revolution)
    const orbitalSpeeds: Record<string, number> = {
        skills: 0.05,
        education: 0.02,
        experience: 0.01,
        certifications: 0.03,
        contact: 0.07,
    };

    // Spin speeds for each planet (simulating axial rotation)
    const spinSpeeds: Record<string, number> = {
        skills: 0.01,
        education: 0.003,
        experience: 0.008,
        certifications: 0.006,
        contact: 0.015,
    };

    /**
     * Adds global and per-object helpers to the scene.
     * Includes a grid, world axes, and local axes on each planet and pivot.
     */
    function addHelpers(): void {
        if (!axesHelper) {
            axesHelper = new THREE.AxesHelper(10);
            scene.add(axesHelper);
        }
        if (!gridHelper) {
            gridHelper = new THREE.GridHelper(50, 50);
            scene.add(gridHelper);
        }

        // Attach a local axes helper to each planet and pivot object
        [...Object.values(planets), ...Object.values(pivots)].forEach((object) => {
            if (!objectHelpers.has(object)) {
                const helper = new THREE.AxesHelper(4);
                object.add(helper);
                objectHelpers.set(object, helper);
            }
        });
    }

    /**
     * Removes all scene helpers.
     * Detaches and clears helpers from the scene and objects.
     */
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

    /**
     * Subscribes to Redux state to toggle helpers dynamically.
     * Helpers are added or removed based on the `ui.helpers` boolean.
     */
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

    /**
     * The core animation loop that handles:
     * - Planet orbit and rotation
     * - Label/panel alignment
     * - Rendering updates
     */
    function render(): void {
        requestAnimationFrame(render);

        const time = Date.now() * 0.001;

        // Update pivot rotation to simulate orbital motion
        for (const [name, pivot] of Object.entries(pivots)) {
            const speed = orbitalSpeeds[name] || 0.02;
            pivot.rotation.y = time * speed;
        }

        // Update planet rotation to simulate axial spin
        for (const [name, planet] of Object.entries(planets)) {
            const spin = spinSpeeds[name] || 0.005;
            planet.rotation.y += spin;
        }

        // Ensure all labels are always facing the camera
        for (const label of labels) {
            label.lookAt(camera.position);
        }

        // Optionally make panels face the camera as well
        if (panels) {
            for (const panel of panels) {
                panel.lookAt(camera.position);
            }
        }

        controls.update(); // Apply any orbit control changes
        renderer.render(scene, camera); // Render the current scene
    }

    /**
     * Makes the renderer responsive to browser resizing.
     * Adjusts camera aspect ratio and renderer size accordingly.
     */
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    });

    // Begin the animation/render loop
    render();
}
