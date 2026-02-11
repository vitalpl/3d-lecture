# API Приклади

Приклади роботи з JavaScript API та Three.js для 3D графіки.

## Основні API об'єкти

### Three.js Scene

```javascript
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)
```

### Camera

```javascript
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
)
camera.position.z = 100
```

### Renderer

```javascript
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
```

## Геометрія та матеріали

```javascript
// Сфера
const geometry = new THREE.SphereGeometry(5, 32, 32)
const material = new THREE.MeshPhongMaterial({ color: 0x0066cc })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
```

## Анімація

```javascript
function animate() {
  requestAnimationFrame(animate)
  
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  
  renderer.render(scene, camera)
}

animate()
```

Детальніше можна дізнатися в [лекції про рух по колу](/solar-system).
