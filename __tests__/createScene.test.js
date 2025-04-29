// Import the createScene function which is the unit under test
import { createScene } from '../src/createScene';

// Since WebGLRenderer relies on an actual canvas context, which doesn't exist in a test environment,
// we create a fake <canvas> to mock it and avoid errors during renderer instantiation
const mockCanvas = document.createElement('canvas');

// Mock the WebGLRenderer class from Three.js to prevent WebGL-related crashes during tests
// Jest requires this mock setup to avoid using real rendering logic in a Node.js environment
jest.mock('three', () => {
    // First, import the actual Three.js library to preserve all other functionalities
    const actualThree = jest.requireActual('three');

    return {
        ...actualThree, // Preserve all other exports like Scene, PerspectiveCamera, etc.

        // Override WebGLRenderer to provide a fake implementation that won't throw errors
        WebGLRenderer: jest.fn().mockImplementation(() => ({
            domElement: mockCanvas,       // Simulate renderer output canvas
            setSize: jest.fn(),           // Stub for setSize method
            render: jest.fn(),            // Stub for render method
        })),
    };
});

// Describe block groups related tests for createScene()
describe('createScene', () => {
    // This individual test checks if createScene() correctly creates a 3D scene setup
    it('creates a valid THREE.Scene', () => {
        // Call the function under test
        const { scene, camera, renderer } = createScene();

        // Assert that the scene object exists and is a valid THREE.Scene instance
        expect(scene).toBeDefined();
        expect(scene.isScene).toBe(true);

        // Assert that the camera exists and is a PerspectiveCamera
        expect(camera).toBeDefined();
        expect(camera.isPerspectiveCamera).toBe(true);

        // Assert that the renderer exists and outputs to an HTML canvas
        expect(renderer).toBeDefined();
        expect(renderer.domElement).toBeInstanceOf(HTMLCanvasElement);
    });
});
