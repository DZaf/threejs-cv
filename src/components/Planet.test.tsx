// src/components/Planet.test.tsx

// 1) Mock Fiber & Drei *before* imports:
jest.mock('@react-three/fiber', () => {
    const actual = jest.requireActual('@react-three/fiber')
    return {
        ...actual,
        Canvas: ({ children }: any) => <>{children}</>,
        useLoader: () => ({}),          // no real texture load
    }
})
jest.mock('@react-three/drei', () => {
    const actual = jest.requireActual('@react-three/drei')
    return {
        ...actual,
        Html: ({ children }: any) => <div>{children}</div>,
    }
})

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Planet from './Planet'
import { PlanetInfo } from '../data/planets'

describe('Planet', () => {
    const dummyInfo: PlanetInfo = {
        name: 'Test',
        size: 1,
        distance: 1,
        speed: 1,
        color: 'red',
    }

    it('renders the label and handles clicks', () => {
        const onClick = jest.fn()
        render(<Planet info={dummyInfo} onClick={onClick} />)

        // The <div class="label">Test</div> should now be in the DOM
        const label = screen.getByText('Test')
        expect(label).toBeInTheDocument()

        fireEvent.click(label)
        expect(onClick).toHaveBeenCalled()
    })
})
