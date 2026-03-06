<template>
  <div class="demo-container">
    <div ref="canvas" class="three-container"></div>
    <div class="controls">
      <div class="control-group">
        <label>Інтенсивність ліхтарика: {{ spotIntensity.toFixed(2) }}</label>
        <input type="range" v-model.number="spotIntensity" min="0" max="5" step="0.1">
      </div>
      <div class="control-group">
        <label>Кут конуса (Angle): {{ spotAngle.toFixed(2) }}</label>
        <input type="range" v-model.number="spotAngle" min="0.1" max="1.5" step="0.05">
      </div>
      <div class="control-group">
        <label>Розмиття країв (Penumbra): {{ spotPenumbra.toFixed(2) }}</label>
        <input type="range" v-model.number="spotPenumbra" min="0" max="1" step="0.1">
      </div>
      <div class="control-group">
        <label>Матеріал:</label>
        <select v-model="materialType">
          <option value="phong">Phong (блискучий)</option>
          <option value="standard">Standard (реалістичний)</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)
const spotIntensity = ref(2)
const spotAngle = ref(0.4)
const spotPenumbra = ref(0.3)
const materialType = ref('phong')

let renderer, scene, camera, mesh, spotLight, spotHelper, animationId

const createMaterial = (type) => {
  const color = 0x58a6ff
  return type === 'phong' 
    ? new THREE.MeshPhongMaterial({ color, shininess: 80 })
    : new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.2 })
}

onMounted(() => {
  if (!canvas.value) return

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0a0a) // Темніший фон для контрасту світла

  camera = new THREE.PerspectiveCamera(75, canvas.value.clientWidth / canvas.value.clientHeight, 0.1, 1000)
  camera.position.set(0, 2, 5)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight)
  renderer.shadowMap.enabled = true // Вмикаємо тіні для реалізму
  canvas.value.appendChild(renderer.domElement)

  // Додамо площину (підлогу), щоб бачити куди падає світло
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  )
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -1.5
  floor.receiveShadow = true
  scene.add(floor)

  // Основний об'єкт
  mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), createMaterial(materialType.value))
  mesh.castShadow = true
  scene.add(mesh)

  // --- SPOTLIGHT (ЛІХТАРИК) ---
  spotLight = new THREE.SpotLight(0xffffff, spotIntensity.value)
  spotLight.position.set(0, 5, 0)
  spotLight.angle = spotAngle.value
  spotLight.penumbra = spotPenumbra.value
  spotLight.castShadow = true
  
  // Ціль ліхтарика (куди він світить)
  spotLight.target = mesh 
  scene.add(spotLight)

  // Помічник (лінії конуса)
  spotHelper = new THREE.SpotLightHelper(spotLight)
  scene.add(spotHelper)

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    
    // Рух ліхтарика по колу
    const time = Date.now() * 0.001
    spotLight.position.x = Math.sin(time) * 4
    spotLight.position.z = Math.cos(time) * 4
    
    spotHelper.update()
    renderer.render(scene, camera)
  }
  animate()
})

// Спостерігачі за змінами
watch(spotIntensity, (val) => spotLight.intensity = val)
watch(spotAngle, (val) => spotLight.angle = val)
watch(spotPenumbra, (val) => spotLight.penumbra = val)
watch(materialType, (val) => mesh.material = createMaterial(val))

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  renderer?.dispose()
})
</script>

<style scoped>
/* Стилі залишаємо ті самі, що й у вашому прикладі */
.demo-container { display: flex; flex-direction: column; gap: 1.5rem; }
.three-container { width: 100%; height: 400px; border-radius: 8px; background: #000; }
.controls { background: #f4f4f4; padding: 1.5rem; border-radius: 8px; color: #333; }
.control-group { margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem; }
.control-group label { min-width: 220px; font-family: sans-serif; }
input[type="range"] { flex: 1; }
</style>