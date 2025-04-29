import * as THREE from 'three';
import { createTextPanel, createCloseButton } from '../scene/panels.js';

// Sets up raycasting-based click interaction for planets and info panels
export function setupInteraction(scene, camera, planets) {
    const raycaster = new THREE.Raycaster(); // Detects objects under the mouse pointer
    const mouse = new THREE.Vector2();       // Stores mouse coordinates in normalized space
    let activePanel = null;                  // Currently visible information panel
    let closeButton = null;                  // "X" button to close the panel

    // Handles mouse clicks and responds to object interaction
    function onMouseClick(event) {
        // Convert screen-space click position to normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Cast a ray from the camera in the direction of the mouse pointer
        raycaster.setFromCamera(mouse, camera);

        // Build list of clickable objects (planets + close button if visible)
        const clickableObjects = Object.values(planets);
        if (closeButton) clickableObjects.push(closeButton);

        // Find intersections between ray and clickable objects
        const intersects = raycaster.intersectObjects(clickableObjects);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            // If the close button was clicked, remove the current panel
            if (clickedObject === closeButton) {
                scene.remove(activePanel);
                activePanel = null;
                closeButton = null;
                return;
            }

            // Remove any previously displayed panel
            if (activePanel) {
                scene.remove(activePanel);
            }

            // Determine content based on which planet was clicked
            const panelContent = clickedObject === planets.skills
                ? 'Skills:\nReact\nRedux\nTypeScript\nNode.js\nAEM'
                : clickedObject === planets.education
                    ? 'Education:\nIntegrated Master\nUniversity of Aegean\n2014-2019'
                    : clickedObject === planets.experience
                        ? 'Experience:\nMSC Cruises\nE.ON\nSwinkels\nilly'
                        : clickedObject === planets.certifications
                            ? 'Certifications:\nAdobe Certified Expert\nBLS'
                            : 'Contact:\nDzaf96@gmail.com\nLinkedIn';

            // Create the panel and place it a fixed distance in front of the camera
            activePanel = createTextPanel(panelContent);
            const cameraDirection = new THREE.Vector3();
            camera.getWorldDirection(cameraDirection);
            const distance = 25;

            // Move panel in front of the camera by projecting along its forward vector
            activePanel.position.copy(camera.position).add(cameraDirection.multiplyScalar(distance));

            // Make the panel face the camera for readability
            activePanel.lookAt(camera.position);

            // Create and position the close button relative to the panel
            closeButton = createCloseButton();
            closeButton.position.set(8, 8, 0);
            activePanel.add(closeButton);

            // Add the panel (and button) to the scene
            scene.add(activePanel);
        }
    }

    // Register the click listener once during setup
    window.addEventListener('click', onMouseClick);
}
