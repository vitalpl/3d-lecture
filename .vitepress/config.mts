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
      { text: 'Сонячна система', link: '/solar-system' },
      { text: 'Обертання', link: '/rotating-shapes' },
      { text: 'Частинки', link: '/particle-system' },
      { text: 'Освітлення', link: '/lighting-demo' },
      { text: 'Blender-модель', link: '/blender-model' },
      { text: 'Замовлення', link: '/order' }
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
