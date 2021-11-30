import Vue from 'vue'
import App from './App.vue'
import router from './router'
import boardStore from './store/board.store'
import ElementUI from 'element-ui';
import "./styles/styles.scss"

//ICON
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome,faSortDown,faThLarge,faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret ,faHome, faThLarge,faSortDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)


//=====
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  boardStore,
  render: h => h(App)
}).$mount('#app')
