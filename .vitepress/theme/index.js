import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import SolarSystem from './components/SolarSystem.vue'
import RotatingShapes from './components/RotatingShapes.vue'
import ParticleSystem from './components/ParticleSystem.vue'
import LightingDemo from './components/LightingDemo.vue'
import Light2 from './components/Light2.vue'
import BlenderModel from './components/BlenderModel.vue'
import './style.css'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('SolarSystem', SolarSystem)
    app.component('RotatingShapes', RotatingShapes)
    app.component('ParticleSystem', ParticleSystem)
    app.component('LightingDemo', LightingDemo)
    app.component('Light2', Light2)
    app.component('BlenderModel', BlenderModel)
  }
}