---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Віртуальна лабораторія 3DLab"
  text: "3D-моделювання · Візуалізація · Друк"
  tagline: Самбірський фаховий коледж економіки та інформаційних технологій
  actions:
    - theme: brand
      text: Уроки
      link: /3d-lecture/solar-system
    - theme: alt
      text: Про нас
      link: /3d-lecture/lighting-demo

features:
  - title: 🎓 Уроки
    details: Покрокові навчальні матеріали з Blender, Fusion 360 та 3D-друку
    link: /3d-lecture/solar-system
  - title: 📚 База знань
    details: Довідники, шпаргалки та корисні матеріали з 3D-моделювання
    link: /3d-lecture/rotating-shapes
  - title: 🎨 Галерея робіт
    details: Найкращі роботи студентів нашої віртуальної лабораторії
    link: /3d-lecture/particle-system
  - title: 🏫 Про нас
    details: Віртуальна лабораторія при Самбірському фаховому коледжі
    link: /3d-lecture/lighting-demo
  - title: 🖥️ Blender-модель
    details: Завантажуйте 3D-моделі з Blender та взаємодійте з ними у браузері
    link: /3d-lecture/blender-model
  - title: 🖨️ Замовлення 3D-друку
    details: Замовте друк вашої моделі на 3D-принтері
    link: /3d-lecture/order
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

