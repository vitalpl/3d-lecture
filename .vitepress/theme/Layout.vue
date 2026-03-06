<template>
  <div class="layout">
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <h1>📚 Віртуальна лабораторія 3DLab</h1>
        </div>
        <ul class="nav-menu">
          <li><a href="/">Головна</a></li>
          <li><a href="/3d-lecture/solar-system">Рух по колу</a></li>
          <li><a href="/3d-lecture/rotating-shapes">Форми</a></li>
          <li><a href="/3d-lecture/particle-system">Частинки</a></li>
          <li><a href="/3d-lecture/lighting-demo">Світло</a></li>
          <li><a href="/3d-lecture/blender-model">Blender</a></li>
        </ul>
      </div>
    </nav>

    <div class="content-wrapper">
      <aside class="sidebar" v-if="showSidebar">
        <div class="sidebar-content">
          <h3>📖 Розділи</h3>
          <ul>
            <li><a href="/3d-lecture/solar-system" class="sidebar-link">Рух по колу в 3D просторі</a></li>
            <li><a href="/3d-lecture/rotating-shapes" class="sidebar-link">Обертаючі форми</a></li>
            <li><a href="/3d-lecture/particle-system" class="sidebar-link">Системи частинок</a></li>
            <li><a href="/3d-lecture/lighting-demo" class="sidebar-link">Освітлення & матеріали</a></li>
            <li><a href="/3d-lecture/blender-model" class="sidebar-link">Blender-модель</a></li>
          </ul>
        </div>
      </aside>

      <main class="main-content">
        <Content />
      </main>
    </div>

    <footer class="footer">
      <p>© 2026 3DLab · Навчальний ресурс</p>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const isMounted = ref(false)

function wrapSections() {
  const main = document.querySelector('.main-content')
  if (!main) return

  // Skip if already wrapped
  if (main.querySelector('.content-section')) return

  const children = Array.from(main.children)
  if (children.length === 0) return

  // Collect groups: each group starts at an h2 (or h1 for the intro)
  const groups = []
  let current = []

  children.forEach((el) => {
    const tag = el.tagName?.toLowerCase()
    if (tag === 'h2' && current.length > 0) {
      groups.push(current)
      current = []
    }
    current.push(el)
  })
  if (current.length > 0) groups.push(current)

  // Don't wrap if there's only 1 section
  if (groups.length <= 1) return

  // Wrap each group in a section div
  groups.forEach((els, i) => {
    const section = document.createElement('div')
    section.className = 'content-section ' + (i % 2 === 0 ? 'section-white' : 'section-gray')
    // Insert the section before the first element of the group
    main.insertBefore(section, els[0])
    els.forEach((el) => section.appendChild(el))
  })
}

onMounted(() => {
  isMounted.value = true
  nextTick(() => setTimeout(wrapSections, 100))
})

watch(
  () => route.path,
  () => {
    nextTick(() => setTimeout(wrapSections, 150))
  }
)

const showSidebar = computed(() => {
  if (!isMounted.value) return false
  return route.path !== '/' && route.path !== '/3d-lecture-demo/'
})
</script>

<style scoped>
/* ─── Reset ─── */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ─── Layout shell ─── */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(160deg, #f2fdf8 0%, #e4f0eb 50%, #d8ece3 100%);
}

/* ─── Navbar ─── */
.navbar {
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(62, 207, 142, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 2px solid var(--color-mint-light, #e6faf0);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.9rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 1.4rem;
  color: var(--color-text, #2c3e40);
  letter-spacing: -0.02em;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 1.8rem;
}

.nav-menu a {
  text-decoration: none;
  color: var(--color-text-secondary, #5a6b6e);
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.3rem 0;
  border-bottom: 2px solid transparent;
  transition: color 0.25s, border-color 0.25s;
}

.nav-menu a:hover {
  color: var(--color-mint-dark, #2ab877);
  border-bottom-color: var(--color-mint, #3ecf8e);
}

/* ─── Content wrapper ─── */
.content-wrapper {
  flex: 1;
  display: flex;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  gap: 2rem;
  padding: 2rem;
}

/* ─── Sidebar ─── */
.sidebar {
  width: 250px;
  background: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  height: fit-content;
  position: sticky;
  top: 80px;
  border: 1px solid var(--color-border, #dce8e3);
}

.sidebar-content h3 {
  margin-bottom: 1rem;
  color: var(--color-text, #2c3e40);
  font-size: 1.05rem;
}

.sidebar-content ul {
  list-style: none;
}

.sidebar-content li {
  margin-bottom: 0.35rem;
}

.sidebar-content a {
  text-decoration: none;
  color: var(--color-text-secondary, #5a6b6e);
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.92rem;
  transition: all 0.25s;
}

.sidebar-content a:hover,
.sidebar-content a.active {
  background: var(--color-mint-light, #e6faf0);
  color: var(--color-mint-dark, #2ab877);
  font-weight: 600;
}

/* ─── Main content card ─── */
.main-content {
  flex: 1;
  background: #ffffff;
  border-radius: 10px;
  padding: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid var(--color-border, #dce8e3);
}

/* ─── Alternating sections (white ↔ gray) ─── */
.main-content :deep(.content-section) {
  padding: 2.5rem 2.5rem;
}

.main-content :deep(.section-white) {
  background: #ffffff;
}

.main-content :deep(.section-gray) {
  background: var(--color-section-gray, #f0f5f3);
}

/* ─── Typography ─── */
.main-content :deep(h1) {
  color: var(--color-text, #2c3e40);
  margin-bottom: 1.5rem;
  font-size: 2.2rem;
  border-bottom: 3px solid var(--color-mint, #3ecf8e);
  padding-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.main-content :deep(h2) {
  color: var(--color-text, #2c3e40);
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.65rem;
  letter-spacing: -0.01em;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid var(--color-mint-light, #e6faf0);
}

.main-content :deep(h3) {
  color: var(--color-text-secondary, #5a6b6e);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.main-content :deep(p) {
  color: var(--color-text-secondary, #5a6b6e);
  line-height: 1.85;
  margin-bottom: 1rem;
}

/* ─── Inline code ─── */
.main-content :deep(code) {
  background: var(--color-mint-light, #e6faf0);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.88em;
  color: var(--color-mint-darker, #1f9d64);
}

/* ─── Code blocks ─── */
.main-content :deep(pre) {
  background: #1e2a2d;
  color: #c5dbd7;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-size: 0.88rem;
  line-height: 1.6;
  border: 1px solid rgba(62, 207, 142, 0.15);
}

.main-content :deep(pre code) {
  background: none;
  color: inherit;
  padding: 0;
  font-size: inherit;
}

/* ─── Lists ─── */
.main-content :deep(ul),
.main-content :deep(ol) {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-text-secondary, #5a6b6e);
}

.main-content :deep(li) {
  margin-bottom: 0.45rem;
  line-height: 1.8;
}

/* ─── Tables ─── */
.main-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.92rem;
}

.main-content :deep(th) {
  background: var(--color-mint-light, #e6faf0);
  color: var(--color-text, #2c3e40);
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 2px solid var(--color-mint, #3ecf8e);
  font-weight: 600;
}

.main-content :deep(td) {
  padding: 0.7rem 1rem;
  border-bottom: 1px solid var(--color-border, #dce8e3);
  color: var(--color-text-secondary, #5a6b6e);
}

.main-content :deep(tr:hover) {
  background: var(--color-mint-ultra-light, #f2fdf8);
}

/* ─── Links ─── */
.main-content :deep(a) {
  color: var(--color-mint-dark, #2ab877);
  text-decoration: none;
  transition: color 0.25s;
}

.main-content :deep(a:hover) {
  color: var(--color-mint-darker, #1f9d64);
  text-decoration: underline;
}

/* ─── Blockquotes ─── */
.main-content :deep(blockquote) {
  border-left: 4px solid var(--color-mint, #3ecf8e);
  margin: 1.5rem 0;
  padding: 0.75rem 1.25rem;
  background: var(--color-mint-ultra-light, #f2fdf8);
  border-radius: 0 6px 6px 0;
  color: var(--color-text-secondary, #5a6b6e);
}

/* ─── Horizontal rules ─── */
.main-content :deep(hr) {
  border: none;
  border-top: 2px solid var(--color-mint-light, #e6faf0);
  margin: 2rem 0;
}

/* ─── Images ─── */
.main-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1rem 0;
}

/* ─── Footer ─── */
.footer {
  background: #ffffff;
  border-top: 2px solid var(--color-mint-light, #e6faf0);
  padding: 1.5rem 2rem;
  text-align: center;
  color: var(--color-text-muted, #8a9a9d);
  font-size: 0.88rem;
}

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 1rem;
  }

  .sidebar {
    width: 100%;
    position: static;
  }

  .nav-container {
    flex-direction: column;
    gap: 0.75rem;
  }

  .nav-menu {
    gap: 0.8rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .main-content :deep(.content-section) {
    padding: 1.5rem;
  }

  .main-content :deep(h1) {
    font-size: 1.75rem;
  }

  .main-content :deep(h2) {
    font-size: 1.4rem;
  }
}
</style>
