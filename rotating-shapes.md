---
layout: page
title: Обертаючі форми
description: Вивчаємо обертання об'єктів у 3D просторі
---

# Обертаючі форми і геометрія

<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'

// Універсальна функція для створення маленьких демонстрацій
const createScene = (containerId, geometryType) => {
  const container = document.getElementById(containerId)
  if (!container) return

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / 200, 0.1, 1000)
  camera.position.z = 3

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.clientWidth, 200)
  container.appendChild(renderer.domElement)

  // Світло (потрібне для MeshPhongMaterial)
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(1, 1, 2)
  scene.add(light)
  scene.add(new THREE.AmbientLight(0x404040))

  // Створення геометрії на основі типу
  let geometry
  if (geometryType === 'box') geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
  if (geometryType === 'sphere') geometry = new THREE.SphereGeometry(1, 32, 32)
  if (geometryType === 'cone') geometry = new THREE.ConeGeometry(1, 2, 32)

  const material = new THREE.MeshPhongMaterial({ color: 0x0066cc, shininess: 100 })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const animate = () => {
    requestAnimationFrame(animate)
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  animate()
}

onMounted(() => {
  createScene('cube-demo', 'box')
  createScene('sphere-demo', 'sphere')
  createScene('cone-demo', 'cone')
})
</script>

## Вступ

На цій сторінці ви дізнаєтеся про обертання об'єктів у тривимірному просторі та властивості **Euler кутів** у Three.js.

## Поняття обертання


Обертання в 3D просторі описується трьома кутами:
- **Rotation X** - обертання навколо осі X
- **Rotation Y** - обертання навколо осі Y  
- **Rotation Z** - обертання навколо осі Z

Ці кути вимірюються в **радіанах** ($0$ до $2\pi$).

## Математика обертання

Матриця обертання описує як змінюються координати точки при обертанні. Для обертання навколо осі Y на кут $\theta$:

$$R_y(\theta) = \begin{pmatrix}
\cos(\theta) & 0 & \sin(\theta) \\
0 & 1 & 0 \\
-\sin(\theta) & 0 & \cos(\theta)
\end{pmatrix}$$

## Класичні геометрії Three.js

### Куб (BoxGeometry)
<div id="cube-demo" style="width: 100%; height: 200px; background: #1a1a1a; margin-bottom: 10px; border-radius: 8px;"></div>

```javascript
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)