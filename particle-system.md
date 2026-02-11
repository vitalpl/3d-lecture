---
layout: page
title: Система частинок
description: Вивчаємо симуляцію та анімацію частинок
---

# Системи частинок і симуляції

## Вступ

Системи частинок - це потужний інструмент для симуляції:
- Часток паперу, дощу, сніге
- Вибухів і магічних ефектів
- Дому і гравітації
- Колій та траєкторій

## Фізика симуляції

### Закони руху Ньютона

**Перший закон:** Об'єкт залишається в спокої, доки на нього не діє сила

**Другий закон:** F = ma (Сила = маса × прискорення)

**Третій закон:** Кожній дії відповідає протилежна дія

### Гравітація

Гравітаційна сила діє на всі об'єкти:

$$F = -g \cdot m$$

де:
- **g** - прискорення вільного падіння (≈ 9.8 м/с²)
- **m** - маса об'єкта

У 3D графіці ми часто спрощуємо це до:

$$v_y = v_y - gravity$$

## Інтерактивна демонстрація

Подивіться як гравітація впливає на частинки:

<ParticleSystem />

## Реалізація системи частинок

### Структура частинки

```javascript
class Particle {
  constructor(x, y, z) {
    this.position = new THREE.Vector3(x, y, z)
    this.velocity = new THREE.Vector3(0, 0, 0)
    this.acceleration = new THREE.Vector3(0, 0, 0)
    this.life = 1.0  // 0 до 1
  }

  update(gravity) {
    // Застосовуємо гравітацію
    this.velocity.y -= gravity
    
    // Оновлюємо позицію
    this.position.add(this.velocity)
    
    // Зменшуємо життя
    this.life -= 0.01
  }
}
```

### Points Geometry

Для ефективного рендерингу багатьох частинок використовуємо Points:

```javascript
const geometry = new THREE.BufferGeometry()

// Позиції всіх частинок
const positions = new Float32Array(particles.length * 3)
particles.forEach((p, i) => {
  positions[i * 3] = p.position.x
  positions[i * 3 + 1] = p.position.y
  positions[i * 3 + 2] = p.position.z
})

geometry.setAttribute('position', 
  new THREE.BufferAttribute(positions, 3))

const material = new THREE.PointsMaterial({
  size: 0.1,
  color: 0xff0000
})

const points = new THREE.Points(geometry, material)
scene.add(points)
```

### Симуляційний цикл

```javascript
function animate() {
  requestAnimationFrame(animate)
  
  // Оновлюємо кожну частинку
  particles.forEach(particle => {
    particle.update(gravity)
    
    // Перевіряємо межі сцени
    if (particle.position.y < -10) {
      particle.position.y = 10  // Переносимо вверх
      particle.velocity.y = 0
    }
  })
  
  // Оновлюємо bufferedGeometry
  geometry.attributes.position.needsUpdate = true
  
  renderer.render(scene, camera)
}
```

## Оптимізація

### Векторні операції
```javascript
// ✅ Добре - миттєво
const v = new THREE.Vector3(1, 2, 3)
v.add(new THREE.Vector3(1, 0, 0))

// ❌ Погано - повільно з великою кількістю
const x = position.x + 1
const y = position.y
const z = position.z
```

### Buffer Attributes
```javascript
// Для великих об'єм даних завжди використовуйте BufferAttribute
const positions = new Float32Array(count * 3)
geometry.setAttribute('position', 
  new THREE.BufferAttribute(positions, 3))
```

## Розширені можливості

- **Текстури** - Замість сфер можна використовувати спрайти
- **Столкновення** - Визначити щоб частинки опиралися об об'єкти
- **Сортування** - Обов'язково для прозорих частинок
- **GPU обчислення** - Для мільйонів частинок

## Завдання

1. Додайте **Ємність** - Частинки збираються в контейнер
2. Змініть **Форму випромінення** - Замість скрізь, випромінюйте з точки
3. Додайте **Вітер** - Горизонтальну силу, яка впливає на частинки
4. Створіть **Фонтан** - Безперервно генеруйте нові частинки

## Посилання

- [Three.js Points](https://threejs.org/docs/#api/en/objects/Points)
- [Three.js PointsMaterial](https://threejs.org/docs/#api/en/materials/PointsMaterial)
- [Частинкова система](https://en.wikipedia.org/wiki/Particle_system)
- [Introduction to Particle Systems](https://dev.epicgames.com/tutorials/)
