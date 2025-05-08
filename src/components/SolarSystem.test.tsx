// src/components/SolarSystem.test.tsx

// 1) Mocks must come BEFORE you import React/your component:
jest.mock('@react-three/fiber', () => {
    const actual = jest.requireActual('@react-three/fiber')
    return {
        ...actual,
        // make Canvas simply inline its children
        Canvas: ({ children }: any) => <>{children}</>,
        // stub useLoader to return a “texture” with repeat.set(), etc.
        useLoader: () => ({
            wrapS: 0,
            wrapT: 0,
            repeat: { set: (_x: number, _y: number) => { } },
            magFilter: 0,
            minFilter: 0,
            needsUpdate: false,
        }),
        // stub useFrame to no‐op
        useFrame: () => null,
    }
})

jest.mock('@react-three/drei', () => {
    const actual = jest.requireActual('@react-three/drei')
    return {
        ...actual,
        // render Stars as nothing
        Stars: () => null,
        // inline Html’s children into a plain div
        Html: ({ children }: any) => <div>{children}</div>,
    }
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import SolarSystem from './SolarSystem'
import planets from '../data/planets'

describe('SolarSystem', () => {
    it('renders one .label div per planet name', () => {
        // 2) Render your component (Canvas is inlined so hooks work)
        render(<SolarSystem selectedSection={null} onSelectSection={() => { }} />)

        // 3) There should be exactly as many `.label` divs as planets
        const labels = document.querySelectorAll('.label')
        expect(labels).toHaveLength(planets.length)

        // 4) Each one’s textContent must match the planet name
        planets.forEach((p, i) => {
            expect(labels[i].textContent).toBe(p.name)
        })
    })
})
