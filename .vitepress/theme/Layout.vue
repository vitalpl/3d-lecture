<template>
  <div class="layout">
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <h1>📚 3D Лекції</h1>
        </div>
        <ul class="nav-menu">
          <li><router-link to="/">Головна</router-link></li>
          <li><router-link to="/solar-system">Рух по колу</router-link></li>
        </ul>
      </div>
    </nav>

    <div class="content-wrapper">
      <aside class="sidebar" v-if="showSidebar">
        <div class="sidebar-content">
          <h3>📖 Розділи</h3>
          <ul>
            <li><router-link to="/solar-system" active-class="active">Рух по колу в 3D просторі</router-link></li>
          </ul>
        </div>
      </aside>

      <main class="main-content">
        <Content />
      </main>
    </div>

    <footer class="footer">
      <p>© 2026 3D Лекції · Навчальний ресурс</p>
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

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

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

.logo h1 {
  font-size: 1.5rem;
  color: #333;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-menu a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-menu a:hover,
.nav-menu a.router-link-active {
  color: #0066cc;
}

.content-wrapper {
  flex: 1;
  display: flex;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  gap: 2rem;
  padding: 2rem;
}

.sidebar {
  width: 250px;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 80px;
}

.sidebar-content h3 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.1rem;
}

.sidebar-content ul {
  list-style: none;
}

.sidebar-content li {
  margin-bottom: 0.5rem;
}

.sidebar-content a {
  text-decoration: none;
  color: #666;
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s;
}

.sidebar-content a:hover,
.sidebar-content a.active {
  background: #f0f4ff;
  color: #0066cc;
  font-weight: 600;
}

.main-content {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.main-content :deep(h1) {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  border-bottom: 3px solid #0066cc;
  padding-bottom: 1rem;
}

.main-content :deep(h2) {
  color: #333;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.main-content :deep(h3) {
  color: #555;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.main-content :deep(p) {
  color: #666;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.main-content :deep(code) {
  background: #f4f4f4;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  color: #d73a49;
}

.main-content :deep(pre) {
  background: #282c34;
  color: #abb2bf;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.main-content :deep(pre code) {
  background: none;
  color: inherit;
  padding: 0;
}

.main-content :deep(ul),
.main-content :deep(ol) {
  margin-left: 2rem;
  margin-bottom: 1rem;
  color: #666;
}

.main-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.8;
}

.main-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.95rem;
}

.main-content :deep(th) {
  background: #f0f4ff;
  color: #333;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #0066cc;
  font-weight: 600;
}

.main-content :deep(td) {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  color: #666;
}

.main-content :deep(tr:hover) {
  background: #f9fafb;
}

.main-content :deep(a) {
  color: #0066cc;
  text-decoration: none;
  transition: color 0.3s;
}

.main-content :deep(a:hover) {
  color: #0052a3;
  text-decoration: underline;
}

.footer {
  background: white;
  border-top: 1px solid #eee;
  padding: 2rem;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
}

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
    gap: 1rem;
  }

  .nav-menu {
    gap: 1rem;
  }

  .main-content {
    padding: 1.5rem;
  }
}
</style>
