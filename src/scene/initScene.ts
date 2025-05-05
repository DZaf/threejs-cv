import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Initializes the core Three.js scene setup including camera, renderer, orbit controls, and lighting.
 *
 * @returns An object containing initialized scene, camera, renderer, and controls.
 */
export function initScene(): {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
} {
    // Create the main Three.js scene
    const scene = new THREE.Scene();

    // Set up a perspective camera with:
    // - Field of view: 75 degrees
    // - Aspect ratio: based on the browser window
    // - Near and far clipping planes: 0.1 to 1000 units
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.setZ(80); // Position the camera away from the origin on the Z-axis

    // Create the renderer using a specific <canvas> element with ID 'bg'
    const canvas = document.querySelector('#bg') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({ canvas });

    // Improve visual quality and match screen resolution
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set up orbit controls to allow mouse interaction with the camera
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth movement
    controls.dampingFactor = 0.05;

    // Set the scene background to a stars texture for a space-like environment
    scene.background = new THREE.TextureLoader().load('/textures/stars.jpg');

    // Add a point light to simulate a light source like the sun
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Add ambient light for soft, even illumination of all objects
    scene.add(new THREE.AmbientLight(0xffffff));

    return { scene, camera, renderer, controls };
}
