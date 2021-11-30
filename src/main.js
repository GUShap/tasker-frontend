import Vue from 'vue'
import App from './App.vue'
import router from './router'
import boardStore from './store/board.store'
import ElementUI from 'element-ui';
import "./styles/styles.scss"

//ICON
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

//=====
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  boardStore,
  render: h => h(App)
}).$mount('#app')
