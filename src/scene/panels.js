import * as THREE from 'three';

// Creates a panel mesh with dynamic text using an HTML canvas texture
export function createTextPanel(textContent) {
    // Create an HTML canvas to draw the panel content
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');

    // Fill background with a dark blue-gray color
    context.fillStyle = '#222244';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Configure font style and color for the text
    context.font = 'bold 28px Arial';
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Split text content into lines and draw each line vertically centered
    const lines = textContent.split('\n');
    const lineHeight = 40;
    const startY = (canvas.height / 2) - ((lines.length - 1) * lineHeight) / 2;

    lines.forEach((line, i) => {
        context.fillText(line, canvas.width / 2, startY + i * lineHeight);
    });

    // Use the canvas as a texture for a plane geometry
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true
    });
    const geometry = new THREE.PlaneGeometry(20, 20);

    // Return the mesh to be positioned in the scene
    return new THREE.Mesh(geometry, material);
}

// Creates a clickable "X" button using an image texture on a plane
export function createCloseButton() {
    // Load an "X" icon from a public URL
    const texture = new THREE.TextureLoader().load('https://cdn-icons-png.flaticon.com/512/1828/1828778.png');

    // Small plane to display the close icon
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    });

    return new THREE.Mesh(geometry, material);
}
