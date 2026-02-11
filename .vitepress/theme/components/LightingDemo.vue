<template>
  <div class="demo-container">
    <div ref="canvas" class="three-container"></div>
    <div class="controls">
      <div class="control-group">
        <label>Амбієнтне світло: {{ ambientIntensity.toFixed(2) }}</label>
        <input type="range" v-model.number="ambientIntensity" min="0" max="1" step="0.1">
      </div>
      <div class="control-group">
        <label>Спрямоване світло: {{ directionalIntensity.toFixed(2) }}</label>
        <input type="range" v-model.number="directionalIntensity" min="0" max="2" step="0.1">
      </div>
      <div class="control-group">
        <label>Точкове світло: {{ pointIntensity.toFixed(2) }}</label>
        <input type="range" v-model.number="pointIntensity" min="0" max="2" step="0.1">
      </div>
      <div class="control-group">
        <label>Матеріал:</label>
        <select v-model="materialType">
          <option value="phong">Phong</option>
          <option value="standard">Standard</option>
          <option value="basic">Basic</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)
const ambientIntensity = ref(0.5)
const directionalIntensity = ref(0.8)
const pointIntensity = ref(1)
const materialType = ref('phong')

let renderer = null
let animationId = null
let mesh = null
let scene = null
let ambientLight = null
let directionalLight = null
let pointLight = null

const createMaterial = (type) => {
  const color = 0xe27b58
  switch (type) {
    case 'phong':
      return new THREE.MeshPhongMaterial({ 
        color,
        shininess: 100
      })
    case 'standard':
      return new THREE.MeshStandardMaterial({
        color,
        metalness: 0.5,
        roughness: 0.5
      })
    case 'basic':
      return new THREE.MeshBasicMaterial({ color })
    default:
      return new THREE.MeshPhongMaterial({ color })
  }
}

onMounted(() => {
  if (!canvas.value) return

  // Scene setup
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x1a1a1a)

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.value.clientWidth / canvas.value.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 3

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  canvas.value.appendChild(renderer.domElement)

  // Lighting
  ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity.value)
  scene.add(ambientLight)

  directionalLight = new THREE.DirectionalLight(0xffffff, directionalIntensity.value)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  pointLight = new THREE.PointLight(0xff0000, pointIntensity.value)
  pointLight.position.set(-3, 2, 3)
  scene.add(pointLight)

  // Create sphere
  const geometry = new THREE.SphereGeometry(1.5, 64, 64)
  const material = createMaterial(materialType.value)
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // Animation loop
  function animate() {
    animationId = requestAnimationFrame(animate)

    if (mesh) {
      mesh.rotation.x += 0.003
      mesh.rotation.y += 0.005
    }

    if (pointLight) {
      pointLight.position.x = Math.sin(Date.now() * 0.001) * 3
      pointLight.position.z = Math.cos(Date.now() * 0.0008) * 3
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
watch(() => ambientIntensity.value, (val) => {
  if (ambientLight) ambientLight.intensity = val
})

watch(() => directionalIntensity.value, (val) => {
  if (directionalLight) directionalLight.intensity = val
})

watch(() => pointIntensity.value, (val) => {
  if (pointLight) pointLight.intensity = val
})

watch(() => materialType.value, (val) => {
  if (mesh) {
    const newMaterial = createMaterial(val)
    mesh.material = newMaterial
  }
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
  background: #1a1a1a;
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

.control-group select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 1rem;
}
</style>
