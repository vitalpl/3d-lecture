<template>
  <div ref="container" class="rotating-shapes-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let renderer = null
let animationId = null

onMounted(() => {
  if (!container.value) return

  // Сцена
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x101010)

  // Камера
  const camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 20

  // Рендерер
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.value.appendChild(renderer.domElement)

  // Освітлення
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)
  const pointLight = new THREE.PointLight(0xffffff, 0.8)
  pointLight.position.set(10, 10, 10)
  scene.add(pointLight)

  // Форми
  const objects = []

  // Куб
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 50 })
  )
  box.position.x = -6
  scene.add(box)
  objects.push({ mesh: box, speed: 0.01 })

  // Сфера
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 100 })
  )
  sphere.position.x = 0
  scene.add(sphere)
  objects.push({ mesh: sphere, speed: 0.008 })

  // Піраміда
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(2, 4, 32),
    new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 80 })
  )
  cone.position.x = 6
  scene.add(cone)
  objects.push({ mesh: cone, speed: 0.012 })

  // Анімація
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    objects.forEach(obj => {
      obj.mesh.rotation.x += obj.speed
      obj.mesh.rotation.y += obj.speed
    })
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

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (animationId) cancelAnimationFrame(animationId)
    if (renderer) {
      renderer.dispose()
      container.value?.removeChild(renderer.domElement)
    }
  })
})
</script>

<style scoped>
.rotating-shapes-container {
  width: 100%;
  height: 500px;
  border-radius: 8px;
  background: #101010;
  margin: 20px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>