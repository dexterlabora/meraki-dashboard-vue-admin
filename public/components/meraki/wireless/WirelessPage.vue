<template>
<div>
    <h2>Wireless</h2>
        <wireless-settings></wireless-settings>  
</div>
</template>
<script>


module.exports = {
  components: {
    'wireless-settings': httpVueLoader('./WirelessSettings.vue')
  },
	data: function() {
		return {
      
    };
  }
}

</script>
