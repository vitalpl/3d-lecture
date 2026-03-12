---
layout: page
title: Замовлення 3D-друку
---

<style>
.order-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.order-hero {
  text-align: center;
  margin-bottom: 2.5rem;
}

.order-hero h1 {
  font-size: 2.4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
}

.order-hero p {
  font-size: 1.15rem;
  color: var(--vp-c-text-2);
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.7;
}

.order-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.order-feature {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.order-feature:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.12);
}

.order-feature .icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.order-feature h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.order-feature p {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0.35rem 0 0;
  line-height: 1.4;
}

.iframe-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.08);
}

.iframe-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #6366f1);
  background-size: 200% 100%;
  animation: gradient-slide 3s ease infinite;
  z-index: 1;
}

@keyframes gradient-slide {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.iframe-wrapper iframe {
  display: block;
  width: 100%;
  height: 100vh;
  border: none;
}

.order-footer {
  text-align: center;
  margin-top: 2rem;
  padding: 1.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.order-footer p {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin: 0;
}

.order-footer a {
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
}

.order-footer a:hover {
  text-decoration: underline;
}
</style>

<div class="order-page">
  <div class="order-hero">
    <h1>🖨️ Замовлення 3D-друку</h1>
    <p>Завантажте вашу 3D-модель, оберіть матеріал та отримайте миттєву розцінку. Швидко, зручно та професійно.</p>
  </div>

  <div class="order-features">
    <div class="order-feature">
      <div class="icon">📁</div>
      <h3>Завантаження моделі</h3>
      <p>STL, OBJ, STEP та інші формати</p>
    </div>
    <div class="order-feature">
      <div class="icon">⚙️</div>
      <h3>Вибір матеріалу</h3>
      <p>PLA, ABS, нейлон, смола</p>
    </div>
    <div class="order-feature">
      <div class="icon">💰</div>
      <h3>Миттєва ціна</h3>
      <p>Автоматичний розрахунок вартості</p>
    </div>
    <div class="order-feature">
      <div class="icon">🚀</div>
      <h3>Швидке виконання</h3>
      <p>Професійний друк та доставка</p>
    </div>
  </div>

  <div class="iframe-wrapper">
    <section id="seekmake-quote-container">
      <iframe
        sandbox="allow-downloads allow-scripts allow-same-origin allow-forms allow-popups"
        id="seekmake-embed-iq"
        class="seekmake-embed-iq"
        src="https://seekmake.com/instant-quote/?isEmbed=true&manufacturer=6925644fd34a64ab51cefed1"
        scrolling="no"
      ></iframe>
    </section>
  </div>

  <div class="order-footer">
    <p>Виникли запитання? Зв'яжіться з нами — ми допоможемо з вашим проєктом 🤝</p>
  </div>
</div>

<script>
if (typeof document !== 'undefined') {
  const s = document.createElement('script');
  s.src = 'https://seekmake.com/assets/public/iq-api-latest.js';
  document.body.appendChild(s);
}
</script>
