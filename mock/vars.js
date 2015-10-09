var fs = require('fs');
var os = require('os');

var ifaces = os.networkInterfaces();
var hostname = '127.0.0.1';
for (var i in ifaces) {
    var ip = findIPv4(ifaces[i]);
    if (ip) {
        hostname = ip;
        break;
    }
}

module.exports = {
    // ====== vars ======
    gitFamily: 'http://' + hostname + ':3000',
    gitVersion: 'assets',
    /**
     * requred by webpack
     */
    publicPath: '/',
    // gitFamily: 'https://g-assets.daily.taobao.net/platform/demo',
    // gitVersion: '0.1.0',
    // publicPath: 'https://g-assets.daily.taobao.net/platform/demo/0.1.0',
    devmode: true
};

function findIPv4(iface) {
    for (var i = 0; i < iface.length; i++) {
        if (iface[i].family == 'IPv4' && !iface[i].internal) {
            return iface[i].address;
        }
    }
}