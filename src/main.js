import VueResource from 'vue-resource';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
