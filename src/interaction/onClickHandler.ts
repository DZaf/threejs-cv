import * as THREE from 'three';
import { createTextPanel, createCloseButton } from '../scene/panels';

// Reference to the currently displayed panel
let activePanel: THREE.Object3D | null = null;

// A reference map to track planets by name for easy lookup
let planetMap: Record<string, THREE.Mesh> = {};

/**
 * Smoothly interpolates a vector's value toward a target over a given duration.
 * Useful for animating position transitions (e.g., returning planets to original positions).
 *
 * @param vector - The vector to animate
 * @param target - The target vector to animate toward
 * @param duration - Duration in milliseconds (default: 500ms)
 */
function animateVector3(
    vector: THREE.Vector3,
    target: THREE.Vector3,
    duration = 500
): void {
    const start = vector.clone();
    const startTime = performance.now();

    function animate(time: number) {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);
        vector.lerpVectors(start, target, t);

        if (t < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

/**
 * Sets up interaction logic for clicking on planets and displaying associated panels.
 * Handles mouse raycasting, panel creation, close button logic, and Redux-triggered selection.
 *
 * @param scene - The Three.js scene
 * @param camera - The active camera used for raycasting
 * @param planets - A map of planet names to mesh objects
 */
export function setupInteraction(
    scene: THREE.Scene,
    camera: THREE.Camera,
    planets: Record<string, THREE.Mesh>
): void {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    planetMap = planets;

    let closeButton: THREE.Mesh | null = null;
    const originalPositions: Record<string, THREE.Vector3> = {};

    /**
     * Displays a text panel for the clicked planet and positions it facing the camera.
     * Also adds a close button to the panel.
     */
    function onPlanetClick(clickedObject: THREE.Mesh): void {
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);

        const distance = 25;
        const panelCenter = camera.position
            .clone()
            .add(cameraDirection.clone().multiplyScalar(distance));

        // Remove any previously displayed panel
        if (activePanel) {
            scene.remove(activePanel);
            activePanel = null;
            closeButton = null;
        }

        // Determine panel content based on the clicked planet
        const panelContent =
            clickedObject === planets.skills
                ? 'Skills:\nReact\nRedux\nTypeScript\nNode.js\nAEM'
                : clickedObject === planets.education
                    ? 'Education:\nIntegrated Master\nUniversity of Aegean\n2014-2019'
                    : clickedObject === planets.experience
                        ? 'Experience:\nMSC Cruises\nE.ON\nSwinkels\nilly'
                        : clickedObject === planets.certifications
                            ? 'Certifications:\nAdobe Certified Expert\nBLS'
                            : 'Contact:\nDzaf96@gmail.com\nLinkedIn';

        // Create the panel mesh and orient it to face the camera
        activePanel = createTextPanel(panelContent);
        activePanel.position.copy(panelCenter);
        activePanel.lookAt(camera.position);

        // Create and attach a close button to the panel
        closeButton = createCloseButton();
        closeButton.position.set(8, 8, 0);
        activePanel.add(closeButton);

        scene.add(activePanel);
    }

    /**
     * Handles mouse clicks to trigger raycasting.
     * Determines if a planet or the close button was clicked.
     */
    function onMouseClick(event: MouseEvent): void {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const clickableObjects: THREE.Object3D[] = Object.values(planets);
        if (closeButton) clickableObjects.push(closeButton);

        const intersects = raycaster.intersectObjects(clickableObjects);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            // If close button clicked, remove the panel and animate planets back
            if (clickedObject === closeButton) {
                scene.remove(activePanel!);
                activePanel = null;
                closeButton = null;

                for (const planet of Object.values(planets)) {
                    const original = originalPositions[planet.uuid];
                    if (original) {
                        animateVector3(planet.position, original, 600);
                    }
                }
                return;
            }

            // Save original position before changing view
            if (!originalPositions[clickedObject.uuid]) {
                originalPositions[clickedObject.uuid] = clickedObject.position.clone();
            }

            onPlanetClick(clickedObject as THREE.Mesh);
        }
    }

    /**
     * Listens for custom "planet-click" events to support external interaction
     * (e.g., selecting a planet via a Redux-connected UI panel).
     */
    window.addEventListener('planet-click', (e: Event) => {
        const detail = (e as CustomEvent).detail;
        const planet = planets[detail];
        if (planet) {
            onPlanetClick(planet);
        }
    });

    // Enable mouse click interaction for planet selection
    window.addEventListener('click', onMouseClick);
}

/**
 * Returns the currently active panel mesh, if one exists.
 */
export function getActivePanel(): THREE.Object3D | null {
    return activePanel;
}

/**
 * Triggers a planet panel to open by dispatching a custom event.
 * Used for external triggers (e.g., clicking a button in the sidebar).
 *
 * @param name - The key of the planet to select
 */
export function selectPlanetByName(name: string): void {
    const planet = planetMap[name];
    if (planet) {
        const event = new CustomEvent('planet-click', { detail: name });
        window.dispatchEvent(event);
    }
}
