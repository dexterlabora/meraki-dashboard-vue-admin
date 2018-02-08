<template>
<div>
    <h2>Traffic Analysis</h2>
    <!-- pie-chart :chart-data="pieChartData"></pie-chart -->
    <h3>{{net.name}}</h3>
    <div v-if="!loaded">Loading Data...</div>
    <v-card>
      <div v-if="loaded"></div>
      <v-card-title>Sent and Received</v-card-title>
      <!-- pie-chart  :datacollection="pieChartData"/-->
      <!--pie-chart :chart-data="sent" :chart-labels="applications" /-->
      <pie-chart :chart-data="pieChartData.datasets" :chart-labels="pieChartData.labels" />
    </v-card>
    
</div>
</template>

<script>
module.exports = {
  components: {
    //'traffic-charts': httpVueLoader('./TrafficCharts.vue'),
    //'list-item': httpVueLoader('components/list/ListItem.vue'),
    //'pie-chart': httpVueLoader('components/charts/PieChart.js'),
    'pie-chart': httpVueLoader('./PieChart.vue'),
    'line-chart': httpVueLoader('./LineChart.vue')
  },
  watch: {
      net: function () {
        console.log('net changed, fetching traffic');
        this.fetchTraffic();
      }
  },
  computed: {
    net () {
      console.log("state net: ",this.$store.state.net);
      return this.$store.state.net;
    },
    applications () {
      return this.traffic.map(t => t.application)
    },
    sent () {
      return this.traffic.map(t => t.sent)
    },
    recv () {
      return this.traffic.map(t => t.recv)
    },
    labels () {
      return this.traffic.map(t => {
        // extract details of Miscellaneous secure web
        if (t.application == "Miscellaneous secure web"){
          return t.destination
        }
        return t.application
      })
    },
    pieChartData () {
      return {
        labels: this.labels,
        
        datasets: [
          {
            label: 'Received',
            backgroundColor: '#337979',
            data: this.recv
          }, {
            label: 'Sent',
            backgroundColor: '#f87979',
            data: this.sent
          }
        ]
      }
    }
  },
  methods: {
    fetchTraffic () {
      if (!this.net.id){ return }
      var url = '/api/networks/'+this.net.id+'/traffic?timespan='+this.timespan;
        axios.get(url)
          .then(res => {
            this.traffic = res.data;
            console.log('fetching traffic',this.traffic);
            this.loaded = true;
          }, err => {
            console.log('error getting traffic',err);
            console.log(err.error)
          });
    }
  },
  created: function () {
    this.fetchTraffic();
  },
	data: function () {
		return {
      loaded: false, // state of API data
      traffic : [],
      timespan: '7200',
    };
  }
}
</script>
