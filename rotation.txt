---
layout: page
title: Обертаючі форми
description: Вивчаємо обертання об'єктів у 3D просторі
---

# Обертаючі форми і геометрія

## Вступ

На цій сторінці ви дізнаєтеся про обертання об'єктів у тривимірному просторі та властивості **Euler кутів** у Three.js.

## Поняття обертання

Обертання в 3D просторі описується трьома кутами:
- **Rotation X** - обертання навколо осі X
- **Rotation Y** - обертання навколо осі Y  
- **Rotation Z** - обертання навколо осі Z

Ці кути вимірюються в **радіанах** (0 до 2π).

## Математика обертання

Матриця обертання описує як змінюються координати точки при обертанні. Для обертання навколо осі Y на кут θ:

$$R_y(\theta) = \begin{pmatrix}
\cos(\theta) & 0 & \sin(\theta) \\
0 & 1 & 0 \\
-\sin(\theta) & 0 & \cos(\theta)
\end{pmatrix}$$

## Інтерактивна демонстрація

Експериментуйте з елементами керування нижче:

<RotatingShapes />

## Класичні геометрії Three.js

### Куб (BoxGeometry)
```javascript
const geometry = new THREE.BoxGeometry(width, height, depth)
```
- Найпроста форма
- Ідеально для вивчення базових принципів

### Сфера (SphereGeometry)
```javascript
const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
```
- Гладка, органічна форма
- Вимагає більше вершин для гладкої поверхні

### Піраміда (ConeGeometry)
```javascript
const geometry = new THREE.ConeGeometry(radius, height, radialSegments)
```
- Використовується для конусів і пірамід
- Гарна для изучения граней (faces)

## Матеріали

У прикладі використовується **MeshPhongMaterial**, який відповідає за:
- **Diffuse color** - основний колір об'єкта
- **Specular highlights** - блиск від світла
- **Shininess** - інтенсивність відбитків

```javascript
const material = new THREE.MeshPhongMaterial({
  color: 0x0066cc,           // Основний колір
  shininess: 100              // Глянцеватість (0-100)
})
```

## Властивості object3D

```javascript
// Положення
mesh.position.set(x, y, z)

// Обертання (у радіанах)
mesh.rotation.x = Math.PI / 4
mesh.rotation.y = Math.PI / 6

// Масштабування
mesh.scale.set(1.5, 1.5, 1.5)

// Комбіноване обертання
mesh.rotation.order = 'YXZ'  // Порядок застосування обертань
```

## Завдання для експериментів

1. **Комбінуйте форми** - Створіть складну структуру з кількох куб або сфер
2. **Використовуйте разні швидкості** - Кожна форма обертається з власною швидкістю
3. **Змініть матеріали** - Різні матеріали дають різні результати освітлення
4. **Змініть позиції** - Розмістіть об'єкти на різних позиціях у просторі

## Посилання

- [Three.js BoxGeometry](https://threejs.org/docs/#api/en/geometries/BoxGeometry)
- [Three.js SphereGeometry](https://threejs.org/docs/#api/en/geometries/SphereGeometry)
- [Three.js Materials](https://threejs.org/docs/#api/en/materials/Material)
- [Euler Angles (Wikipedia)](https://en.wikipedia.org/wiki/Euler_angles)
