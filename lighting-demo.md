---
layout: page
title: Освітлення і матеріали
description: Вивчаємо різні типи світла та матеріалів у Three.js
---

# Освітлення і матеріали

## Вступ

Освітлення - один з найважливіших аспектів 3D графіки. Це того як об'єкти виглядають залежить від:
- **Типу світла** - які його властивості
- **Матеріалу** - як об'єкт відбиває світло
- **Позиції** - де розміщене світло відносно об'єкта

## Типи світла

### AmbientLight (Амбієнтне світло)

Рівномірне освітлення всієї сцени, немає тіней:

```javascript
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)
```

- **Колір**: 0xffffff (білий)
- **Інтенсивність**: 0.5 (0 до 1)
- **Немає позиції** - світить скрізь

### DirectionalLight (Спрямоване світло)

Імітує далеке світло (наприклад сонце):

```javascript
const light = new THREE.DirectionalLight(0xffffff, 0.8)
light.position.set(5, 5, 5)
scene.add(light)
```

- **Has direction** - світить з визначеного напрямку
- **Створює тіні** - якщо включена тінь
- **Паралельні проміні** - як сонячне світло

### PointLight (Точкове світло)

Світло що випромінюється з точки:

```javascript
const light = new THREE.PointLight(0xff0000, 1, 100)
light.position.set(0, 5, 0)
scene.add(light)
```

- **Параметри**: 
  - Колір
  - Інтенсивність
  - Дальність дії
- **Імітує лампу** - світло розповсюджується у всі сторони
- **Найповільніше** - вимагає більше обчислень

### SpotLight (Світло прожектора)

Спрямоване світло виходить з точки (як ліхтарик):

<Light2 />

- **Конус світла** - освітлює тільки визначену область
- **Найбільш гнучкий** - контролює напрямок, кут, дальність

## Інтерактивна демонстрація

Експериментуйте з різними типами освітлення:

<LightingDemo />

## Матеріали

### MeshBasicMaterial

Найпростіший матеріал, не реагує на світло:

```javascript
const material = new THREE.MeshBasicMaterial({
  color: 0x0066cc,
  wireframe: false
})
```

- **Відсутня тінь** - об'єкт однорідної яскравості
- **Дешево** - швидкий рендеринг
- **Ідеально для**: текстур, карт, UI елементів

### MeshLambertMaterial

Матова поверхня, реагує на світло:

```javascript
const material = new THREE.MeshLambertMaterial({
  color: 0x0066cc,
  emissive: 0x000000
})
```

- **Немає бліску** - матова поверхня
- **Реагує на світло** - має тіні
- **Дешевше ніж Phong**

### MeshPhongMaterial

Глянцевий матеріал з бліском:

```javascript
const material = new THREE.MeshPhongMaterial({
  color: 0x0066cc,
  shininess: 100,    // 0-100
  specular: 0x111111 // Колір бліску
})
```

- **Блиск** - відбитки світла на поверхні
- **Більш реалістичний** - але дорожче
- **Ідеально для**: пластику, лаку, металу

### MeshStandardMaterial

Фізично коректний матеріал (PBR):

```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0x0066cc,
  metalness: 0.5,    // 0-1
  roughness: 0.7     // 0-1
})
```

- **Найреалістичніший** - фізична модель
- **Найдорожче** - вимагає більше обчислень
- **Знаходиться** для професійних проектів

## Порівняння матеріалів

| Матеріал | Швидкість | Реалізм | Параметри |
|----------|----------|---------|-----------|
| Basic | ⚡⚡⚡ | ⭐ | Мінімальні |
| Lambert | ⚡⚡ | ⭐⭐ | Базові |
| Phong | ⚡ | ⭐⭐⭐ | Різні |
| Standard | 🐢 | ⭐⭐⭐⭐ | Фізичні |

## Поєднання світла і матеріалу

### Сценарій 1: Денна сцена
```javascript
// Амбієнтне світло (загальне освітлення)
const ambient = new THREE.AmbientLight(0xffffff, 0.6)

// Спрямоване світло (сонце)
const sun = new THREE.DirectionalLight(0xffffff, 0.8)
sun.position.set(5, 10, 7)

// Матеріал
const material = new THREE.MeshStandardMaterial({
  color: 0xff9966,
  metalness: 0,
  roughness: 0.8
})
```

### Сценарій 2: Нічна сцена
```javascript
// Мало амбієнтного світла
const ambient = new THREE.AmbientLight(0x0066cc, 0.2)

// Точкові світла (ліхтарі)
const lamp1 = new THREE.PointLight(0xffff00, 1, 50)
lamp1.position.set(-5, 3, 0)

const lamp2 = new THREE.PointLight(0xff00ff, 0.8, 40)
lamp2.position.set(5, 3, 0)

// Металевий матеріал
const material = new THREE.MeshStandardMaterial({
  color: 0x333333,
  metalness: 0.9,
  roughness: 0.2
})
```

## Завдання

1. **Відтворіть кімнату** - Створіть сцену з кількома світлами
2. **Симулюйте закат** - Поступово змініть колір світла
3. **Додайте тіні** - Включите `castShadow` та `receiveShadow`
4. **Експериментуйте** - Спробуйте різні комбінації

## Посилання

- [Three.js Lights](https://threejs.org/docs/#api/en/lights/Light)
- [Three.js Materials](https://threejs.org/docs/#api/en/materials/Material)
- [Physically Based Rendering](https://learnopengl.com/PBR/Theory)
- [Color Theory in 3D](https://www.adobe.com/products/color/basics/)
