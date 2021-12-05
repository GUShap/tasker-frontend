import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
import ElementUI from 'element-ui';
import "./styles/styles.scss"

//ICON
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome,faSortDown,faThLarge,faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import EmojiPickerPlugin from 'vue-emoji-picker'


library.add(faUserSecret ,faHome, faThLarge,faSortDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)


//=====
Vue.config.productionTip = false
Vue.use(ElementUI,  EmojiPickerPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  components:{
    EmojiPicker: window.EmojiPicker
  },
  render: h => h(App)
}).$mount('#app')
