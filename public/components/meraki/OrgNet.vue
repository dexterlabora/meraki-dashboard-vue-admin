<template>
<div>
  <v-list> 
    <v-list-tile avatar>
      <v-list-tile-content>
        <v-select 
          v-bind:items="orgs"
          item-text="name"
          item-value="id"
          return-object
          v-model="org"
          label="Organizations"
        ></v-select>
      </v-list-tile-content>
    </v-list-tile>
      <v-list-tile avatar>
      <v-list-tile-content>
        <v-select
      v-bind:items="nets"
      item-text="name"
      item-value="id"
      return-object
      v-model="net"
      label="Networks"
    ></v-select>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>

</div>
</template>

<script>
// Import the EventBus
//import { EventBus } from '../../event-bus'

module.exports = {
  data: function() {
    return {
      nets: [],
      net: {},
      orgs: [],
      org: {}
    }
  },

  watch: {
    org: function (){
      console.log("org changed to: ", this.org);
      this.nets = []; // clear networks
      this.fetchNets();
      this.$eventHub.$emit('orgSelected', this.org);
      this.$store.state.org = this.org; // not best practice
    },
    net: function (){
      console.log("emitting networkSelected: ", this.net);
      this.$eventHub.$emit('netSelected', this.net);
      this.$store.state.net = this.net; // not best practice
    }

  },


  methods: {
    fetchOrgs: function(){
      var url = '/api/organizations';
      axios.get(url)
        .then(res => {
          this.orgs = res.data;
          this.org = this.orgs[0]; // set default org
          console.log('get request this.orgs',this.orgs);
        }, err => {
          console.log('error getting orgs',err);
        });
    },
    fetchNets: function(){
      console.log("fethNets for org: ",this.org)
      var url = '/api/organizations/'+this.org.id+'/networks';
      axios.get(url)
        .then(res => {
          this.nets = res.data;
          this.net = this.nets[0]; // set default net
          console.log('get request this.nets',this.nets);
        }, err => {
          console.log('error getting nets',err);
        });
    }
  },
    mounted: function () {
    this.fetchOrgs();
    this.$eventHub.$on('apiKeyUpdated', () => {
      console.log('orgnet apikey update event received');
      this.fetchOrgs();

    });
  }
};
</script>
<style>
.list {
    color: #0f0101;
}
</style>





