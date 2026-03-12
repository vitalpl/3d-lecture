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
          <li><a href="/3d-lecture/order">Замовлення</a></li>
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
            <li><a href="/3d-lecture/order" class="sidebar-link">Замовлення 3D-друку</a></li>
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
  background: linear-gradient(160deg, #f5f3ff 0%, #eef2ff 50%, #e8e0ff 100%);
}

/* ─── Navbar ─── */
.navbar {
  background: #ffffff;
  box-shadow: 0 2px 16px rgba(99, 102, 241, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: none;
}

.navbar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #6366f1);
  background-size: 200% 100%;
  animation: gradient-slide 3s ease infinite;
}

@keyframes gradient-slide {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
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
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 1.6rem;
}

.nav-menu a {
  text-decoration: none;
  color: var(--color-text-secondary, #4b5563);
  font-weight: 500;
  font-size: 0.92rem;
  padding: 0.35rem 0.6rem;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.nav-menu a:hover {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.08);
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
  width: 260px;
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 24px rgba(99, 102, 241, 0.06);
  height: fit-content;
  position: sticky;
  top: 85px;
  border: 1px solid var(--color-border, #e0e0ef);
}

.sidebar-content h3 {
  margin-bottom: 1rem;
  color: var(--color-text, #1e1b4b);
  font-size: 1.05rem;
  font-weight: 700;
}

.sidebar-content ul {
  list-style: none;
}

.sidebar-content li {
  margin-bottom: 0.3rem;
}

.sidebar-content a {
  text-decoration: none;
  color: var(--color-text-secondary, #4b5563);
  display: block;
  padding: 0.55rem 0.85rem;
  border-radius: 10px;
  font-size: 0.92rem;
  transition: all 0.25s ease;
}

.sidebar-content a:hover,
.sidebar-content a.active {
  background: rgba(99, 102, 241, 0.08);
  color: #6366f1;
  font-weight: 600;
}

/* ─── Main content card ─── */
.main-content {
  flex: 1;
  background: #ffffff;
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 4px 32px rgba(99, 102, 241, 0.06);
  overflow: hidden;
  border: 1px solid var(--color-border, #e0e0ef);
}

/* ─── Alternating sections (white ↔ gray) ─── */
.main-content :deep(.content-section) {
  padding: 2.5rem 2.5rem;
}

.main-content :deep(.section-white) {
  background: #ffffff;
}

.main-content :deep(.section-gray) {
  background: var(--color-section-gray, #f1f0fb);
}

/* ─── Typography ─── */
.main-content :deep(h1) {
  font-size: 2.4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7) 1;
  letter-spacing: -0.02em;
}

.main-content :deep(h2) {
  color: var(--color-text, #1e1b4b);
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.65rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-mint-light, #eef2ff);
}

.main-content :deep(h3) {
  color: var(--color-text, #1e1b4b);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.main-content :deep(p) {
  color: var(--color-text-secondary, #4b5563);
  line-height: 1.85;
  margin-bottom: 1rem;
}

/* ─── Inline code ─── */
.main-content :deep(code) {
  background: var(--color-mint-light, #eef2ff);
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.88em;
  color: #6366f1;
}

/* ─── Code blocks ─── */
.main-content :deep(pre) {
  background: #1e1b4b;
  color: #e0e7ff;
  padding: 1.5rem;
  border-radius: 12px;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-size: 0.88rem;
  line-height: 1.6;
  border: 1px solid rgba(99, 102, 241, 0.2);
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
  color: var(--color-text-secondary, #4b5563);
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
  border-radius: 12px;
  overflow: hidden;
}

.main-content :deep(th) {
  background: linear-gradient(135deg, #eef2ff, #e8e0ff);
  color: var(--color-text, #1e1b4b);
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 2px solid #6366f1;
  font-weight: 600;
}

.main-content :deep(td) {
  padding: 0.7rem 1rem;
  border-bottom: 1px solid var(--color-border, #e0e0ef);
  color: var(--color-text-secondary, #4b5563);
}

.main-content :deep(tr:hover) {
  background: var(--color-mint-ultra-light, #f5f3ff);
}

/* ─── Links ─── */
.main-content :deep(a) {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.25s;
}

.main-content :deep(a:hover) {
  color: #4f46e5;
  text-decoration: underline;
}

/* ─── Blockquotes ─── */
.main-content :deep(blockquote) {
  border-left: 4px solid #8b5cf6;
  margin: 1.5rem 0;
  padding: 0.75rem 1.25rem;
  background: var(--color-mint-ultra-light, #f5f3ff);
  border-radius: 0 12px 12px 0;
  color: var(--color-text-secondary, #4b5563);
}

/* ─── Horizontal rules ─── */
.main-content :deep(hr) {
  border: none;
  border-top: 2px solid var(--color-mint-light, #eef2ff);
  margin: 2rem 0;
}

/* ─── Images ─── */
.main-content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  margin: 1rem 0;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.08);
}

/* ─── Footer ─── */
.footer {
  background: #ffffff;
  border-top: none;
  padding: 1.5rem 2rem;
  text-align: center;
  color: var(--color-text-muted, #9ca3af);
  font-size: 0.88rem;
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #6366f1);
  background-size: 200% 100%;
  animation: gradient-slide 3s ease infinite;
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
    gap: 0.6rem;
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
