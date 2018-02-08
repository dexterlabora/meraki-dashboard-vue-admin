<template>
<v-container fluid grid-list-md class="grey lighten-4">
  <v-layout row wrap>
      <v-flex xs12 md6>
        <welcome></welcome>
      </v-flex>
      <v-flex xs12 md6>
        <license></license>
      </v-flex>
  </v-layout>
</v-container>
</template>

<script>

module.exports = {
  components: {
    'license': httpVueLoader('./meraki/licenses/LicensesSummary.vue'),
    'welcome': httpVueLoader('./welcome.vue')
  },
  data: function() {
    return {
      title: 'Meraki API Vue Demo App'
    }
  }
}
</script>
