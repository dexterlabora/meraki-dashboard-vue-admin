<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
    <v-card class="lic-card">
      
      <v-card-title primary-title>
          <h3 class="headline mb-0">Welcome!</h3>
          <v-flex sm12>
            <p class="text-xs-right"><img height="50px" src="/assets/lego-head.jpeg"/></p>
          </v-flex>
          <v-flex sm12>
            <p class="text-xs-left">
              <p>Use this app to manage your network.</p>
              <p>This demo uses the Meraki Sandbox to instantly start exploring. </p> 
              <p>Use the Admin menu <i aria-hidden="true" class="material-icons icon">lock</i>  to use your own API key and turn on advanced features.</p>
              <p><a href="https://meraki.io">Meraki.io</a></p>
          </v-flex>
      </v-card-title>
    </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

module.exports = {
  data: function() {
    return {
      // placeholder
    }
  }
}
</script>
