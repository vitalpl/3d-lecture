import { defineConfig } from 'vitepress'
import { cpSync, existsSync } from 'fs'
import { resolve } from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "3D Лекції",
  description: "Навчальний ресурс з 3D графіки",
  base: '/3d-lecture/',
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/3d-lecture/images/favicon-32x32.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }]
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
          { text: 'Blender', link: '/blender-basics' },
          { text: 'Fusion', link: '/fusion-basics' },
          { text: '3D-друк', link: '/3d-print-basics' }
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
          { text: 'Blender', link: '/blender-basics' },
          { text: 'Fusion', link: '/fusion-basics' },
          { text: '3D-друк', link: '/3d-print-basics' }
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
