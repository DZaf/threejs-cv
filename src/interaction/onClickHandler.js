import * as THREE from 'three';
import { createTextPanel, createCloseButton } from '../scene/panels.js';


// Smoothly animate a vector toward a target over time
function animateVector3(vector, target, duration = 500) {
    const start = vector.clone();
    const startTime = performance.now();

    function animate(time) {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);
        vector.lerpVectors(start, target, t);

    }

    requestAnimationFrame(animate);
}
let activePanel = null;

export function setupInteraction(scene, camera, planets) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let closeButton = null;
    const originalPositions = {}; // To store original positions for reset

    function onPlanetClick(clickedObject) {

        // Save original position for return
        if (!originalPositions[clickedObject.uuid]) {
            originalPositions[clickedObject.uuid] = clickedObject.position.clone();
        }

        // --- Panel placement ---
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);
        const distance = 25;
        const panelCenter = camera.position.clone().add(cameraDirection.clone().multiplyScalar(distance));

        // --- Planet placement ---
        const cameraRight = new THREE.Vector3();
        cameraRight.crossVectors(cameraDirection, camera.up).normalize();

        const closerDistance = distance - 5; // Bring planet 5 units closer than the panel
        const planetCenter = camera.position.clone().add(cameraDirection.clone().multiplyScalar(closerDistance));
        const targetPosition = planetCenter.add(cameraRight.multiplyScalar(-7)); // 7 units left of panel

        animateVector3(clickedObject.position, targetPosition, 600);

        // Remove old panel if any
        if (activePanel) {
            scene.remove(activePanel);
            activePanel = null;
            closeButton = null;
        }

        // Choose panel content
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

        // Create and place the info panel
        activePanel = createTextPanel(panelContent);
        activePanel.position.copy(panelCenter);
        activePanel.lookAt(camera.position);

        // Add close button to panel
        closeButton = createCloseButton();
        closeButton.position.set(8, 8, 0);
        activePanel.add(closeButton);

        scene.add(activePanel);
    }

    // Mouse click handler
    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const clickableObjects = Object.values(planets);
        if (closeButton) clickableObjects.push(closeButton);

        const intersects = raycaster.intersectObjects(clickableObjects);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            // Close panel and restore planet
            if (clickedObject === closeButton) {
                scene.remove(activePanel);
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

            onPlanetClick(clickedObject);
        }
    }

    // Sidebar interaction
    window.addEventListener('planet-click', (e) => {
        const planet = planets[e.detail];
        if (planet) {
            onPlanetClick(planet);
        }
    });

    // Mouse click
    window.addEventListener('click', onMouseClick);
}

export function getActivePanel() {
    return activePanel;
}