<template>
<div>
  <h2>Traffic Analysis</h2>
  <!-- pie-chart :chart-data="pieChartData"></pie-chart -->
  <h3>{{net.name}}</h3>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <div v-if="!loaded">Loading Data...</div>
        <v-card v-if="loaded">
          <v-card-title>Sent and Received</v-card-title>
          <v-card-text p1>
            <pie-chart 
            :chart-data="sentReceivePieChartData.datasets" 
            :chart-labels="sentReceivePieChartData.labels" />
          </v-card-text>
          
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
       <div v-if="!loaded">Loading Data...</div>
        <v-card v-if="loaded">
          <v-card-title>Flows and Clients</v-card-title>
          <v-card-text p1>
            <pie-chart 
            :chart-data="flowsClientsPieChartData.datasets" 
            :chart-labels="flowsClientsPieChartData.labels" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>





    
    
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
    flows () {
      return this.traffic.map(t => t.flows)
    },
    clients () {
      return this.traffic.map(t => t.numClients)
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
    sentReceivePieChartData () {
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
    },
    flowsClientsPieChartData () {
      return {
        labels: this.labels,
        
        datasets: [
          {
            label: 'Received',
            backgroundColor: '#3F7979',
            data: this.flows
          }, {
            label: 'Sent',
            backgroundColor: '#f27979',
            data: this.clients
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
<style>
.piechart {
  width: 
}
</style>