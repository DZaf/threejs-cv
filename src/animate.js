// Starts the animation loop for rendering, rotating planets, orbiting, and updating labels
export function animate(scene, camera, renderer, controls, pivots, planets, labels = {}) {
    function loop() {
        // Schedule the next frame
        requestAnimationFrame(loop);

        // Rotate each planet around its own Y-axis (simulates spinning)
        for (const key in planets) {
            planets[key].rotation.y += 0.005;
        }

        // Define different orbital speeds for each planet's pivot object
        const orbitSpeeds = {
            skills: 0.01,
            education: 0.008,
            experience: 0.006,
            certifications: 0.004,
            contact: 0.002,
        };

        // Rotate each pivot object to simulate orbital movement around the sun
        for (const key in pivots) {
            pivots[key].rotation.y += orbitSpeeds[key];
        }

        // Ensure each label always faces the camera for readability
        for (const key in labels) {
            if (labels[key]) {
                labels[key].lookAt(camera.position);
            }
        }

        // Update orbit controls (for smooth camera movement and damping)
        controls.update();

        // Render the current state of the scene from the camera's perspective
        renderer.render(scene, camera);
    }

    // Start the animation loop
    loop();
}
