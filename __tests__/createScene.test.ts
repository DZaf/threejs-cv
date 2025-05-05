import '@testing-library/jest-dom';
import { createScene } from '../src/createScene';

const mockCanvas = document.createElement('canvas');

jest.mock('three', () => {
    const actualThree = jest.requireActual('three');
    return {
        ...actualThree,
        WebGLRenderer: jest.fn().mockImplementation(() => ({
            domElement: mockCanvas,
            setSize: jest.fn(),
            render: jest.fn(),
        })),
    };
});

describe('createScene', () => {
    it('creates a valid THREE.Scene', () => {
        const { scene, camera, renderer } = createScene();
        expect(scene).toBeDefined();
        expect(scene.isScene).toBe(true);
        expect(camera).toBeDefined();
        expect(camera.isPerspectiveCamera).toBe(true);
        expect(renderer).toBeDefined();
        expect(renderer.domElement).toBeInstanceOf(HTMLCanvasElement);
    });

    it('sets camera position to z = 5', () => {
        const { camera } = createScene();
        expect(camera.position.z).toBeCloseTo(5);
    });

    it('renderer includes essential methods', () => {
        const { renderer } = createScene();
        expect(typeof renderer.setSize).toBe('function');
        expect(typeof renderer.render).toBe('function');
    });

    it('scene has no background by default', () => {
        const { scene } = createScene();
        expect(scene.background).toBeNull();
    });
});
