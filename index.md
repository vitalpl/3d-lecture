---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Віртуальна лабораторія 3DLab"
  text: "VitePress + Three.js"
  tagline: Інтерактивні приклади 3D графіки
  actions:
    - theme: brand
      text: Рух по колу
      link: /3d-lecture/solar-system
    - theme: alt
      text: Всі лекції
      link: /3d-lecture/rotating-shapes

features:
  - title: 🌍 Рух по колу
    details: Вивчайте орбітальну механіку на прикладі Сонячної системи
  - title: 🔄 Геометрія й обертання
    details: Eksperymentujte з різними формами та швидкістю обертання
  - title: 💫 Системи частинок
    details: Симулюйте фізику з гравітацією та взаємодіями
  - title: 💡 Освітлення
    details: Дізнайтеся як правильне освітлення змінює все
  - title: 🎨 Blender-модель
    details: Завантажуйте 3D-моделі з Blender та взаємодійте з ними у браузері
    link: /blender-model
---

<script setup>
import { withBase } from 'vitepress'
</script>

<div style="max-width: 800px; margin: 2rem auto; text-align: center; padding: 0 1.5rem;">
  <img :src="withBase('/images/oli_1.jpg')" alt="Олімпіада з 3D-моделювання" style="width: 100%; border-radius: 16px; box-shadow: 0 4px 32px rgba(99,102,241,0.12); margin-bottom: 1.5rem;" />
  <h2 style="font-weight: 800; background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.75rem;">🏆 Олімпіада з 3D-моделювання</h2>
  <p style="font-size: 1.1rem; line-height: 1.8; color: #4b5563;">
    У <strong>Самбірському фаховому коледжі економіки та інформаційних технологій</strong> відбулась олімпіада з 3D-моделювання.<br>
    Переможець — студент <strong>34п</strong> групи <strong>Володимир Іванишин</strong>. Вітаємо! 🎉
  </p>
</div>

