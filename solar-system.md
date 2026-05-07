---
layout: page
title: Уроки
description: Навчальні матеріали з 3D-моделювання та цифрового виробництва
---

# 🎓 Уроки

Ласкаво просимо до розділу навчальних матеріалів! Тут ви знайдете покрокові уроки з 3D-моделювання, проєктування та друку.

---

## 📚 Доступні курси

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">

<div style="background: linear-gradient(135deg, #eef2ff, #e8e0ff); border-radius: 16px; padding: 2rem; border: 1px solid #e0e0ef; transition: transform 0.2s;">
  <h3 style="margin-top: 0;">🎨 Blender</h3>
  <p>Перші кроки у світі 3D-моделювання. Інтерфейс, навігація, базові інструменти та створення першої моделі.</p>
  <a href="/3d-lecture/blender-basics" style="display: inline-block; padding: 0.5rem 1.2rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border-radius: 8px; text-decoration: none; font-weight: 600;">Почати навчання →</a>
</div>

<div style="background: linear-gradient(135deg, #eef2ff, #e8e0ff); border-radius: 16px; padding: 2rem; border: 1px solid #e0e0ef; transition: transform 0.2s;">
  <h3 style="margin-top: 0;">⚙️ Fusion</h3>
  <p>Знайомство з Autodesk Fusion 360 — ескізи, параметричне моделювання та підготовка деталей до виробництва.</p>
  <a href="/3d-lecture/fusion-basics" style="display: inline-block; padding: 0.5rem 1.2rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border-radius: 8px; text-decoration: none; font-weight: 600;">Почати навчання →</a>
</div>

<div style="background: linear-gradient(135deg, #eef2ff, #e8e0ff); border-radius: 16px; padding: 2rem; border: 1px solid #e0e0ef; transition: transform 0.2s;">
  <h3 style="margin-top: 0;">🖨️ 3D-друк</h3>
  <p>Технології 3D-друку, підготовка моделей у слайсері, налаштування принтера та перший успішний друк.</p>
  <a href="/3d-lecture/3d-print-basics" style="display: inline-block; padding: 0.5rem 1.2rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border-radius: 8px; text-decoration: none; font-weight: 600;">Почати навчання →</a>
</div>

</div>

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
