import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Initializes the core Three.js scene components:
 * - Scene
 * - Perspective camera
 * - WebGL renderer
 * - OrbitControls
 * - Lighting
 *
 * @returns An object containing the scene, camera, renderer, and controls
 */
export function initScene(): {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
} {
    // Create the main 3D scene container
    const scene = new THREE.Scene();

    // Create the camera with FOV, aspect ratio, near/far clipping planes
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.setZ(80);

    // Create and configure the WebGL renderer
    const canvas = document.querySelector('#bg') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set up orbit controls for camera interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Set background to a space/star texture
    scene.background = new THREE.TextureLoader().load('/textures/stars.jpg');

    // Add lighting: point light (sun-like) and ambient fill light
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    scene.add(new THREE.AmbientLight(0xffffff));

    return { scene, camera, renderer, controls };
}
