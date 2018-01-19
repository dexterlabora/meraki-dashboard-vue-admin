<template>
<div>
  <v-layout row>
    <v-snackbar
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :vertical="snackbar.mode === 'vertical'"
      v-model="snackbar.active"
      >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.active = false">Close</v-btn>
    </v-snackbar>

 
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list two-line subheader>
            <v-subheader>Wireless Networks</v-subheader>
            <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>SSID</v-list-tile-title>
                  <v-list-tile-sub-title>{{ssid.name}}</v-list-tile-sub-title>
                  <v-select 
                    v-bind:items="ssids"
                    item-text="name"
                    item-value="number"
                    return-object
                    v-model="ssid"
                    label="SSID"
                  ></v-select>
                </v-list-tile-content>
              </v-list-tile>
          </v-list>

          <v-list two-line subheader>
            <v-subheader>General</v-subheader>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>SSID Name</v-list-tile-title>
                <v-list-tile-sub-title>{{ssid.name}}</v-list-tile-sub-title>
                <v-text-field
                  v-model="ssid.name"
                  label="Name"
                  required
                ></v-text-field>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="ssid.enabled"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Enabled</v-list-tile-title>
                <v-list-tile-sub-title>Enable the wireless network</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Authentication</v-list-tile-title>
                <v-list-tile-sub-title>{{ssid.authMode}}</v-list-tile-sub-title>
                <v-select 
                  v-bind:items="ssidOptions.authMode"
                  return-object
                  v-model="ssid.authMode"
                  label="Authentication"
                ></v-select>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar v-if="ssid.authMode == 'psk'">
              <v-list-tile-content>
                <v-list-tile-title>Pre-shared Key</v-list-tile-title>
                <v-text-field
                      v-model="ssid.psk"
                      label="pre-shared key"
                    ></v-text-field>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Encryption</v-list-tile-title>
                <v-list-tile-sub-title>{{ssid.encryptionMode}}</v-list-tile-sub-title>
                <v-select 
                  v-bind:items="ssidOptions.encryptionMode"
                  return-object
                  v-model="ssid.encryptionMode"
                  label="Encryption"
                ></v-select>
              </v-list-tile-content>
            </v-list-tile>
            
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>WPA Encryption</v-list-tile-title>
                <v-list-tile-sub-title>{{ssid.wpaEncryptionMode}}</v-list-tile-sub-title>
                <v-select 
                  v-bind:items="ssidOptions.wpaEncryptionMode"
                  return-object
                  v-model="ssid.wpaEncryptionMode"
                  label="WPA Encryption"
                ></v-select>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-divider></v-divider>
          <v-list two-line subheader>
            <v-subheader>Splash Page</v-subheader>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Splash Method</v-list-tile-title>
                <v-select 
                  v-bind:items="ssidOptions.splashPage"
                  return-object
                  v-model="ssid.splashPage"
                  label="Method"
                ></v-select>
              </v-list-tile-content>      
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="ssid.walledGardenEnabled"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Walled Garden</v-list-tile-title>
                <v-list-tile-sub-title>Allow access to remote servers prior to authentication</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar v-if="ssid.walledGardenEnabled">
              <v-list-tile-content>
                <v-list-tile-title>Walled Garden Ranges</v-list-tile-title>
                <v-text-field
                      v-model="ssid.walledGardenRanges"
                      label="e.g. 192.168.1.1/24 192.168.37.10/32"
                    ></v-text-field>
              </v-list-tile-content>      
            </v-list-tile>

          <v-divider></v-divider>
          <v-list two-line subheader>
            <v-subheader>Radio Settings</v-subheader>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Minimum Bitrate</v-list-tile-title>
                <v-select 
                  v-bind:items="ssidOptions.minBitrate"
                  return-object
                  v-model="ssid.minBitrate"
                  label="Minimum bitrate"
                ></v-select>
              </v-list-tile-content>      
            </v-list-tile>

            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Band Selection</v-list-tile-title>
                <v-select 
                  v-bind:items="ssidOptions.bandSelection"
                  return-object
                  v-model="ssid.bandSelection"
                  label="Band Selection"
                ></v-select>
              </v-list-tile-content>      
            </v-list-tile>


          </v-list>
            
        </v-card>
        
      </v-flex>

  </v-layout>

       


</div>

</template>



<script>

module.exports = {
  data: function() {
    return {
      snackbar : {
        active: false,
        color: '',
        mode: '',
        text: 'Save changes?'
      },
        
      //net: {},
      ssid: {},
      ssids: [],
      ssidsData: [], // stores original data
      alert: {
        display: false,
        text: 'Updated'
      },
      ssidOptions: {
        authMode: ['open', 'psk', 'open-with-radius', '8021x-meraki', '8021x-radius'],
        encryptionMode: ['wpa', 'wep', 'wpa-eap'],
        psk: String,
        wpaEncryptionMode: ['WPA1 and WPA2', 'WPA2 only'],
        splashPage: ['None', 'Click-through splash page', 'Billing', 'Password-protected with Meraki RADIUS', 'Password-protected with custom RADIUS', 'Password-protected with Active Directory', 'Password-protected with LDAP', 'SMS authentication', 'Systems Manager Sentry', 'Facebook Wi-Fi'],
        minBitrate: [1, 2, 5.5, 6, 9, 11, 12, 18, 24, 36, 48, 54],
        bandSelection: ['Dual band operation', '5 GHz band only', 'Dual band operation with Band Steering']
      }
    }
  },
  computed:{
    net: function(){
      return this.$store.state.net;
    }
  },
  watch: {
    net: function () {
      this.fetchSsids();
    }
  },
  created: function () {
    /*
    EventBus.$on('networkSelected', net => {
      console.log("ssids: networkSelected event received ",net)
      this.net = net;
      this.fetchSsids();
      this.selected = this.ssids[0]; // set default ssid to first element
    });
    */
    this.fetchSsids();
    
  },

  methods: {
    formUpdated () {
      // check for user changes
      if(this.ssidsData !== this.ssids){
        this.snackbar.text = "Save updates?"
        this.snackbar.active = true;
      }
      
    },
    notifySuccess (verticalAlign, horizontalAlign) {
        this.$notifications.notify(
          {
            message: 'Updated!',
            icon: 'ti-check',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: 'success' //this.type[2]
          })
    },
    notifyError (verticalAlign, horizontalAlign, message) {
        this.$notifications.notify(
          {
            message: 'Error: '+message,
            icon: 'ti-close',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: 'danger' //this.type[4]
          })
    },

    onSelect: function(number){
      console.log("SSID selected "+number);
      this.ssid = this.ssids[number];
      this.formEnabled = true;
    },
    fetchSsids: function () {
      if(!this.net){
        return;
      }
      var url = '/api/networks/'+this.net.id+'/ssids';
        console.log('fetching ssids',this.ssids);
        axios.get(url)
          .then(res => {
            this.ssids = res.data;
            this.ssid = this.ssids[0]; // set default SSID
            this.ssidsData = this.ssids; // make a backup of data       
          }, err => {
            console.log('error getting ssids',err);
          });
    },

    displaySsid: function(ssid) {
      this.ssid = ssid;
      console.log("displaySsid",this.ssid);
    },

    updateSsid: function ($index) {
      console.log("updating SSID ", this.ssid);
      if (this.ssid) {

        //this.ssids.push(this.ssid);
        // this.ssid = { title: '', detail: '', date: '' };

        axios.put('/api/networks/'+this.net.id+'/ssids/'+this.ssid.number, this.ssid)
          .then(res => {
            //this.$set('ssids', ssids);
            this.ssids.push(this.ssid);
            console.log('SSID updated!', this.ssid);
            this.notifySuccess('top', 'left')
          }, err => {
            console.log('put request failed',err);
            this.notifyError('top', 'left',err.statusText)
          });

      }else {
        console.log("failed to update SSID", this.ssid.number);
      }
    }

  }



}
