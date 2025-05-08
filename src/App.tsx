import React, { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import SolarSystem from './components/SolarSystem'
import Sidebar from './components/Sidebar'
import InfoPanel from './components/InfoPanel'
import './style.css'

type ActiveState = { planet: string; title: string } | null

export default function App() {
  // Track which planet/section is currently active in the InfoPanel
  const [active, setActive] = useState<ActiveState>(null)

  // Memoized callback to update the active state when a section is selected
  const handleSection = useCallback(
    (planet: string, title: string) => {
      setActive({ planet, title })
    },
    [] // no dependencies: stable identity across renders
  )

  return (
    // Root container, makes a stacking context for absolute positioning
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Sidebar with buttons to select different CV sections */}
      <Sidebar onSelectSection={handleSection} />

      {/* InfoPanel overlay: shows content for the selected planet/section */}
      <InfoPanel
        activePlanet={active?.planet || null}
        activeTitle={active?.title || null}
        onClose={() => setActive(null)} // clear selection on close
      />

      {/* 3D Canvas: all R3F hooks/components must live inside this */}
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        {/* Global ambient light for base illumination */}
        <ambientLight intensity={0.1} />

        {/* Main solar system scene: planets, background, and interactions */}
        <SolarSystem
          selectedSection={active?.title || null}
          onSelectSection={handleSection}
        />

        {/* OrbitControls: enable mouse-driven orbit, pan, and zoom */}
        <OrbitControls makeDefault enableDamping dampingFactor={0.1} />

        {/* Real-time performance stats: FPS, frame time, memory usage */}
        <Stats showPanel={0} className="stats0" />
        <Stats showPanel={1} className="stats1" />
        <Stats showPanel={2} className="stats2" />
      </Canvas>
    </div>
  )
}