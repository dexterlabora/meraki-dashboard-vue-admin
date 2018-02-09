<template>
<v-container fluid grid-list-md>
  <v-layout row wrap>
      <v-flex xs12 md12>
        <welcome></welcome>
      </v-flex>
      <v-flex xs12 md12>
        <license></license>
      </v-flex>
  </v-layout>
</v-container>
</template>

<script>

module.exports = {
  components: {
    'license': httpVueLoader('./meraki/licenses/LicensesSummary.vue'),
    'welcome': httpVueLoader('./Welcome.vue')
  },
  data: function() {
    return {
      title: 'Meraki API Vue Demo App'
    }
  }
}
</script>
