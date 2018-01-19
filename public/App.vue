<template>
  <v-app id="app">
    <v-toolbar color="primary">
      <v-toolbar-side-icon @click.native.stop="showNav = !showNav"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">Meraki API Demo </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items >
        <settings></settings> 
      </v-toolbar-items>
      
      
    </v-toolbar>
      <v-navigation-drawer left temporary fixed drawer v-model="showNav">
        
        <v-list>
            <org-net></org-net>

            
            <v-list-tile :router="true" :to="{ name: 'home'}">
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile>
          
          
            
          
          
            <v-list-tile :router="true" :to="{ name: 'wireless'}">
              <v-list-tile-title>Wireless</v-list-tile-title>
            </v-list-tile>
          
          
            <v-list-tile :router="true" :to="{ name: 'licenses'}">
              <v-list-tile-title>Licenses</v-list-tile-title>
            </v-list-tile>
          
          
            <v-list-tile :router="true" :to="{ name: 'inventory'}">
              <v-list-tile-title>Inventory</v-list-tile-title>
            </v-list-tile>
          
          
            <v-list-tile :router="true" :to="{ name: 'devices'}">
              <v-list-tile-title>Devices</v-list-tile-title>
            </v-list-tile>

            <v-list-tile :router="true" :to="{ name: 'networks'}">
              <v-list-tile-title>Networks</v-list-tile-title>
            </v-list-tile>

            <v-list-tile :router="true" :to="{ name: 'traffic'}">
              <v-list-tile-title>Traffic</v-list-tile-title>
            </v-list-tile>

            <v-list-tile :router="true" :to="{ name: 'about'}">
              <v-list-tile-title>About</v-list-tile-title>
            </v-list-tile>
          
        </v-list>
      </v-navigation-drawer>
      <v-content>
        <v-container>
          <router-view class="view"></router-view>
        </v-container>
      </v-content>
    <v-footer>
      <div class="text-xs-right"><small>This starter uses the <a class="vuetify-link" href="https://vuetifyjs.com/" target="_blank">Vuetify.js</a> ui component framework.</small></div>
    </v-footer>
  </v-app>
</template>

<script>
//const ListItem = httpVueLoader('components/list/ListItem.vue');


module.exports = {
  components: {
    'org-net': httpVueLoader('./components/meraki/OrgNet.vue'),
    'settings': httpVueLoader('./components/meraki/admin/settings.vue')
  },
	data: function() {
		return {
      showNav: false,
    };
  },
  mounted: function () {
    this.$eventHub.$on('orgSelected', function (org) {
      console.log('org update event received: ',org)
      this.org = org;
    });
    this.$eventHub.$on('netSelected', function (payload) {
      console.log('net update event received: ',payload)
      this.net = payload;
      //this.net = {id: 0, name:'test'}
      //alert(this.net.name); //works
    });
    this.$eventHub.$on('apiKeyUpdated', function (payload) {
      console.log('apikey update event received: ',payload)
      //this.$store.state.apikey = payload;
      //axios.defaults.headers.common['X-Cisco-Meraki-API-Key'] = this.$store.state.apikey;
      axios.defaults.headers.common['X-Cisco-Meraki-API-Key'] = payload;
    });
  },
  created: function () {
    // Set Axios defaults
    //axios.defaults.headers.common['X-Cisco-Meraki-API-Key'] = payload;
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.vuetify-link {
  color: white;
}

</style>
