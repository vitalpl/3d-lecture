---
layout: page
title: Завантаження 3D-моделей з Blender
description: Як експортувати модель з Blender та переглянути її у браузері з інтерактивним керуванням камерою
---

# Завантаження 3D-моделей з Blender

## Вступ

У цьому розділі ви навчитесь завантажувати 3D-моделі, створені в **Blender**, прямо у вебсторінку та взаємодіяти з ними: обертати камеру, масштабувати та переміщувати.

Для відображення моделей у браузері ми використовуємо формат **glTF / GLB** — відкритий стандарт передачі 3D-сцен, який підтримується Three.js та більшістю 3D-рушіїв.

---

## Інтерактивний переглядач

Завантажте свою модель у форматі `.glb` або `.gltf`, натиснувши кнопку нижче, або перетягніть файл у зону завантаження:

<BlenderModel height="600px" auto-rotate />

---

## Інструкція з експорту моделі з Blender

### Крок 1 — Підготовка сцени

1. Відкрийте вашу модель у **Blender**.
2. Переконайтесь, що всі об'єкти мають **застосовані трансформації**:
   - Виділіть усі об'єкти (`A`)
   - Натисніть `Ctrl + A` → **All Transforms**
3. Перевірте, що матеріали використовують **Principled BSDF** шейдер — він найкраще конвертується у glTF.

### Крок 2 — Налаштування матеріалів

Формат glTF підтримує такі карти з Principled BSDF:

| Параметр Blender         | Що експортується          |
| ------------------------ | ------------------------- |
| Base Color               | Колір / текстура альбедо  |
| Metallic                 | Карта металічності        |
| Roughness                | Карта шорсткості          |
| Normal Map               | Карта нормалей            |
| Emission                 | Емісійне світло           |
| Alpha                    | Прозорість                |

> 💡 **Порада:** Уникайте складних нодових дерев — використовуйте тільки ті ноди, що безпосередньо підключені до Principled BSDF.

### Крок 3 — Експорт у glTF / GLB

1. Перейдіть у меню **File → Export → glTF 2.0 (.glb / .gltf)**
2. У панелі налаштувань експорту задайте:

```
Формат:              glTF Binary (.glb)    ← рекомендовано
Текстури:            Include (вбудовані)
Анімації:            ✅ (якщо потрібно)
Apply Modifiers:     ✅
UV:                  ✅
Normals:             ✅
Vertex Colors:       якщо використовуєте
```

3. Натисніть **Export glTF 2.0**.

### Рекомендовані параметри

| Параметр               | Значення           | Пояснення                                        |
| ---------------------- | ------------------ | ------------------------------------------------ |
| **Format**             | glTF Binary (.glb) | Один файл, легше завантажувати                    |
| **Include**            | Selected Objects   | Експортувати лише вибрані об'єкти                 |
| **Transform → +Y Up** | ✅                  | Three.js використовує Y-вгору                    |
| **Geometry → Apply Modifiers** | ✅          | Застосувати модифікатори перед експортом           |
| **Geometry → UVs**     | ✅                  | Необхідно для текстур                            |
| **Geometry → Normals** | ✅                  | Для коректного освітлення                        |
| **Animation**          | за потреби         | Увімкніть якщо модель має анімацію               |
| **Compression**        | Draco (опція)      | Зменшує розмір файлу, потребує додатковий декодер |

---

## Як це працює — код компонента

Компонент `BlenderModel` побудований на основі **Three.js** і використовує:

### Завантаження моделі — GLTFLoader

<div v-pre>

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const loader = new GLTFLoader()
loader.load(url, (gltf) => {
  const model = gltf.scene
  scene.add(model)

  // Якщо є анімації — запускаємо їх
  if (gltf.animations.length > 0) {
    const mixer = new THREE.AnimationMixer(model)
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play()
    })
  }
})
```

</div>

### Інтерактивне керування камерою — OrbitControls

<div v-pre>

```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true       // плавне гальмування
controls.dampingFactor = 0.08
controls.autoRotate = true          // автообертання
controls.autoRotateSpeed = 2.0
```

</div>

**Управління мишкою:**

| Дія                  | Ефект                  |
| -------------------- | ---------------------- |
| Ліва кнопка + рух    | Обертання навколо моделі |
| Права кнопка + рух   | Переміщення (панорама)  |
| Колесо прокрутки     | Наближення / віддалення |
| Середня кнопка + рух | Переміщення (панорама)  |

### Автоматичне кадрування моделі

Після завантаження модель автоматично центрується та камера підлаштовується під її розмір:

```javascript
function fitCameraToModel(object) {
  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())

  const maxDim = Math.max(size.x, size.y, size.z)
  const fov = camera.fov * (Math.PI / 180)
  let cameraDistance = maxDim / (2 * Math.tan(fov / 2))

  camera.position.set(
    center.x,
    center.y + maxDim * 0.4,
    center.z + cameraDistance * 1.6
  )
  controls.target.copy(center)
  controls.update()
}
```

### Студійне освітлення

Для реалістичного відображення моделі використовуємо кілька джерел світла:

```javascript
// Загальне розсіяне світло
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

// Основне спрямоване світло (з тінями)
const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
dirLight.position.set(5, 10, 7)
dirLight.castShadow = true

// Контрове підсвічування
const fillLight = new THREE.DirectionalLight(0x8888ff, 0.4)
fillLight.position.set(-5, 3, -5)

// Небесне освітлення
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6)
```

---

## Використання компонента з фіксованим URL

Якщо ви хочете вбудувати модель, яка завантажується автоматично з файлу у `public/`:

```md
<BlenderModel src="/models/my-model.glb" height="500px" />
```

Для цього покладіть файл `.glb` у папку `public/models/` вашого VitePress-проєкту.

---

## Поширені проблеми

### Модель не відображається
- Переконайтесь, що файл має розширення `.glb` або `.gltf`
- Перевірте, чи застосовані всі модифікатори в Blender перед експортом
- Перевірте консоль браузера (F12) на помилки

### Модель занадто темна
- Переконайтесь, що матеріали використовують **Principled BSDF**
- Перевірте, чи текстури вбудовані у файл (опція «Include» при експорті)

### Текстури відсутні
- При експорті у `.glb` текстури мають бути **вбудованими** (embedded)
- При експорті у `.gltf` переконайтесь, що папка з текстурами поруч із файлом

### Модель перевернута або має неправильний масштаб
- У Blender застосуйте `Ctrl + A` → **All Transforms** перед експортом
- Встановіть **+Y Up** у налаштуваннях експорту glTF

---

## Підсумок

| Що ми навчились                      | Інструмент / концепція        |
| ------------------------------------ | ----------------------------- |
| Завантаження 3D-моделей у браузер    | `GLTFLoader` (Three.js)       |
| Інтерактивне керування камерою       | `OrbitControls` (Three.js)    |
| Експорт моделей з Blender            | glTF 2.0 (.glb)               |
| Студійне освітлення для 3D-сцени     | Ambient + Directional + Hemisphere |
| Автоматичне кадрування               | Bounding Box → Camera Fit     |
