<template>
  <div class="blender-model-wrapper">
    <div ref="container" class="blender-model-container">
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Завантаження моделі…</p>
      </div>
      <div v-if="error" class="error-overlay">
        <p>{{ error }}</p>
      </div>
    </div>
    <div class="controls-hint" v-if="!loading && !error">
      <span>🖱️ ЛКМ — обертання</span>
      <span>🖱️ ПКМ — переміщення</span>
      <span>🖱️ Колесо — масштаб</span>
    </div>
    <div class="upload-area" v-if="!modelUrl">
      <label class="upload-label">
        <input
          type="file"
          accept=".glb,.gltf"
          @change="onFileSelected"
          class="file-input"
        />
        <span class="upload-icon">📂</span>
        <span>Перетягніть або оберіть файл .glb / .gltf</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const props = defineProps({
  /** URL or path to a .glb / .gltf file (optional – user can also upload) */
  src: { type: String, default: '' },
  /** Container height in CSS units */
  height: { type: String, default: '600px' },
  /** Background colour */
  bg: { type: String, default: '#1a1a2e' },
  /** Whether to auto-rotate */
  autoRotate: { type: Boolean, default: true }
})

const container = ref(null)
const loading = ref(false)
const error = ref('')
const modelUrl = ref(props.src)

let renderer = null
let scene = null
let camera = null
let controls = null
let animationId = null
let mixer = null
let clock = null
let currentModel = null

/* ─── helpers ─── */

function fitCameraToModel(object) {
  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())

  const maxDim = Math.max(size.x, size.y, size.z)
  const fov = camera.fov * (Math.PI / 180)
  let cameraDistance = maxDim / (2 * Math.tan(fov / 2))
  cameraDistance *= 1.6 // трохи відступу

  camera.position.set(center.x, center.y + maxDim * 0.4, center.z + cameraDistance)
  camera.lookAt(center)

  controls.target.copy(center)
  controls.update()

  camera.near = cameraDistance / 100
  camera.far = cameraDistance * 100
  camera.updateProjectionMatrix()
}

function loadModel(url) {
  loading.value = true
  error.value = ''

  const loader = new GLTFLoader()

  loader.load(
    url,
    (gltf) => {
      // Remove previous model
      if (currentModel) {
        scene.remove(currentModel)
        currentModel.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose()
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose())
            } else {
              child.material.dispose()
            }
          }
        })
      }

      const model = gltf.scene
      // Blender exports Z-up, Three.js uses Y-up → rotate -90° on X
      model.rotation.x = -Math.PI / 2
      scene.add(model)
      currentModel = model

      // Handle animations if present
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model)
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play()
        })
      }

      fitCameraToModel(model)
      loading.value = false
    },
    (progress) => {
      // progress callback (optional)
    },
    (err) => {
      console.error('Error loading model:', err)
      error.value = 'Не вдалося завантажити модель. Переконайтесь, що файл у форматі glTF / GLB.'
      loading.value = false
    }
  )
}

function onFileSelected(event) {
  const file = event.target.files[0]
  if (!file) return

  const url = URL.createObjectURL(file)
  modelUrl.value = url
  loadModel(url)
}

/* ─── lifecycle ─── */

onMounted(() => {
  if (!container.value) return

  clock = new THREE.Clock()

  // Scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(props.bg)

  // Camera
  camera = new THREE.PerspectiveCamera(
    50,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    10000
  )
  camera.position.set(0, 2, 5)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  container.value.appendChild(renderer.domElement)

  // OrbitControls — інтерактивне обертання камери
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.autoRotate = props.autoRotate
  controls.autoRotateSpeed = 2.0
  controls.minDistance = 0.5
  controls.maxDistance = 500
  // Дозволити повне обертання на 360° по вертикалі
  controls.minPolarAngle = 0
  controls.maxPolarAngle = Math.PI

  // Lighting — студійне освітлення
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
  dirLight.position.set(5, 10, 7)
  dirLight.castShadow = true
  scene.add(dirLight)

  const fillLight = new THREE.DirectionalLight(0x8888ff, 0.4)
  fillLight.position.set(-5, 3, -5)
  scene.add(fillLight)

  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6)
  scene.add(hemisphereLight)

  // Grid helper (subtle)
  const grid = new THREE.GridHelper(20, 20, 0x444444, 0x222222)
  grid.material.opacity = 0.3
  grid.material.transparent = true
  scene.add(grid)

  // Animation loop
  function animate() {
    animationId = requestAnimationFrame(animate)

    const delta = clock.getDelta()
    if (mixer) mixer.update(delta)

    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  // Resize
  const handleResize = () => {
    const width = container.value?.clientWidth || 0
    const height = container.value?.clientHeight || 0
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }
  window.addEventListener('resize', handleResize)

  // Load model if src prop provided
  if (props.src) {
    loadModel(props.src)
  }

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (animationId) cancelAnimationFrame(animationId)
    if (renderer) {
      renderer.dispose()
      container.value?.removeChild(renderer.domElement)
    }
  })
})

watch(
  () => props.src,
  (newSrc) => {
    if (newSrc && scene) {
      modelUrl.value = newSrc
      loadModel(newSrc)
    }
  }
)
</script>

<style scoped>
.blender-model-wrapper {
  margin: 20px 0;
}

.blender-model-container {
  position: relative;
  width: 100%;
  height: v-bind(height);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 102, 204, 0.15);
  background: v-bind(bg);
}

.controls-hint {
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 8px;
  font-size: 0.85em;
  color: #888;
}

.upload-area {
  margin-top: 12px;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px;
  border: 2px dashed #555;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  text-align: center;
  color: #aaa;
}

.upload-label:hover {
  border-color: #4a90e2;
  background: rgba(74, 144, 226, 0.05);
}

.upload-icon {
  font-size: 2em;
}

.file-input {
  display: none;
}

/* Loading */
.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  z-index: 10;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: #4a90e2;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error */
.error-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(180, 40, 40, 0.15);
  color: #ff6b6b;
  font-weight: 600;
  padding: 20px;
  text-align: center;
  z-index: 10;
}
</style>
