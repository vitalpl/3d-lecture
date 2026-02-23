<template>
  <div class="layout">
    <!-- Navbar -->
    <header class="navbar">
      <div class="nav-container">
        <h1 class="logo">📚 Віртуальна лабораторія 3DLab</h1>
        <nav class="nav-menu">
          <a href="/">Головна</a>
          <a href="/3d-lecture/solar-system">Рух по колу</a>
          <a href="/3d-lecture/rotating-shapes">Форми</a>
          <a href="/3d-lecture/particle-system">Частинки</a>
          <a href="/3d-lecture/lighting-demo">Світло</a>
        </nav>
      </div>
    </header>

    <!-- Content -->
    <div class="content-wrapper">
      <aside v-if="showSidebar" class="sidebar">
        <h3>📖 Розділи</h3>
        <ul>
          <li><a href="/3d-lecture/solar-system">Рух по колу</a></li>
          <li><a href="/3d-lecture/rotating-shapes">Обертаючі форми</a></li>
          <li><a href="/3d-lecture/particle-system">Системи частинок</a></li>
          <li><a href="/3d-lecture/lighting-demo">Освітлення</a></li>
        </ul>
      </aside>

      <!-- ВАЖЛИВО: vp-doc -->
      <main class="main-content vp-doc">
        <Content />
      </main>
    </div>

    <!-- Footer -->
    <footer class="footer">
      © 2026 3DLab · Навчальний ресурс
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const showSidebar = computed(() => {
  return route.path !== '/'
})
</script>

<style>
/* НЕ scoped — щоб не ламати deep стилі VitePress */

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* Navbar */
.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.4rem;
  color: #333;
}

.nav-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-menu a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  transition: 0.3s;
}

.nav-menu a:hover {
  color: #0066cc;
}

/* Content layout */
.content-wrapper {
  flex: 1;
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
}

.sidebar {
  width: 240px;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: fit-content;
}

.sidebar h3 {
  margin-bottom: 1rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 0.5rem;
}

.sidebar a {
  text-decoration: none;
  color: #666;
}

.sidebar a:hover {
  color: #0066cc;
}

.main-content {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Footer */
.footer {
  background: white;
  border-top: 1px solid #eee;
  padding: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #999;
}

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 1rem;
  }

  .sidebar {
    width: 100%;
  }

  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>