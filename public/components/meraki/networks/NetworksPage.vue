<template>
<div>
    <h2>Networks</h2>
    <v-btn fab fixed bottom right dark color="primary" :router="true" :to="{ name: 'createNetwork'}">
      <v-icon dark>add</v-icon>
    </v-btn>
    <network-list></network-list>

</div>
</template>

<script>
module.exports = {
  components: {
    'network-list': httpVueLoader('./NetworkList.vue'),
  },
	data: function() {
		return {
      
    };
  }
}
</script>
