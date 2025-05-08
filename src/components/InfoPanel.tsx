import React from 'react'
import sections, { Section } from '../data/sections'

type Props = {
  activePlanet: string | null    // Currently selected planet identifier
  activeTitle: string | null     // Currently selected section title
  onClose: () => void            // Callback to close the panel
}

export default function InfoPanel({
  activePlanet,
  activeTitle,
  onClose,
}: Props) {
  // If no planet or section is active, do not render the panel
  if (!activePlanet || !activeTitle) return null

  // Find the section data matching the selected planet and title
  const sec: Section | undefined = sections.find(
    (s) => s.planet === activePlanet && s.title === activeTitle
  )
  // If no matching section is found, do not render
  if (!sec) return null

  // Determine if the current section is 'Experience' to render as timeline
  const isExperience = sec.title === 'Experience'

  return (
    <div className="info-panel">
      {/* Close button to dismiss the panel */}
      <button className="close-button" onClick={onClose} aria-label="Close">
        ×
      </button>

      {/* Section heading */}
      <h2>{sec.title}</h2>

      {isExperience ? (
        // Render experience items as a vertical timeline if section is Experience
        <ul className="experience-timeline">
          {sec.items.map((item, idx) => {
            // Split entry at the first colon to separate header and description
            const [header, ...rest] = item.split(':')
            const desc = rest.join(':').trim()
            return (
              <li key={idx} className="experience-item">
                {/* Timeline entry header (e.g., role and dates) */}
                <div className="experience-header">{header.trim()}</div>
                {/* Timeline entry description */}
                <div className="experience-desc">{desc}</div>
              </li>
            )
          })}
        </ul>
      ) : (
        // Render other sections as a simple list
        <ul>
          {sec.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
