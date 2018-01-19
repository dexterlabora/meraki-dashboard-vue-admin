<template>
  <v-layout>
    <v-flex xs6>
      <v-card>
        <v-card-title primary-title>
          <h3>All Networks</h3>
        </v-card-title>
        <v-list three-line>
          <template v-for="network in networks">
            
            <v-list-tile  v-bind:key="network.id" @click="" >
              <v-list-tile-content>
                <v-list-tile-title ><h3>{{network.name}}</h3></v-list-tile-title>
                <v-list-tile-sub-title ><strong>{{network.type}}</strong>    {{network.timeZone}}</v-list-tile-sub-title>
                <p>             
                  <strong>Tags: </strong>{{network.tags}}
                </p>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
    
</template>

<script>
  module.exports = {
    data: function () {
      return {
        networks: [] 
      }
    },
    computed: {
      org () {
        return this.$store.state.org;
      }
    },
    watch: {
      org: function(){
        this.fetchNetworks();
      }
    },
    methods: {
      fetchNetworks: function () {
        if(!this.org){
          return;
        }
        var url = '/api/organizations/'+this.org.id+'/networks';
        axios.get(url)
          .then(res => {
            this.networks = res.data;
            console.log('fetching networks',this.networks);
          }, err => {
            console.log('error getting networks',err);
          });
      }
    },
    created: function () {
      this.fetchNetworks();
      this.$eventHub.$on('netCreated', () => {
        this.fetchNetworks();
      });
    },
  }

</script>
<style>
.lic-card {
  max-width: 400px;
}
</style>
