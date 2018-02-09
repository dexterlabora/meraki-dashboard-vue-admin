# Meraki Dashboard Demo App

This web application demonstrates how you can use the Meraki API to deliver a custom portal for your network.



## Use Cases
* Customer Portal
* Technician Tool
* Service Desk

## Live Demo!
[Launch Demo](https://meraki-dashboard-vue-admin.herokuapp.com/#/)



## Installation
```
git clone <repo>
npm install
node server.js
```
**Application:**


http://localhost:8088

## Configuration
The application uses a Meraki sandbox API key as default. Update the `configs.js` file with your desired API key. The browser can still override this key when configured.

```
// configs.js

module.exports = 
{
    apiKey: 'cc54e1f9520616813f654aab8e0dfc614e33c179', // Meraki Sandbox
    apiUrl: 'https://api.meraki.com/api/v0'
}
```


## Develop

*This project is a work-in progress. New components are being built and a refactoring of existing components is to be expected.*

### Built with..
* NodeJS Express server
* Custom Meraki API handler
* Custom Meraki components
* [Vue.JS](https://vuejs.org/) frontend framework
* [Vuetify](https://vuetifyjs.com) components with Material Design








