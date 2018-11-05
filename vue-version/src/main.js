import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';

Vue.use(VueResource);


Vue.http.options.root = 'http://localhost/simpleDocBuilder';


import chapter from './components/pageCmp/Chapter.vue';
import subchapter from './components/pageCmp/SubChapter.vue';
import paragraph from './components/pageCmp/Paragraph.vue';
Vue.component('chapter', chapter);
Vue.component('subchapter', subchapter);
Vue.component('paragraph', paragraph);

new Vue({
  el: '#app',
  render: h => h(App)
})
