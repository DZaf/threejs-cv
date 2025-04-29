import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Initializes the core Three.js scene, camera, renderer, controls, and lighting
export function initScene() {
    // Create a new scene container where all 3D objects will be added
    const scene = new THREE.Scene();

    // Create a perspective camera to simulate a real-world view
    // Field of view: 75 degrees, aspect ratio based on screen size, near/far clipping planes
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.setZ(80); // Position the camera back along the Z axis for better initial view

    // Create the WebGL renderer and link it to the canvas with id="bg"
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg')
    });
    renderer.setPixelRatio(window.devicePixelRatio); // For high-DPI clarity
    renderer.setSize(window.innerWidth, window.innerHeight); // Fullscreen rendering

    // Add orbit controls to allow interactive camera movement
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;       // Enable inertia for smoother motion
    controls.dampingFactor = 0.05;       // Adjust damping strength

    // Set a starry background texture to enhance the space environment
    scene.background = new THREE.TextureLoader().load('/textures/stars.jpg');

    // Create and position a white point light to simulate a light source
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Add ambient light for general scene illumination (fills in shadows)
    scene.add(new THREE.AmbientLight(0xffffff));

    // Return all core components so they can be used elsewhere
    return { scene, camera, renderer, controls };
}
