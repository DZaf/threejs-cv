import React, { useRef, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { Stars } from '@react-three/drei'
import Planet from './Planet'
import planets from '../data/planets'

type Props = {
  selectedSection: string | null           // Currently highlighted section title
  onSelectSection: (planet: string, title: string) => void  // Callback when a planet/section is selected
}

export default function SolarSystem({
  selectedSection,
  onSelectSection,
}: Props) {
  // Reference to the root group containing stars, sun, and planets
  const groupRef = useRef<THREE.Group>(null!)

  // Load the stars background texture
  const starsTex = useLoader(THREE.TextureLoader, '/textures/stars.jpg')

  // Configure the stars texture to repeat and improve sampling to avoid pixelation
  useEffect(() => {
    starsTex.wrapS = THREE.RepeatWrapping
    starsTex.wrapT = THREE.RepeatWrapping
    starsTex.repeat.set(4, 4)                          // Tile the texture 4x4 times
    starsTex.magFilter = THREE.LinearFilter             // Smooth magnification
    starsTex.minFilter = THREE.LinearMipmapLinearFilter // Smooth minification
    starsTex.needsUpdate = true                         // Update material on change
  }, [starsTex])

  // Animation loop: handle planet orbits and rotations
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    // For each planet, find its wrapper group by name and update position & rotation
    planets.forEach((p) => {
      const wrapper = groupRef.current.getObjectByName(p.name) as THREE.Group | undefined
      if (!wrapper) return

      // Orbit motion using cosine and sine for circular path
      wrapper.position.x = Math.cos(t * p.speed) * p.distance
      wrapper.position.z = Math.sin(t * p.speed) * p.distance

      // Rotate the planet mesh inside the wrapper group
      const mesh = wrapper.children.find((c) => c.type === 'Mesh') as THREE.Mesh | undefined
      if (mesh) mesh.rotation.y += 0.005
    })
  })

  return (
    <group ref={groupRef}>
      {/* Large skysphere for tiled stars background */}
      <mesh>
        <sphereGeometry args={[100, 64, 64]} />
        <meshBasicMaterial
          map={starsTex}       // Stars texture
          side={THREE.BackSide} // Render inside of the sphere
          toneMapped={false}    // Disable exposure tonemapping
        />
      </mesh>

      {/* Drei's procedural stars for twinkling effect */}
      <Stars radius={90} depth={50} count={3000} factor={4} fade />

      {/* Sun at the center as a glowing yellow sphere */}
      <pointLight intensity={2} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="yellow" />
      </mesh>

      {/* Render each planet with click interaction and optional highlighting */}
      {planets.map((p) => (
        <group
          key={p.name}
          name={p.name}                              // Assign group name for lookup
          scale={p.name === selectedSection ? 1.2 : 1} // Enlarge selected section
          onClick={() => onSelectSection(p.name, p.name)} // Notify parent on click
        >
          <Planet info={p} />                       // Render the planet component
        </group>
      ))}
    </group>
  )
}
