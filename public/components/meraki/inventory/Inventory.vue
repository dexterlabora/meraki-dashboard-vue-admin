<template>
<div>
  <h2>Inventory</h2>
  <v-card v-for="i in inventory">  
    <v-card-title primary-title>
        <b>{{i.model}}</b>
    </v-card-title>
    <v-card-text>
        <p><b>Serial:</b> {{i.serial}}</p>
        <p><b>MAC:</b> {{i.mac}} </p>
        <p><b>Public IP:</b> {{i.publicIp}}</p>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        inventory: []
      }
    },
    computed: {
      org () {
        return this.$store.state.org;
      }
    },
    watch: {
      org: function(){
        this.fetchInventory();
      }
    },
    methods: {
      fetchInventory: function () {
        if(!this.org){
          return;
        }
        var url = '/api/organizations/'+this.org.id+'/inventory';
        axios.get(url)
          .then(res => {
            this.inventory = res.data;
            console.log('fetching inventory',this.inventory);
          }, err => {
            console.log('error getting inventory',err);
          });
      }
    },
    created: function () {
      this.fetchInventory();
    },
  }

</script>
<style>

</style>
