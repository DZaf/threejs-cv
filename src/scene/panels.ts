import * as THREE from 'three';

/**
 * Creates a panel mesh with text rendered on a canvas.
 * The canvas is used as a texture on a plane geometry.
 *
 * @param textContent - The text to display in the panel
 * @returns A THREE.Mesh displaying the text
 */
export function createTextPanel(textContent: string): THREE.Mesh {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Canvas 2D context could not be created.');
  }

  // Draw panel background
  context.fillStyle = '#222244';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the text
  context.font = 'bold 28px Arial';
  context.fillStyle = '#ffffff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  const lines = textContent.split('\n');
  const lineHeight = 40;
  const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, i) => {
    context.fillText(line, canvas.width / 2, startY + i * lineHeight);
  });

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const geometry = new THREE.PlaneGeometry(20, 20);

  return new THREE.Mesh(geometry, material);
}

/**
 * Creates a small clickable close button with an X icon texture.
 *
 * @returns A THREE.Mesh representing the close button
 */
export function createCloseButton(): THREE.Mesh {
  const texture = new THREE.TextureLoader().load(
    'https://cdn-icons-png.flaticon.com/512/1828/1828778.png'
  );

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });

  return new THREE.Mesh(geometry, material);
}
