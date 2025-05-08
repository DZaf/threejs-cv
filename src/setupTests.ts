// src/setupTest.ts
import React from 'react'
import '@testing-library/jest-dom'  // adds custom matchers

// 1) Mock @react-three/fiber
jest.mock('@react-three/fiber', () => {
    const actual = jest.requireActual('@react-three/fiber')
    return {
        ...actual,
        Canvas: ({ children }: any) =>
            React.createElement(React.Fragment, null, ...(Array.isArray(children) ? children : [children])),
        useLoader: () => ({}),
        useFrame: () => null,
    }
})

// 2) Mock @react-three/drei
jest.mock('@react-three/drei', () => {
    const actual = jest.requireActual('@react-three/drei')
    return {
        ...actual,
        Stars: () => null,
        Html: ({ children }: any) =>
            React.createElement('div', null, ...(Array.isArray(children) ? children : [children])),
    }
})

// 3) Replace R3F primitives with plain <div>
const R3F_TAGS = [
    'group',
    'mesh',
    'pointLight',
    'ambientLight',
    'primitive',
    'sphereGeometry',
    'ringGeometry',
    'meshStandardMaterial',
    'meshBasicMaterial',
]

// keep original
const _origCreate = React.createElement

    // cast to any so TS lets us reassign
    ; (React.createElement as any) = (type: any, props: any, ...children: any[]) => {
        if (typeof type === 'string' && R3F_TAGS.includes(type)) {
            return _origCreate('div', props, ...children)
        }
        return _origCreate(type, props, ...children)
    }

// 4) Polyfill ResizeObserver
class ResizeObserver {
    constructor(private cb: ResizeObserverCallback) { }
    observe(_el: Element) { }
    unobserve(_el: Element) { }
    disconnect() { }
}
// @ts-ignore
global.ResizeObserver = ResizeObserver
