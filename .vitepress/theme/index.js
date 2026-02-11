import Layout from './Layout.vue'
import SolarSystem from './components/SolarSystem.vue'
import './style.css'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('SolarSystem', SolarSystem)
  }
}
