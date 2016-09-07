'use strict';

const path = require('path');

module.exports = {

  development: {
    // Opens the url in the default browser
    open: '#',
    // Build status system notifications
    notifications: false,
    // Enable hot reloading server. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    host: '127.0.0.1',
    port: 3000,
    // Values can be 'react' or 'angular'
    mode: 'angular'
  },

  ekko: {
    host: '127.0.0.1',
    port: 9999,
    data: path.join(process.cwd(), '../data'),
    routes: path.join(process.cwd(), './routes.json')
  }

};
