<template>
<div>
  <h2>Traffic Analysis</h2>
  <!-- pie-chart :chart-data="pieChartData"></pie-chart -->
  <h3>{{net.name}}</h3>
  <v-flex xs4 md2>
    <v-select 
      v-bind:items="timespans"
      v-model="timespan"
      label="Timespan"
      return-object
    ></v-select>
  </v-flex>
  <v-container grid-list-md text-xs-center>
    <v-flex xs12 md6>
    <div v-if="!loaded">
        Loading Data...
      </div>
      <div v-if="loaded && traffic.length < 1">
        No data available. Ensure Traffic Analtyics is enabled for this network
      </div>
    </v-flex>
    <v-layout row wrap >
      <v-flex xs12 md6>
        <v-card>
          <v-card-title>Sent and Received</v-card-title>
          <v-card-text p1>
            <doughnut-chart 
            :chart-data="sentReceiveChartData.datasets" 
            :chart-labels="sentReceiveChartData.labels" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title>Flows and Clients</v-card-title>
          <v-card-text p1>
            <pie-chart 
            :chart-data="flowsClientsChartData.datasets" 
            :chart-labels="flowsClientsChartData.labels" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title>Clients</v-card-title>
          <v-card-text p1>
            <bar-chart 
            :chart-data="clientsChartData.datasets" 
            :chart-labels="clientsChartData.labels" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title>Bandwidth (ToDo)</v-card-title>
          <v-card-text p1>
            <line-chart 
            :chart-data="flowsClientsChartData.datasets" 
            :chart-labels="flowsClientsChartData.labels" />
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
    'pie-chart': httpVueLoader('components/charts/PieChart.vue'),
    'line-chart': httpVueLoader('components/charts/LineChart.vue'),
    'doughnut-chart': httpVueLoader('components/charts/DoughnutChart.vue'),
    'bar-chart': httpVueLoader('components/charts/BarChart.vue'),
  },
  watch: {
      net: function () {
        console.log('net changed, fetching traffic');
        this.fetchTraffic();
      },
      timespan: function () {
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
    sentReceiveChartData () {
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
    flowsClientsChartData () {
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
    },
    clientsChartData () {
      return {
        labels: this.labels,
        
        datasets: [
          {
            label: 'Clients',
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
      var url = '/api/networks/'+this.net.id+'/traffic?timespan='+this.timespan.value;
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
      timespan: {text: 'Day', value: 86400}, // default timespan
      timespans: [
        {text: '2 Hours', value: 7200},
        {text: 'Day', value: 86400},
        {text: 'Week', value: 604800},
        {text: 'Month', value: 2419200}
      ]
    };
  }
}
</script>
<style>
.chart {
  height: 80%
}
</style>