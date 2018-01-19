<template>
  <v-data-table
      v-bind:headers="headers"
      :items="devices"
      hide-actions
      class="elevation-1"
    >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.model }}</td> 
      <td class="text-xs-right">{{ props.item.lanIp }}</td>
      <td class="text-xs-right">{{ props.item.wan1ip }}</td>
      <td class="text-xs-right">{{ props.item.wan2ip }}</td> 
      <td class="text-xs-right">{{ props.item.serial }}</td>     
      <td class="text-xs-right">{{ props.item.mac }}</td>
      <td class="text-xs-right">{{ props.item.lat }}</td>
      <td class="text-xs-right">{{ props.item.lng }}</td>
      <td class="text-xs-right">{{ props.item.address }}</td>
      <td class="text-xs-right">{{ props.item.tags }}</td>
    </template>
  </v-data-table>
</template>

<script>
  module.exports = {
    data: function() {
		return {
            devices: [],

            headers: [
            {
                text: 'Name',
                align: 'left',
                value: 'name'
            },
            { text: 'Model', value: 'model' },
            { text: 'LAN IP', value: 'lanIp' },
            { text: 'WAN 1 IP', value: 'wan1Ip' },
            { text: 'WAN 2 IP', value: 'wan2Ip' },
            { text: 'Serial', value: 'serial' },
            { text: 'MAC', value: 'mac' },
            { text: 'LAT', value: 'lat' },
            { text: 'LNG', value: 'lng' },
            { text: 'Address', value: 'address' },
            { text: 'Tags', value: 'tags' }
            ]
        }
    },
    computed:{
      net () {
        console.log("state net: ",this.$store.state.net);
        return this.$store.state.net
      }
    },
    watch: {
      net: function () {
        this.fetchDevices();
      }
    },
    methods: {
      fetchDevices: function () {
        if(!this.net){
          return;
        }
        var url = '/api/networks/'+this.net.id+'/devices';
        axios.get(url)
          .then(res => {
            this.devices = res.data;
            console.log('fetching devices',this.ssids);
          }, err => {
            console.log('error getting devices',err);
          });

    },
    created: function () {
      this.fetchDevices();
    },
    
  }
}
</script>