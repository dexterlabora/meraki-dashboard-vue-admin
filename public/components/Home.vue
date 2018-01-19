<template>
  <div>
    <h3>{{title}}</h3>
    
    <license></license>
  </div>
</template>

<script>

module.exports = {
  components: {
    'license': httpVueLoader('./meraki/licenses/LicensesSummary.vue')
  },
  data: function() {
    return {
      title: 'Meraki API Vue Demo App'
    }
  }
}
</script>
