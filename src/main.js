// Import core Three.js modules and additional helpers
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import './style.css'; // Import the main stylesheet for layout and canvas styling

// Create the scene which will hold all 3D objects
const scene = new THREE.Scene();

// Setup the perspective camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.setZ(80); // Move the camera back so we can view objects

// Setup the WebGL renderer and attach it to the canvas element
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(window.devicePixelRatio); // Improves clarity on high DPI screens
renderer.setSize(window.innerWidth, window.innerHeight);

// Enable user interaction with the scene using OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Adds smooth motion
controls.dampingFactor = 0.05;

// Create a sun object using a sphere geometry and basic yellow material
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(8, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
sun.position.set(0, 0, 0);
scene.add(sun);

// Load textures for different planet surfaces
const textureLoader = new THREE.TextureLoader();
const venusTexture = textureLoader.load('/textures/venus.jpg');
const marsTexture = textureLoader.load('/textures/mars.jpg');
const jupiterTexture = textureLoader.load('/textures/jupiter.jpg');
const moonTexture = textureLoader.load('/textures/moon.jpg');
const venusSurfaceTexture = textureLoader.load('/textures/venus_surface.jpg');

// Set a starry background using a texture
scene.background = textureLoader.load('/textures/stars.jpg');

// Add lighting to the scene
scene.add(new THREE.PointLight(0xffffff, 1, 100).position.set(20, 20, 20));
scene.add(new THREE.AmbientLight(0xffffff)); // Soft overall lighting

// Prepare reusable sphere geometry and material options
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const planetMaterialOptions = { roughness: 0.8, metalness: 0.1 };

// Create individual planets for sections of the CV
const skillsPlanet = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ map: venusTexture, ...planetMaterialOptions }));
const educationPlanet = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ map: marsTexture, ...planetMaterialOptions }));
const experiencePlanet = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ map: jupiterTexture, ...planetMaterialOptions }));
const certificationsPlanet = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ map: moonTexture, ...planetMaterialOptions }));
const contactPlanet = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ map: venusSurfaceTexture, ...planetMaterialOptions }));

// Create pivot points to control the rotation of each planet
const skillsPivot = new THREE.Object3D();
const educationPivot = new THREE.Object3D();
const experiencePivot = new THREE.Object3D();
const certificationsPivot = new THREE.Object3D();
const contactPivot = new THREE.Object3D();

// Add pivots to the scene
scene.add(skillsPivot, educationPivot, experiencePivot, certificationsPivot, contactPivot);

// Attach each planet to its respective pivot
skillsPivot.add(skillsPlanet);
educationPivot.add(educationPlanet);
experiencePivot.add(experiencePlanet);
certificationsPivot.add(certificationsPlanet);
contactPivot.add(contactPlanet);

// Position the planets in space
skillsPlanet.position.set(20, 0, 0);
educationPlanet.position.set(30, 0, 0);
experiencePlanet.position.set(40, 0, 0);
certificationsPlanet.position.set(50, 0, 0);
contactPlanet.position.set(60, 0, 0);

// Load a font and create labels for each planet
let skillsLabel, educationLabel, experienceLabel, certificationsLabel, contactLabel;
const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
    const createLabel = (text, position) => {
        const textGeometry = new TextGeometry(text, {
            font,
            size: 2,
            height: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 3,
        });
        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textGeometry.computeBoundingBox();
        const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
        textMesh.position.set(position.x + centerOffset, position.y, position.z);
        return textMesh;
    };

    // Generate labels for each section
    skillsLabel = createLabel('Skills', { x: skillsPlanet.position.x, y: skillsPlanet.position.y + 5, z: skillsPlanet.position.z });
    educationLabel = createLabel('Education', { x: educationPlanet.position.x, y: educationPlanet.position.y + 5, z: educationPlanet.position.z });
    experienceLabel = createLabel('Experience', { x: experiencePlanet.position.x, y: experiencePlanet.position.y + 5, z: experiencePlanet.position.z });
    certificationsLabel = createLabel('Certifications', { x: certificationsPlanet.position.x, y: certificationsPlanet.position.y + 5, z: certificationsPlanet.position.z });
    contactLabel = createLabel('Contact', { x: contactPlanet.position.x, y: contactPlanet.position.y + 5, z: contactPlanet.position.z });

    // Attach labels to pivots
    skillsPivot.add(skillsLabel);
    educationPivot.add(educationLabel);
    experiencePivot.add(experienceLabel);
    certificationsPivot.add(certificationsLabel);
    contactPivot.add(contactLabel);
});

// Enable raycasting for interactivity
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let activePanel = null;
let closeButton = null;

// Function to create a text panel that displays information
function createTextPanel(textContent) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    context.fillStyle = '#222244';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 28px Arial';
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const lines = textContent.split('\n');
    const lineHeight = 40;
    const startY = (canvas.height / 2) - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => context.fillText(line, canvas.width / 2, startY + i * lineHeight));

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true });
    const geometry = new THREE.PlaneGeometry(20, 20);
    const panelMesh = new THREE.Mesh(geometry, material);
    panelMesh.position.set(0, 0, 10);
    return panelMesh;
}

// Creates a clickable close button for the info panels
function createCloseButton() {
    const texture = new THREE.TextureLoader().load('https://cdn-icons-png.flaticon.com/512/1828/1828778.png');
    const buttonGeometry = new THREE.PlaneGeometry(2, 2);
    const buttonMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
    buttonMesh.position.set(8, 8, 10.5);
    return buttonMesh;
}

// Handle mouse click events for selecting planets and toggling info panels
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const clickableObjects = [skillsPlanet, educationPlanet, experiencePlanet, certificationsPlanet, contactPlanet];
    if (closeButton) clickableObjects.push(closeButton);

    const intersects = raycaster.intersectObjects(clickableObjects);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        if (clickedObject === closeButton) {
            scene.remove(activePanel, closeButton);
            activePanel = null;
            closeButton = null;
            return;
        }

        if (activePanel) scene.remove(activePanel, closeButton);

        const panelContent = clickedObject === skillsPlanet ? 'Skills:\nReact\nRedux\nTypeScript\nNode.js\nAEM' :
            clickedObject === educationPlanet ? 'Education:\nIntegrated Master\nUniversity of Aegean\n2014-2019' :
                clickedObject === experiencePlanet ? 'Experience:\nMSC Cruises\nE.ON\nSwinkels\nilly' :
                    clickedObject === certificationsPlanet ? 'Certifications:\nAdobe Certified Expert\nBLS' :
                        'Contact:\nDzaf96@gmail.com\nLinkedIn';

        activePanel = createTextPanel(panelContent);
        closeButton = createCloseButton();
        scene.add(activePanel, closeButton);
    }
}

window.addEventListener('click', onMouseClick);

// Animation loop to rotate planets and keep labels facing the camera
function animate() {
    requestAnimationFrame(animate);

    // Rotate each planet around its own axis
    skillsPlanet.rotation.y += 0.005;
    educationPlanet.rotation.y += 0.005;
    experiencePlanet.rotation.y += 0.005;
    certificationsPlanet.rotation.y += 0.005;
    contactPlanet.rotation.y += 0.005;

    // Rotate pivot points to orbit the planets
    skillsPivot.rotation.y += 0.01;
    educationPivot.rotation.y += 0.008;
    experiencePivot.rotation.y += 0.006;
    certificationsPivot.rotation.y += 0.004;
    contactPivot.rotation.y += 0.002;

    // Ensure labels always face the camera
    if (skillsLabel) skillsLabel.lookAt(camera.position);
    if (educationLabel) educationLabel.lookAt(camera.position);
    if (experienceLabel) experienceLabel.lookAt(camera.position);
    if (certificationsLabel) certificationsLabel.lookAt(camera.position);
    if (contactLabel) contactLabel.lookAt(camera.position);

    controls.update();
    renderer.render(scene, camera);
}

animate();
