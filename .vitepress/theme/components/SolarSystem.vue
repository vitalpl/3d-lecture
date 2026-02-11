<template>
  <div ref="container" class="solar-system-container"></div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let renderer = null
let animationId = null

onMounted(() => {
  if (!container.value) return

  // Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000814)

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    10000
  )
  camera.position.z = 80

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.value.appendChild(renderer.domElement)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)

  // Sun
  const sunGeometry = new THREE.SphereGeometry(8, 32, 32)
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfdb813 })
  const sun = new THREE.Mesh(sunGeometry, sunMaterial)
  scene.add(sun)

  // Planets data
  const planets = [
    { name: 'Mercury', size: 2, distance: 15, speed: 0.04, color: 0x8c7853 },
    { name: 'Venus', size: 3.8, distance: 25, speed: 0.015, color: 0xffc649 },
    { name: 'Earth', size: 4, distance: 35, speed: 0.01, color: 0x4a90e2 },
    { name: 'Mars', size: 3, distance: 45, speed: 0.008, color: 0xe27b58 },
    { name: 'Jupiter', size: 11, distance: 60, speed: 0.002, color: 0xc88b3a },
    { name: 'Saturn', size: 9, distance: 75, speed: 0.0009, color: 0xfad5a5 }
  ]

  const orbitObjects = []

  planets.forEach((planet) => {
    // Planet
    const geometry = new THREE.SphereGeometry(planet.size, 32, 32)
    const material = new THREE.MeshPhongMaterial({ color: planet.color })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    orbitObjects.push({
      mesh,
      distance: planet.distance,
      speed: planet.speed,
      angle: 0
    })

    // Orbit line
    const orbitGeometry = new THREE.BufferGeometry()
    const orbitPoints = []
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2
      orbitPoints.push(
        Math.cos(angle) * planet.distance,
        0,
        Math.sin(angle) * planet.distance
      )
    }
    orbitGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(orbitPoints), 3)
    )
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2
    })
    const orbit = new THREE.Line(orbitGeometry, orbitMaterial)
    scene.add(orbit)
  })

  // Add point light for better lighting
  const pointLight = new THREE.PointLight(0xffffff, 0.8)
  pointLight.position.set(0, 0, 0)
  scene.add(pointLight)

  // Animation loop
  function animate() {
    animationId = requestAnimationFrame(animate)

    // Rotate planets
    orbitObjects.forEach((obj) => {
      obj.angle += obj.speed
      obj.mesh.position.x = Math.cos(obj.angle) * obj.distance
      obj.mesh.position.z = Math.sin(obj.angle) * obj.distance
      obj.mesh.rotation.y += 0.01
    })

    // Rotate sun
    sun.rotation.y += 0.005

    renderer.render(scene, camera)
  }

  animate()

  // Handle window resize
  const handleResize = () => {
    const width = container.value?.clientWidth || 0
    const height = container.value?.clientHeight || 0
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    if (renderer) {
      renderer.dispose()
      container.value?.removeChild(renderer.domElement)
    }
  })
})
</script>

<style scoped>
.solar-system-container {
  width: 100%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 102, 204, 0.2);
  margin: 20px 0;
  background: #000814;
}
</style>
