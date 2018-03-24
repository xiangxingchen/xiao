//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function (options) {
      console.log(this, options);
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})