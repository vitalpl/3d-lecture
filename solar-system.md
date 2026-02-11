---
layout: page
title: Рух по колу в 3D просторі
description: Вивчаємо принципи кругового руху на прикладі Сонячної системи
---

# Рух по колу в 3D просторі

## Вступ

Коловий рух – один з найважливіших типів руху у фізиці та комп'ютерної графіці. У цій статті ми розберемо, як змусити об'єкти рухатися по колу у тривимірному просторі, використовуючи Сонячну систему як практичний приклад.

Коловий рух можна описати за допомогою:
- **Радіуса орбіти** – відстані від центру обертання до об'єкта
- **Кута повороту** – поточної позиції об'єкта на орбіті
- **Кутової швидкості** – як швидко змінюється кут

## Математичні основи

### Параметричне рівняння кола

Положення об'єкта, який обертається навколо центральної точки, можна обчислити за допомогою параметричних рівнянь:

$$x = r \cdot \cos(\theta)$$
$$z = r \cdot \sin(\theta)$$

де:
- **r** – радіус орбіти
- **θ** – поточний кут (в радіанах)
- **x, z** – координати об'єкта в 3D просторі

На кожному кроці анімації ми збільшуємо кут на малу величину:

$$\theta = \theta + \omega \cdot dt$$

де **ω** – кутова швидкість, а **dt** – час, що минув з попереднього кадру.

### Приклад обчислення

Якщо планета обертається на відстані 35 одиниць від Сонця зі швидкістю 0.01 радіанів за кадр:

```javascript
const distance = 35    // радіус орбіти
const speed = 0.01     // кутова швидкість
let angle = 0          // поточний кут

function updatePosition() {
  angle += speed
  
  const x = Math.cos(angle) * distance
  const z = Math.sin(angle) * distance
  
  planet.position.set(x, 0, z)
}
```

## Практичний приклад: Сонячна система

Нижче ви можете побачити інтерактивну модель Сонячної системи. Давайте розберемо, як вона реалізована:

<SolarSystem />

### Дані про планети

| Планета | Розмір | Відстань від Сонця | Швидкість |
|---------|--------|-------------------|-----------|
| Меркурій | 2 | 15 | 0.04 |
| Венера | 3.8 | 25 | 0.015 |
| Земля | 4 | 35 | 0.01 |
| Марс | 3 | 45 | 0.008 |
| Юпітер | 11 | 60 | 0.002 |
| Сатурн | 9 | 75 | 0.0009 |

## Реалізація в Three.js

### Створення сцени та основних об'єктів

```javascript
import * as THREE from 'three'

// Ініціалізація сцени
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
```

### Створення Сонця

Сонце – це центральний об'єкт, яке не рухається. Ми створюємо його за допомогою сфери та матеріалу, що світить:

```javascript
const sunGeometry = new THREE.SphereGeometry(8, 32, 32)
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfdb813 })
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)
```

### Створення планет і орбіт

Для кожної планети ми:
1. Створюємо геометрію сфери
2. Задаємо колір
3. Додаємо до сцени
4. Зберігаємо дані про орбіту

```javascript
const planetsData = [
  { name: 'Earth', size: 4, distance: 35, speed: 0.01, color: 0x4a90e2 },
  { name: 'Mars', size: 3, distance: 45, speed: 0.008, color: 0xe27b58 }
  // ...
]

const orbitObjects = []

planetsData.forEach((planetData) => {
  // Створення геометрії
  const geometry = new THREE.SphereGeometry(planetData.size, 32, 32)
  const material = new THREE.MeshPhongMaterial({ color: planetData.color })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  
  // Збереження даних для анімації
  orbitObjects.push({
    mesh: mesh,
    distance: planetData.distance,
    speed: planetData.speed,
    angle: 0
  })
})
```

### Рисування орбіт

Щоб візуалізувати орбіти, ми рисуємо тонкі лінії у формі кола:

```javascript
const orbitGeometry = new THREE.BufferGeometry()
const orbitPoints = []

// Генеруємо 64 точки, які утворюють коло
for (let i = 0; i <= 64; i++) {
  const angle = (i / 64) * Math.PI * 2
  orbitPoints.push(
    Math.cos(angle) * distance,
    0,
    Math.sin(angle) * distance
  )
}

orbitGeometry.setAttribute('position', 
  new THREE.BufferAttribute(new Float32Array(orbitPoints), 3))
  
const orbit = new THREE.Line(orbitGeometry, orbitMaterial)
scene.add(orbit)
```

### Анімаційний цикл

Головна логіка анімації – це оновлення положення планет на кожному кадрі:

```javascript
function animate() {
  requestAnimationFrame(animate)
  
  // Оновлюємо позицію кожної планети
  orbitObjects.forEach((obj) => {
    obj.angle += obj.speed
    
    // Обчислюємо нову позицію за формулами
    obj.mesh.position.x = Math.cos(obj.angle) * obj.distance
    obj.mesh.position.z = Math.sin(obj.angle) * obj.distance
    
    // Додаємо обертання планети навколо своєї осі
    obj.mesh.rotation.y += 0.01
  })
  
  renderer.render(scene, camera)
}

animate()
```

## Ключові концепції

### 1. Параметричне описання орбіти

Замість того, щоб слідувати складній траєкторії, ми використовуємо математичні формули для обчислення позиції. Це простіше і більш ефективно.

### 2. Кутова швидкість

Різні планети мають різні швидкості обертання. Це можна контролювати за допомогою значення `speed`. Більше значення = швидше обертання.

### 3. Багатошарова анімація

- **Орбітальний рух** – планета рухається навколо Сонця
- **Осьовий рух** – планета обертається навколо своєї осі
- **Побічний рух** – якщо б була Місяць, вона б оберталася навколо планети

### 4. Освітлення

Вико́ристовуємо кілька типів освітлення:
- `AmbientLight` – рівномірне освітлення сцени
- `PointLight` – світло від Сонця

## Вправи

Спробуйте модифікувати код:

1. **Змініть кольори** планет
2. **Добавте нові планети** з власними параметрами
3. **Змініть швидкість обертання** деяких планет
4. **Добавте контроль камери** за допомогою миші
5. **Змініть освітлення** для різних ефектів

## Висновки

Коловий рух у 3D просторі – це простий, але потужний концепт у комп'ютерній графіці. За допомогою параметричних рівнянь та тригонометрії ми можемо створювати плавні, природні анімації.

Ключові точки:
- 📐 Використовуйте `Math.cos()` та `Math.sin()` для обчислення позиції
- ⚙️ Контролюйте швидкість за допомогою кутової швидкості
- 🎨 Комбінуйте різні типи руху для складніших ефектів
- 🎬 Анімаційні цикли постійно оновлюють позицію об'єктів

## Посилання

- [Three.js Документація](https://threejs.org/docs/)
- [MDN: Math.cos() та Math.sin()](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math)
- [Параметричні рівняння](https://uk.wikipedia.org/wiki/Параметричні_рівняння)
