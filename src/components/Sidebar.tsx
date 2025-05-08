import React from 'react'
import sections from '../data/sections'

type Props = {
  onSelectSection: (planet: string, title: string) => void   // Callback invoked when a section button is clicked
}

export default function Sidebar({ onSelectSection }: Props) {
  return (
    <div className="sidebar">
      {/* Render a button for each section defined in data/sections */}
      {sections.map((sec) => (
        <button
          key={sec.title}
          // When clicked, call onSelectSection with the planet and section title
          onClick={() => onSelectSection(sec.planet, sec.title)}
        >
          {sec.title}  {/* Display the section title as the button label */}
        </button>
      ))}

      {/* A reset button to reload the page and reset the view */}
      <button onClick={() => window.location.reload()}>Reset View</button>
    </div>
  )
}