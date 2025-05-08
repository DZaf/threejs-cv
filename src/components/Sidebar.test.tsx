import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Sidebar from './Sidebar'
import sections from '../data/sections'

describe('Sidebar', () => {
    it('renders one button per section plus reset', () => {
        const onSelect = jest.fn()
        render(<Sidebar onSelectSection={onSelect} />)
        // section buttons
        sections.forEach(sec => {
            const btn = screen.getByRole('button', { name: sec.title })
            expect(btn).toBeInTheDocument()
            fireEvent.click(btn)
            expect(onSelect).toHaveBeenCalledWith(sec.planet, sec.title)
        })
        // reset button
        expect(screen.getByRole('button', { name: /reset view/i })).toBeInTheDocument()
    })
})
