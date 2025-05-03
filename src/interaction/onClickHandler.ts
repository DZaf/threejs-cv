import * as THREE from 'three';
import { createTextPanel, createCloseButton } from '../scene/panels';

let activePanel: THREE.Object3D | null = null;
let planetMap: Record<string, THREE.Mesh> = {};

/**
 * Smoothly animates a vector toward a target over time.
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
 * Sets up raycasting and click interaction for selecting planets and panels.
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

    function onPlanetClick(clickedObject: THREE.Mesh): void {
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);

        const distance = 25;
        const panelCenter = camera.position
            .clone()
            .add(cameraDirection.clone().multiplyScalar(distance));

        // Remove existing panel if present
        if (activePanel) {
            scene.remove(activePanel);
            activePanel = null;
            closeButton = null;
        }

        // Determine content based on clicked object
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

        // Create and position panel
        activePanel = createTextPanel(panelContent);
        activePanel.position.copy(panelCenter);
        activePanel.lookAt(camera.position);

        // Add close button
        closeButton = createCloseButton();
        closeButton.position.set(8, 8, 0);
        activePanel.add(closeButton);

        scene.add(activePanel);
    }

    function onMouseClick(event: MouseEvent): void {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const clickableObjects: THREE.Object3D[] = Object.values(planets);
        if (closeButton) clickableObjects.push(closeButton);

        const intersects = raycaster.intersectObjects(clickableObjects);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

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

            // Store original position for return animation
            if (!originalPositions[clickedObject.uuid]) {
                originalPositions[clickedObject.uuid] = clickedObject.position.clone();
            }

            onPlanetClick(clickedObject as THREE.Mesh);
        }
    }

    // Trigger planet panel via event
    window.addEventListener('planet-click', (e: Event) => {
        const detail = (e as CustomEvent).detail;
        const planet = planets[detail];
        if (planet) {
            onPlanetClick(planet);
        }
    });

    // Main mouse interaction
    window.addEventListener('click', onMouseClick);
}

/**
 * Returns the currently active panel, or null if none is shown.
 */
export function getActivePanel(): THREE.Object3D | null {
    return activePanel;
}

/**
 * Triggers a planet panel via custom event dispatch.
 */
export function selectPlanetByName(name: string): void {
    const planet = planetMap[name];
    if (planet) {
        const event = new CustomEvent('planet-click', { detail: name });
        window.dispatchEvent(event);
    }
}
