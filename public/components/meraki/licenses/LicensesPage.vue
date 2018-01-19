<template>
<div>
<h2>Licenses</h2>



<v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <licenses-summary></licenses-summary>
      </v-flex>
      <v-flex xs12>
        <licenses-devices></licenses-devices>
    </v-layout>
</v-container>
</div>
</template>
<script>


module.exports = {
  components: {
    'licenses-summary': httpVueLoader('./LicensesSummary.vue'),
    'licenses-devices': httpVueLoader('./LicensesDevices.vue')
  },
	data: function() {
		return {
      
    };
  }
}

</script>
