declare module 'three/examples/jsm/geometries/TextGeometry' {
    import * as THREE from 'three';
    import { Font } from 'three/examples/jsm/loaders/FontLoader';

    export interface TextGeometryParameters {
        font: Font;
        depth?: number;
        size?: number;
        height?: number;
        curveSegments?: number;
        bevelEnabled?: boolean;
        bevelThickness?: number;
        bevelSize?: number;
        bevelOffset?: number;
        bevelSegments?: number;
    }

    export class TextGeometry extends THREE.BufferGeometry {
        constructor(text: string, parameters: TextGeometryParameters);
    }
}
