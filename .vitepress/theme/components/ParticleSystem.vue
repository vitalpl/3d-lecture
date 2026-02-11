<template>
  <div class="demo-container">
    <div ref="canvas" class="three-container"></div>
    <div class="controls">
      <div class="control-group">
        <label>Гравітація: {{ gravity.toFixed(2) }}</label>
        <input type="range" v-model.number="gravity" min="0" max="0.5" step="0.02">
      </div>
      <div class="control-group">
        <label>Кількість частинок: {{ particleCount }}</label>
        <input type="range" v-model.number="particleCount" min="10" max="500" step="10">
      </div>
      <div class="control-group">
        <label>Розмір частинок: {{ particleSize.toFixed(1) }}</label>
        <input type="range" v-model.number="particleSize" min="0.5" max="5" step="0.5">
      </div>
      <div class="control-group">
        <label>Колір частинок</label>
        <input type="color" v-model="particleColor">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)
const gravity = ref(0.05)
const particleCount = ref(100)
const particleSize = ref(2)
const particleColor = ref('#4a90e2')

let renderer = null
let animationId = null
let particles = []
let scene = null
let pointMesh = null

class Particle {
  constructor(x, y, z, size, color) {
    this.position = new THREE.Vector3(x, y, z)
    this.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2
    )
    this.size = size
    this.color = color
    this.alive = true
  }

  update(gravity) {
    this.velocity.y -= gravity
    this.position.add(this.velocity)

    // Bounce off walls
    if (this.position.x > 5 || this.position.x < -5) this.velocity.x *= -0.8
    if (this.position.z > 5 || this.position.z < -5) this.velocity.z *= -0.8
    if (this.position.y < -5) {
      this.position.y = -5
      this.velocity.y *= -0.8
    }
  }
}

const updateParticles = () => {
  if (scene && pointMesh) {
    scene.remove(pointMesh)
  }

  particles = []
  for (let i = 0; i < particleCount.value; i++) {
    particles.push(
      new Particle(
        (Math.random() - 0.5) * 8,
        5,
        (Math.random() - 0.5) * 8,
        particleSize.value,
        particleColor.value
      )
    )
  }

  const positions = new Float32Array(particles.length * 3)
  const colors = new Float32Array(particles.length * 3)
  const sizes = new Float32Array(particles.length)

  const color = new THREE.Color(particleColor.value)

  particles.forEach((p, i) => {
    positions[i * 3] = p.position.x
    positions[i * 3 + 1] = p.position.y
    positions[i * 3 + 2] = p.position.z

    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    sizes[i] = p.size
  })

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  const material = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  })

  pointMesh = new THREE.Points(geometry, material)
  scene.add(pointMesh)
}

onMounted(() => {
  if (!canvas.value) return

  // Scene setup
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5f7fa)

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.value.clientWidth / canvas.value.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 10

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  canvas.value.appendChild(renderer.domElement)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  // Create particles
  updateParticles()

  // Animation loop
  function animate() {
    animationId = requestAnimationFrame(animate)

    particles.forEach(p => {
      p.update(gravity.value)
    })

    if (pointMesh) {
      const positions = pointMesh.geometry.attributes.position.array
      particles.forEach((p, i) => {
        positions[i * 3] = p.position.x
        positions[i * 3 + 1] = p.position.y
        positions[i * 3 + 2] = p.position.z
      })
      pointMesh.geometry.attributes.position.needsUpdate = true
    }

    renderer.render(scene, camera)
  }

  animate()

  // Handle resize
  const handleResize = () => {
    const width = canvas.value?.clientWidth || 0
    const height = canvas.value?.clientHeight || 0
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (animationId) cancelAnimationFrame(animationId)
    if (renderer) {
      renderer.dispose()
      canvas.value?.removeChild(renderer.domElement)
    }
  })
})

// Watch for changes
import { watch } from 'vue'
watch([() => particleCount.value, () => particleSize.value, () => particleColor.value], () => {
  updateParticles()
})
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.three-container {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 102, 204, 0.2);
  background: #f5f7fa;
}

.controls {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
}

.control-group {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.control-group:last-child {
  margin-bottom: 0;
}

.control-group label {
  min-width: 150px;
  font-weight: 500;
  color: #333;
}

.control-group input[type="range"] {
  flex: 1;
  max-width: 200px;
}

.control-group input[type="color"] {
  width: 50px;
  height: 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
