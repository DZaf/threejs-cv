import * as THREE from 'three';

/**
 * Creates a 3D panel mesh with custom text drawn on an HTML canvas.
 * The canvas is used as a texture, mapped onto a plane geometry.
 *
 * @param textContent - The text to render on the panel (can include line breaks)
 * @returns A THREE.Mesh with the canvas-based texture applied
 */
export function createTextPanel(textContent: string): THREE.Mesh {
  // Create a canvas to draw the text
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Canvas 2D context could not be created.');
  }

  // Fill the canvas with a background color
  context.fillStyle = '#222244';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Configure font styling
  context.font = 'bold 28px Arial';
  context.fillStyle = '#ffffff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  // Split the text into lines and vertically center them
  const lines = textContent.split('\n');
  const lineHeight = 40;
  const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;

  // Draw each line of text on the canvas
  lines.forEach((line, i) => {
    context.fillText(line, canvas.width / 2, startY + i * lineHeight);
  });

  // Create a texture from the canvas and apply it to a basic material
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
  });

  // Use a plane geometry to create the panel
  const geometry = new THREE.PlaneGeometry(20, 20);

  return new THREE.Mesh(geometry, material);
}

/**
 * Creates a small, textured close button mesh using a predefined "X" icon.
 * This can be positioned in the corner of a panel for interactivity.
 *
 * @returns A THREE.Mesh representing the close button
 */
export function createCloseButton(): THREE.Mesh {
  // Load the close (X) icon texture
  const texture = new THREE.TextureLoader().load(
    'https://cdn-icons-png.flaticon.com/512/1828/1828778.png'
  );

  // Apply the texture to a plane geometry
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });

  return new THREE.Mesh(geometry, material);
}
