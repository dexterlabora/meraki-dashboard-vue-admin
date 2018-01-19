Vue.use(VueRouter);

const componentInfos = [
  {
    name: 'home',
    componentUrl: 'components/Home.vue',
    path: '/'
  },
  {
    name: 'about',
    componentUrl: 'components/About.vue',
    path: '/about'
  },
  {
    name: 'wireless',
    componentUrl: 'components/meraki/wireless/WirelessPage.vue',
    path: '/wireless',
  },
  {
    name: 'devices',
    componentUrl: 'components/meraki/devices/DevicesPage.vue',
    path: '/devices'
  },
  {
    name: 'licenses',
    componentUrl: 'components/meraki/licenses/LicensesPage.vue',
    path: '/licenses'
  },
  {
    name: 'inventory',
    componentUrl: 'components/meraki/inventory/Inventory.vue',
    path: '/inventory'
  },
  {
    name: 'networks',
    componentUrl: 'components/meraki/networks/NetworksPage.vue',
    path: '/networks'
  },
  {
    name: 'createNetwork',
    componentUrl: 'components/meraki/networks/CreateNetwork.vue',
    path: '/createnetwork'
  },
  {
    name: 'traffic',
    componentUrl: 'components/meraki/traffic/TrafficPage.vue',
    path: '/traffic'
  }
]

const routes = componentInfos.map(function(component) {
  component.component = Vue.component(component.name, httpVueLoader(component.componentUrl));
  return component;
});

const router = new VueRouter({
  routes: routes
});
