<template>
<div>
    <h2>Traffic Analysis</h2>
    <traffic-charts></traffic-charts>
</div>
</template>

<script>
module.exports = {
  components: {
    'traffic-charts': httpVueLoader('./TrafficCharts.vue')
  },
	data: function() {
		return {
      
    };
  }
}
</script>
