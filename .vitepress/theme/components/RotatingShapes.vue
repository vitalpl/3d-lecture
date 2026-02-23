<template>
  <div class="demo-container">
    <div ref="canvas" class="three-container"></div>
    <div class="controls">
      <div class="control-group">
        <label>Швидкість обертання: {{ rotationSpeed.toFixed(2) }}</label>
        <input type="range" v-model.number="rotationSpeed" min="0" max="0.1" step="0.01">
      </div>
      <div class="control-group">
        <label>Колір форми</label>
        <input type="color" v-model="shapeColor">
      </div>
      <div class="control-group">
        <label>Форма:</label>
        <select v-model="shapeType">
          <option value="cube">Куб</option>
          <option value="sphere">Сфера</option>
          <option value="pyramid">Піраміда</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)
const rotationSpeed = ref(0.02)
const shapeColor = ref('#0066cc')
const shapeType = ref('cube')

let renderer = null
let animationId = null
let mesh = null
let scene = null

const createShape = (type, color) => {
  if (mesh && scene) scene.remove(mesh)
  
  let geometry
  if (type === 'cube') {
    geometry = new THREE.BoxGeometry(2, 2, 2)
  } else if (type === 'sphere') {
    geometry = new THREE.SphereGeometry(1.5, 32, 32)
  } else if (type === 'pyramid') {
    geometry = new THREE.ConeGeometry(1.5, 3, 4)
  }
  
  const material = new THREE.MeshPhongMaterial({ 
    color: new THREE.Color(color),
    shininess: 100
  })
  mesh = new THREE.Mesh(geometry, material)
  if (scene) scene.add(mesh)
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
  camera.position.z = 3

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  canvas.value.appendChild(renderer.domElement)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  // Create initial shape
  createShape(shapeType.value, shapeColor.value)

  // Animation loop
  function animate() {
    animationId = requestAnimationFrame(animate)

    if (mesh) {
      mesh.rotation.x += rotationSpeed.value
      mesh.rotation.y += rotationSpeed.value
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
watch(() => shapeColor.value, () => {
  if (mesh) mesh.material.color.set(shapeColor.value)
})

watch(() => shapeType.value, () => {
  createShape(shapeType.value, shapeColor.value)
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

.control-group select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 1rem;
}
</style>
