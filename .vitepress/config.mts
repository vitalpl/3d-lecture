import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "3D Лекції",
  description: "Навчальний ресурс з 3D графіки",
  base: '/3d-lecture/',
  themeConfig: {
    nav: [
      { text: 'Головна', link: '/' },
      { text: 'Сонячна система', link: '/solar-system' },
      { text: 'Обертання', link: '/rotating-shapes' },
      { text: 'Частинки', link: '/particle-system' },
      { text: 'Освітлення', link: '/lighting-demo' },
      { text: 'Blender-модель', link: '/blender-model' }
    ],
    sidebar: [
      {
        text: 'Лекції',
        items: [
          { text: 'Рух по колу', link: '/solar-system' },
          { text: 'Геометрія й обертання', link: '/rotating-shapes' },
          { text: 'Системи частинок', link: '/particle-system' },
          { text: 'Освітлення', link: '/lighting-demo' },
          { text: 'Blender-модель', link: '/blender-model' }
        ]
      }
    ]
  }
})
