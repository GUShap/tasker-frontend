import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./styles/styles.scss"
import boardStore from './store/board.store'
import ElementUI from 'element-ui';

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  boardStore,
  render: h => h(App)
}).$mount('#app')
