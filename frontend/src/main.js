import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import VueResource from 'vue-resource';

import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';


Vue.config.productionTip = false

Vue.use(VueResource);
// Vue.use(Auth);

// Vue.http.options.root = "http://localhost:8080";
Vue.prototype.$hostname = 'http://localhost';
Vue.prototype.$hostnameport = '8080';

export const SocketInstance = socketio('http://localhost:8080');
// SocketInstance.on('message',function(data){
//   console.log(data);
// });

// export const SocketInstance = socketio(this.$hostname+':'+this.$hostnameport);

Vue.use( new VueSocketIO( {"debug":true, "connection":SocketInstance }));

 
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
