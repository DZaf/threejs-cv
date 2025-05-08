import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import InfoPanel from './InfoPanel'
import sections from '../data/sections'

describe('InfoPanel', () => {
    it('renders nothing when inactive', () => {
        const { container } = render(
            <InfoPanel activePlanet={null} activeTitle={null} onClose={() => { }} />
        )
        expect(container.firstChild).toBeNull()
    })

    it('renders a section title and items when active', () => {
        const sec = sections.find(s => s.title === 'Skills')!
        const onClose = jest.fn()
        render(
            <InfoPanel
                activePlanet={sec.planet}
                activeTitle={sec.title}
                onClose={onClose}
            />
        )
        // heading
        expect(screen.getByRole('heading', { name: sec.title })).toBeInTheDocument()
        // list items
        sec.items.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument()
        })
        // close button
        fireEvent.click(screen.getByRole('button', { name: /close/i }))
        expect(onClose).toHaveBeenCalled()
    })
})
