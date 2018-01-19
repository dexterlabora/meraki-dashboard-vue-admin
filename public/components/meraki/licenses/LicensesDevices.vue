<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="dev-card">
        <v-card-title primary-title>
          <h2>Device Counts</h2>
        </v-card-title>
        <v-card-text>
          <v-list two-line subheader>
            <template v-for="(count, device) in licenses.licensedDeviceCounts">
              
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{device}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{count}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
    
</template>

<script>
  module.exports = {
    data: function () {
      return {
        licenses: {} 
      }
    },
    computed: {
      org () {
        return this.$store.state.org;
      }
    },
    watch: {
      org: function(){
        this.fetchLicenses();
      }
    },
    methods: {
      fetchLicenses: function () {
        if(!this.org){
          return;
        }
        var url = '/api/organizations/'+this.org.id+'/licenseState';
        axios.get(url)
          .then(res => {
            this.licenses = res.data;
            console.log('fetching licenses',this.licenses);
          }, err => {
            console.log('error getting licenses',err);
          });
      }
    },
    created: function () {
      this.fetchLicenses();
    },
  }

</script>
<style>
.dev-card {
  max-width: 400px;
}
</style>
