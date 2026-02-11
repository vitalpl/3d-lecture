import Layout from './Layout.vue'
import SolarSystem from './components/SolarSystem.vue'
import RotatingShapes from './components/RotatingShapes.vue'
import ParticleSystem from './components/ParticleSystem.vue'
import LightingDemo from './components/LightingDemo.vue'
import './style.css'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('SolarSystem', SolarSystem)
    app.component('RotatingShapes', RotatingShapes)
    app.component('ParticleSystem', ParticleSystem)
    app.component('LightingDemo', LightingDemo)
  }
}
