import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';


// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.setZ(30);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
let isZooming = false;
let zoomTarget = new THREE.Vector3();
let initialCameraPos = new THREE.Vector3();
let zoomProgress = 0;

let isZoomingBack = false;
let zoomBackTarget = new THREE.Vector3();
let zoomBackStart = new THREE.Vector3();
let zoomBackProgress = 0;
const zoomBackSpeed = 0.02;
const zoomSpeed = 0.02;

const sunGeometry = new THREE.SphereGeometry(8, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow sun
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0); // Center
scene.add(sun);

const textureLoader = new THREE.TextureLoader();
const venusTexture = textureLoader.load('./textures/venus.jpg');
const marsTexture = textureLoader.load('./textures/mars.jpg');
const jupiterTexture = textureLoader.load('./textures/jupiter.jpg');
const moonTexture = textureLoader.load('./textures/moon.jpg');
const venusSurfaceTexture = textureLoader.load('./textures/venus_surface.jpg');

// Add Space Background
const spaceTexture = new THREE.TextureLoader().load('./textures/stars.jpg');
scene.background = spaceTexture;

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Create Rotating Cubes (we will create cubes here later)

// Material for all cubes
const PlanetMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    metalness: 0.7,
    roughness: 0.2,
});

// Cube Geometry
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);

// Create spheres
const skillsPlanet = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ map: venusTexture }));
skillsPlanet.position.set(-15, 10, 0);
scene.add(skillsPlanet);

const educationPlanet = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ map: marsTexture }));
educationPlanet.position.set(15, 10, 0);
scene.add(educationPlanet);

const experiencePlanet = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ map: jupiterTexture }));
experiencePlanet.position.set(-15, -10, 0);
scene.add(experiencePlanet);

const certificationsPlanet = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ map: moonTexture }));
certificationsPlanet.position.set(15, -10, 0);
scene.add(certificationsPlanet);

const contactPlanet = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ map: venusSurfaceTexture }));
contactPlanet.position.set(0, -20, 0);
scene.add(contactPlanet);

// Create pivot points
const skillsPivot = new THREE.Object3D();
const educationPivot = new THREE.Object3D();
const experiencePivot = new THREE.Object3D();
const certificationsPivot = new THREE.Object3D();
const contactPivot = new THREE.Object3D();

scene.add(skillsPivot);
scene.add(educationPivot);
scene.add(experiencePivot);
scene.add(certificationsPivot);
scene.add(contactPivot);

// Attach planets to pivots
skillsPivot.add(skillsPlanet);
educationPivot.add(educationPlanet);
experiencePivot.add(experiencePlanet);
certificationsPivot.add(certificationsPlanet);
contactPivot.add(contactPlanet);

skillsPlanet.position.set(20, 0, 0); // 20 units away
educationPlanet.position.set(30, 0, 0);
experiencePlanet.position.set(40, 0, 0);
certificationsPlanet.position.set(50, 0, 0);
contactPlanet.position.set(60, 0, 0);

const loader = new FontLoader();
let openingPanel = null;
let openProgress = 0;
const openSpeed = 0.05;
let skillsLabel, educationLabel, experienceLabel, certificationsLabel, contactLabel;
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    function createLabel(text, position) {
        const textGeometry = new TextGeometry(text, {
            font: font,
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

        return textMesh; // IMPORTANT!
    }

    skillsLabel = createLabel('Skills', { x: skillsPlanet.position.x, y: skillsPlanet.position.y + 5, z: skillsPlanet.position.z });
    educationLabel = createLabel('Education', { x: educationPlanet.position.x, y: educationPlanet.position.y + 5, z: educationPlanet.position.z });
    experienceLabel = createLabel('Experience', { x: experiencePlanet.position.x, y: experiencePlanet.position.y + 5, z: experiencePlanet.position.z });
    certificationsLabel = createLabel('Certifications', { x: certificationsPlanet.position.x, y: certificationsPlanet.position.y + 5, z: certificationsPlanet.position.z });
    contactLabel = createLabel('Contact', { x: contactPlanet.position.x, y: contactPlanet.position.y + 5, z: contactPlanet.position.z });


    skillsPivot.add(skillsLabel);
    educationPivot.add(educationLabel);
    experiencePivot.add(experienceLabel);
    certificationsPivot.add(certificationsLabel);
    contactPivot.add(contactLabel);
});

function createTextPanel(textContent) {
    const panelWidth = 512;
    const panelHeight = 512;

    // Create Canvas
    const canvas = document.createElement('canvas');
    canvas.width = panelWidth;
    canvas.height = panelHeight;
    const context = canvas.getContext('2d');

    // Background
    context.fillStyle = '#222244';
    context.fillRect(0, 0, panelWidth, panelHeight);

    // Text styling
    context.font = 'bold 28px Arial';
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Split text into lines
    const lines = textContent.split('\n');

    const lineHeight = 40;
    const startY = (panelHeight / 2) - ((lines.length - 1) * lineHeight) / 2;

    // Draw each line
    for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], panelWidth / 2, startY + i * lineHeight);
    }

    // Create texture
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true });
    const geometry = new THREE.PlaneGeometry(20, 20);
    const panelMesh = new THREE.Mesh(geometry, material);

    panelMesh.position.set(0, 0, 10);

    return panelMesh;
}



// Raycaster for clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let activePanel = null;
let closeButton = null;

function createCloseButton() {
    const buttonSize = 2;

    const textureLoader = new THREE.TextureLoader();
    const closeTexture = textureLoader.load('https://cdn-icons-png.flaticon.com/512/1828/1828778.png');

    const buttonGeometry = new THREE.PlaneGeometry(buttonSize, buttonSize);
    const buttonMaterial = new THREE.MeshBasicMaterial({ map: closeTexture, transparent: true });

    const buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
    buttonMesh.position.set(8, 8, 10.5);
    zoomTarget.set(0, 0, 0);

    return buttonMesh;
}

function onMouseClick(event) {// Calculate mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const clickableObjects = [skillsPlanet, educationPlanet, experiencePlanet, certificationsPlanet, contactPlanet];
    if (closeButton) clickableObjects.push(closeButton);

    const intersects = raycaster.intersectObjects(clickableObjects);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        if (clickedObject === closeButton) {
            // Start zooming back
            zoomBackStart.copy(camera.position);
            zoomBackTarget.set(0, 0, 100); // Original starting position (where your camera was initially)
            zoomBackProgress = 0;
            isZoomingBack = true;

            // Clean up panel and button immediately visually
            scene.remove(activePanel);
            scene.remove(closeButton);
            activePanel = null;
            closeButton = null;
            return;
        }
        if (activePanel) {
            scene.remove(activePanel);
            scene.remove(closeButton);
            activePanel = null;
            closeButton = null;
        }

        if (clickedObject === skillsPlanet) {
            activePanel = createTextPanel('Skills:\nReact\nRedux\nTypeScript\nNode.js\nAEM');
        } else if (clickedObject === educationPlanet) {
            activePanel = createTextPanel('Education:\nIntegrated Master\nUniversity of Aegean\n2014-2019');
        } else if (clickedObject === experiencePlanet) {
            activePanel = createTextPanel('Experience:\nMSC Cruises\nE.ON\nSwinkels\nilly');
        } else if (clickedObject === certificationsPlanet) {
            activePanel = createTextPanel('Certifications:\nAdobe Certified Expert\nBLS');
        } else if (clickedObject === contactPlanet) {
            activePanel = createTextPanel('Contact:\nDzaf96@gmail.com\nLinkedIn');
        }

        scene.add(activePanel);
        closeButton = createCloseButton();
        scene.add(closeButton);
        openingPanel = { panel: activePanel, button: closeButton };
        openProgress = 0;

        initialCameraPos.copy(camera.position);
        zoomTarget.set(0, 0, 25); // Target where the panel is (we placed panels at z=10)
        zoomProgress = 0;
        isZooming = true;

    }


}

window.addEventListener('click', onMouseClick, false);
camera.position.setZ(80);

// Animate
function animate() {
    requestAnimationFrame(animate);

    // Rotating all cubes
    skillsPlanet.rotation.y += 0.005;
    educationPlanet.rotation.y += 0.005;
    experiencePlanet.rotation.y += 0.005;
    certificationsPlanet.rotation.y += 0.005;
    contactPlanet.rotation.y += 0.005;

    // Rotate planets around Sun
    skillsPivot.rotation.y += 0.01; // Speed
    educationPivot.rotation.y += 0.008;
    experiencePivot.rotation.y += 0.006;
    certificationsPivot.rotation.y += 0.004;
    contactPivot.rotation.y += 0.002;

    if (skillsLabel) skillsLabel.lookAt(camera.position);
    if (educationLabel) educationLabel.lookAt(camera.position);
    if (experienceLabel) experienceLabel.lookAt(camera.position);
    if (certificationsLabel) certificationsLabel.lookAt(camera.position);
    if (contactLabel) contactLabel.lookAt(camera.position);

    // Handle panel opening animation
    if (openingPanel) {
        const { panel, button } = openingPanel;
        if (openProgress < 1) {
            openProgress += openSpeed;
            panel.scale.set(openProgress, openProgress, 1);
            button.scale.set(openProgress, openProgress, 1);

            panel.material.transparent = true;
            button.material.transparent = true;
            panel.material.opacity = openProgress;
            button.material.opacity = openProgress;
        } else {
            panel.scale.set(1, 1, 1);
            button.scale.set(1, 1, 1);
            panel.material.opacity = 1;
            button.material.opacity = 1;
            openingPanel = null; // Done
        }
    }

    if (isZooming) {
        zoomProgress += zoomSpeed;
        if (zoomProgress >= 1) {
            zoomProgress = 1;
            isZooming = false;
        }

        camera.position.lerpVectors(initialCameraPos, zoomTarget, zoomProgress);
    }

    if (isZoomingBack) {
        zoomBackProgress += zoomBackSpeed;
        if (zoomBackProgress >= 1) {
            zoomBackProgress = 1;
            isZoomingBack = false;
        }

        camera.position.lerpVectors(zoomBackStart, zoomBackTarget, zoomBackProgress);
    }

    controls.update();
    renderer.render(scene, camera);
}
animate();
