import { defineConfig } from 'vitepress'
import { cpSync, existsSync } from 'fs'
import { resolve } from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "3D Лекції",
  description: "Навчальний ресурс з 3D графіки",
  base: '/3d-lecture/',
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/3d-lecture/images/favicon-32x32.png' }]
  ],
  buildEnd({ outDir }) {
    // Manually copy public assets (workaround for non-ASCII paths on Windows)
    const publicDir = resolve(__dirname, 'public')
    if (existsSync(publicDir)) {
      cpSync(publicDir, outDir, { recursive: true, force: true })
    }
  },
  themeConfig: {
    nav: [
      { text: 'Головна', link: '/' },
      {
        text: 'Уроки',
        items: [
          { text: 'Blender для початківців', link: '/blender-basics' },
          { text: 'Основи Fusion', link: '/fusion-basics' },
          { text: 'Основи 3D-друку', link: '/3d-print-basics' }
        ]
      },
      { text: 'База знань', link: '/rotating-shapes' },
      { text: 'Галерея робіт', link: '/particle-system' },
      { text: 'Про нас', link: '/lighting-demo' },
      { text: 'Blender-модель', link: '/blender-model' },
      { text: 'Замовлення', link: '/order' }
    ],
    sidebar: [
      {
        text: 'Уроки',
        items: [
          { text: 'Blender для початківців', link: '/blender-basics' },
          { text: 'Основи Fusion', link: '/fusion-basics' },
          { text: 'Основи 3D-друку', link: '/3d-print-basics' }
        ]
      },
      {
        text: 'Розділи',
        items: [
          { text: 'База знань', link: '/rotating-shapes' },
          { text: 'Галерея робіт', link: '/particle-system' },
          { text: 'Blender-модель', link: '/blender-model' },
          { text: 'Про нас', link: '/lighting-demo' },
          { text: 'Замовлення', link: '/order' }
        ]
      }
    ]
  }
})
