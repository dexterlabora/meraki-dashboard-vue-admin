

Vue.use(httpVueLoader);
//Vue.use(VueCharts);

//const EventBus = new Vue();
Vue.prototype.$eventHub = new Vue(); // Global event bus



const store = new Vuex.Store({
	state: {
    org: {},
    net: {},
    apikey: '',
    adminMode: false
  }
});


Vue.use(Vuetify, {
  theme: {
    primary: '#5cb85c', //green
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
});

new Vue({
  router,
  store,
  template: '<app></app>',
  components: {
    app: 'url:App.vue'
  }
}).$mount('#root');
