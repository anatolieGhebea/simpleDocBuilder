import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import VueResource from 'vue-resource';

Vue.config.productionTip = false

Vue.use(VueResource);
// Vue.use(Auth);

// Vue.http.options.root = "http://localhost:8080";
Vue.prototype.$hostname = 'http://localhost';
Vue.prototype.$hostnameport = '9092';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
