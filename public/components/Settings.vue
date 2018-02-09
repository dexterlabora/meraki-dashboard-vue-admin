<template>
  <div class="text-xs-center">
    <v-menu
      offset-x
      :close-on-content-click="false"
      :nudge-width="200"
      v-model="menu"
    >     
      <v-btn icon dark slot="activator">
        <v-icon>lock</v-icon>
      </v-btn>

      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Demo User</v-list-tile-title>
              <v-list-tile-sub-title>Settings are NOT saved</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <!--v-btn
                icon
                :class="fav ? 'red--text' : ''"
                @click="fav = !fav"
              >
                <v-icon>favorite</v-icon>
              </v-btn-->
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-tile>
            <v-list-tile-sub-title>
              <v-text-field
              name="apikey"
              label="API KEY"
              id="apikey"
              v-model="form.apikey"
              ></v-text-field>
            </v-list-tile-sub-title>
          </v-list-tile>
         
          <v-list-tile>
            <v-list-tile-sub-title>
              <v-checkbox
                label="Admin Mode"
                v-model="adminMode"
              ></v-checkbox>
            </v-list-tile-sub-title>
          </v-list-tile>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" flat @click="saveSettings()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  module.exports = {
    data: function() {
		  return {
        adminMode: false,
        fav: true,
        menu: false,
        message: false,
        hints: true,
        form: {
          apikey: ''
        }
      }
    },
    watch: {
      adminMode: function () {
        return this.$store.state.adminMode;
      }
    },
    methods: {
      saveSettings () {
        console.log("settings ", this.form.apikey);
        //this.$store.state.apikey = this.form.apikey;
        this.menu = false
        this.$eventHub.$emit('apiKeyUpdated', this.form.apikey);
        //console.log('store apikey', this.$store.state.apikey);
        this.$store.state.adminMode = this.adminMode; // not best practice
      }
    }
  }
</script>