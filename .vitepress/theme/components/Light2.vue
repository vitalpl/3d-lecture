<template>
  <div class="demo-container">
    <div ref="canvas" class="three-container"></div>
    <div class="controls">
      <div class="control-group">
        <label>Інтенсивність: {{ intensity.toFixed(1) }}</label>
        <input type="range" v-model.number="intensity" min="0" max="5" step="0.1">
      </div>
      <div class="control-group">
        <label>Кут конуса: {{ (angle * 180 / Math.PI).toFixed(0) }}°</label>
        <input type="range" v-model.number="angle" min="0.1" max="1.57" step="0.01">
      </div>
      <div class="control-group">
        <label>Розмиття краю: {{ penumbra.toFixed(2) }}</label>
        <input type="range" v-model.number="penumbra" min="0" max="1" step="0.05">
      </div>
      <div class="control-group">
        <label>Відстань: {{ distance.toFixed(0) }}</label>
        <input type="range" v-model.number="distance" min="5" max="50" step="1">
      </div>
      <div class="control-group">
        <label>Колір:</label>
        <input type="color" v-model="spotColor" class="color-input">
      </div>
      <div class="control-group">
        <label>Амбієнт: {{ ambientIntensity.toFixed(2) }}</label>
        <input type="range" v-model.number="ambientIntensity" min="0" max="0.5" step="0.02">
      </div>
      <div class="control-group toggle-group">
        <label>Анімація руху:</label>
        <button class="toggle-btn" :class="{ active: animateSpot }" @click="animateSpot = !animateSpot">
          {{ animateSpot ? 'Увімк.' : 'Вимк.' }}
        </button>
      </div>
      <div class="control-group toggle-group">
        <label>Тіні:</label>
        <button class="toggle-btn" :class="{ active: shadowsEnabled }" @click="toggleShadows">
          {{ shadowsEnabled ? 'Увімк.' : 'Вимк.' }}
        </button>
      </div>
      <div class="control-group toggle-group">
        <label>Помічник конуса:</label>
        <button class="toggle-btn" :class="{ active: showHelper }" @click="toggleHelper">
          {{ showHelper ? 'Увімк.' : 'Вимк.' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = ref(null)

/* ─── Reactive controls ─── */
const intensity = ref(2)
const angle = ref(Math.PI / 6)       // ~30°
const penumbra = ref(0.3)
const distance = ref(20)
const spotColor = ref('#ffffff')
const ambientIntensity = ref(0.08)
const animateSpot = ref(true)
const shadowsEnabled = ref(true)
const showHelper = ref(true)

let renderer = null
let animationId = null
let scene = null
let camera = null
let controls = null
let spotLight = null
let spotHelper = null
let ambientLight = null
let floor = null
let targetObj = null

/* ─── Build the scene ─── */
onMounted(() => {
  if (!canvas.value) return

  // Scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x111519)
  scene.fog = new THREE.FogExp2(0x111519, 0.035)

  // Camera
  camera = new THREE.PerspectiveCamera(
    55,
    canvas.value.clientWidth / canvas.value.clientHeight,
    0.1,
    200
  )
  camera.position.set(6, 8, 10)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  canvas.value.appendChild(renderer.domElement)

  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.target.set(0, 0, 0)

  // ─── Floor ───
  const floorGeo = new THREE.PlaneGeometry(30, 30)
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x222830,
    roughness: 0.85,
    metalness: 0.1
  })
  floor = new THREE.Mesh(floorGeo, floorMat)
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)

  // ─── Objects to illuminate ───
  // Central sphere
  const sphereGeo = new THREE.SphereGeometry(1, 64, 64)
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xe27b58,
    roughness: 0.4,
    metalness: 0.3
  })
  const sphere = new THREE.Mesh(sphereGeo, sphereMat)
  sphere.position.set(0, 1, 0)
  sphere.castShadow = true
  sphere.receiveShadow = true
  scene.add(sphere)

  // Cube
  const cubeGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2)
  const cubeMat = new THREE.MeshStandardMaterial({
    color: 0x3ecf8e,
    roughness: 0.35,
    metalness: 0.2
  })
  const cube = new THREE.Mesh(cubeGeo, cubeMat)
  cube.position.set(-2.5, 0.6, 1.5)
  cube.castShadow = true
  cube.receiveShadow = true
  scene.add(cube)

  // Torus
  const torusGeo = new THREE.TorusGeometry(0.7, 0.25, 32, 64)
  const torusMat = new THREE.MeshStandardMaterial({
    color: 0x6ea8fe,
    roughness: 0.3,
    metalness: 0.5
  })
  const torus = new THREE.Mesh(torusGeo, torusMat)
  torus.position.set(2.5, 0.8, -1)
  torus.rotation.x = Math.PI / 3
  torus.castShadow = true
  torus.receiveShadow = true
  scene.add(torus)

  // ─── SpotLight (ліхтарик) ───
  spotLight = new THREE.SpotLight(
    new THREE.Color(spotColor.value),
    intensity.value,
    distance.value,
    angle.value,
    penumbra.value,
    1 // decay
  )
  spotLight.position.set(0, 9, 0)
  spotLight.castShadow = true
  spotLight.shadow.mapSize.set(1024, 1024)
  spotLight.shadow.camera.near = 0.5
  spotLight.shadow.camera.far = 50

  // Target
  targetObj = new THREE.Object3D()
  targetObj.position.set(0, 0, 0)
  scene.add(targetObj)
  spotLight.target = targetObj

  scene.add(spotLight)

  // Helper
  spotHelper = new THREE.SpotLightHelper(spotLight)
  scene.add(spotHelper)

  // Ambient (very dim)
  ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity.value)
  scene.add(ambientLight)

  // ─── Animation loop ───
  const clock = new THREE.Clock()
  function animate() {
    animationId = requestAnimationFrame(animate)
    const t = clock.getElapsedTime()

    // Move spotlight in a circle if animation is on
    if (animateSpot.value) {
      spotLight.position.x = Math.sin(t * 0.5) * 5
      spotLight.position.z = Math.cos(t * 0.5) * 5
    }

    // Slowly rotate objects
    cube.rotation.y += 0.008
    torus.rotation.y += 0.01

    if (spotHelper && spotHelper.visible) spotHelper.update()
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  // ─── Resize ───
  const handleResize = () => {
    const w = canvas.value?.clientWidth || 0
    const h = canvas.value?.clientHeight || 0
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
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

/* ─── Watchers ─── */
watch(intensity, (v) => { if (spotLight) spotLight.intensity = v })
watch(angle, (v) => { if (spotLight) spotLight.angle = v })
watch(penumbra, (v) => { if (spotLight) spotLight.penumbra = v })
watch(distance, (v) => { if (spotLight) spotLight.distance = v })
watch(ambientIntensity, (v) => { if (ambientLight) ambientLight.intensity = v })

watch(spotColor, (v) => {
  if (spotLight) spotLight.color.set(v)
})

function toggleShadows() {
  shadowsEnabled.value = !shadowsEnabled.value
  if (renderer) renderer.shadowMap.enabled = shadowsEnabled.value
  if (spotLight) spotLight.castShadow = shadowsEnabled.value
  // Force shadow map re-render
  scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.material.needsUpdate = true
    }
  })
}

function toggleHelper() {
  showHelper.value = !showHelper.value
  if (spotHelper) spotHelper.visible = showHelper.value
}
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.three-container {
  width: 100%;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(62, 207, 142, 0.18);
  background: #111519;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 0.75rem 1.5rem;
  background: var(--color-section-gray, #f0f5f3);
  padding: 1.25rem 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--color-border, #dce8e3);
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.control-group label {
  min-width: 140px;
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--color-text, #2c3e40);
  white-space: nowrap;
}

.control-group input[type="range"] {
  flex: 1;
  max-width: 180px;
  accent-color: var(--color-mint, #3ecf8e);
}

.color-input {
  width: 40px;
  height: 32px;
  border: 2px solid var(--color-border, #dce8e3);
  border-radius: 6px;
  cursor: pointer;
  padding: 2px;
  background: #fff;
}

.toggle-group {
  gap: 0.5rem;
}

.toggle-btn {
  padding: 0.35rem 1rem;
  border: 2px solid var(--color-border, #dce8e3);
  border-radius: 6px;
  background: #fff;
  color: var(--color-text-secondary, #5a6b6e);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background: var(--color-mint, #3ecf8e);
  border-color: var(--color-mint-dark, #2ab877);
  color: #fff;
}

.toggle-btn:hover {
  border-color: var(--color-mint, #3ecf8e);
}
</style>
