import React, { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { PlanetInfo } from '../data/planets'

type Props = {
  info: PlanetInfo         // Data for this planet (size, texture, etc.)
  onClick?: () => void     // Optional click handler to select the planet
}

export default function Planet({ info, onClick }: Props) {
  const { name, size, texture, normalMap, color, hasRing } = info

  // Load the color (diffuse) texture if provided
  const colorMap = texture
    ? useLoader(THREE.TextureLoader, texture)
    : undefined

  // Load a bump map (height map) if provided
  const normal = normalMap
    ? useLoader(THREE.TextureLoader, normalMap)
    : undefined

  // Ref to the group node in case we need to manipulate it later
  const groupRef = useRef<THREE.Group>(null!)

  return (
    <group ref={groupRef}>
      {/* The spherical mesh for the planet surface */}
      <mesh onClick={onClick} castShadow receiveShadow>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          map={colorMap}             // Apply the color texture
          bumpMap={normal}           // Apply bump map for subtle surface detail
          bumpScale={1}              // Intensity of the bump effect
          color={texture ? undefined : color}  // Fallback flat color if no texture
          metalness={0}              // Non-metallic surface
          roughness={1}              // Matte finish
        />
      </mesh>

      {/* Optional planetary ring (e.g. for Saturn) */}
      {hasRing && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.1, size * 1.5, 64, 1]} />
          <meshStandardMaterial
            color="white"            // Ring color
            side={THREE.DoubleSide}  // Show both sides of the ring
            transparent
            opacity={0.6}            // Semi-transparent effect
          />
        </mesh>
      )}

      {/* 2D HTML label positioned just above the planet */}
      <Html position={[0, size + 0.15, 0]} center zIndexRange={[0, 0]}>
        <div className="label">{name}</div>
      </Html>
    </group>
  )
}
