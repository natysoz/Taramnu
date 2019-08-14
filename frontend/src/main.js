import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import './registerServiceWorker'
import './plugins/fontawesome'
import './assets/fonts/all.min.css';


const options = {
  confirmButtonColor:'#41b882',
  cancelButtonColor: '#ff7674'
}

Vue.use(VueSweetalert2,options);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
