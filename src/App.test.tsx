import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
    it('renders the sidebar and canvas', () => {
        render(<App />)
        // sidebar should exist
        expect(screen.getByText(/reset view/i)).toBeInTheDocument()
        // The canvas element should be in the document
        expect(document.querySelector('canvas')).toBeInTheDocument()
    })
})
