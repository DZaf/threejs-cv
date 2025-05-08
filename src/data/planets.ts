export interface PlanetInfo {
  name: string
  size: number
  distance: number
  speed: number
  texture?: string          // color (diffuse) map
  normalMap?: string        // optional bump/normal-map
  hasRing?: boolean
  color?: string            // fallback flat color
}

const scaleUp = 1.5

const planets: PlanetInfo[] = [
  {
    name: 'Contact',
    size: 0.2 * scaleUp,
    distance: 2,
    speed: 0.8,
    color: 'grey'
  },
  {
    name: 'Skills',
    size: 0.3 * scaleUp,
    distance: 2.8,
    speed: 0.6,
    texture: '/textures/venus.jpg',
    normalMap: '/textures/venus_surface.jpg'
  },
  {
    name: 'Language',
    size: 0.35 * scaleUp,
    distance: 3.6,
    speed: 0.5,
    // if you have earth maps, drop them in textures/earth.jpg & earth_normal.jpg
    texture: '/textures/earth.jpg',
    normalMap: '/textures/earth.jpg'
  },
  {
    name: 'Education',
    size: 0.25 * scaleUp,
    distance: 4.4,
    speed: 0.4,
    texture: '/textures/mars.jpg'
  },
  {
    name: 'Experience',
    size: 0.7 * scaleUp,
    distance: 5.5,
    speed: 0.3,
    texture: '/textures/jupiter.jpg'
  },
  {
    name: 'Certifications',
    size: 0.6 * scaleUp,
    distance: 7,
    speed: 0.2,
    color: 'lightyellow',
    hasRing: true
  },
  {
    name: 'Soft Skills',
    size: 0.55 * scaleUp,
    distance: 8.5,
    speed: 0.15,
    texture: '/textures/neptune.jpg'
  }
]

export default planets
