<template>
<div>
    <h2>Devices</h2>
    <devices-table></devices-table>
</div>
</template>

<script>
module.exports = {
  components: {
    'devices-table': httpVueLoader('./DevicesTable.vue')
  },
	data: function() {
		return {
      
    };
  }
}
</script>
