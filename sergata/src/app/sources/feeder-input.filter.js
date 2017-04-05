(function() {
    'use strict';

    angular
        .module('app.core')
        .filter('prettyFeederInput', feederInput);

    function feederInput() {
        return function(input) {

          if (input.rtmp) {
            return input.name + ' (RTMP: ' + input.source + ')'
          } else if (input.asi) {
            return input.name + ' (ASI: ' + input.asi_port + ')'
          } else if (input.file) {
            return input.name + ' (FILE: ' + input.source + ')'
          } else if (input.udp) {
            return input.name + [" (UDP: ", 
                                  (input.multicast_ip === "0.0.0.0" || input.multicast_ip === "") ? "" : [input.multicast_ip, ":"].join(""), 
                                  input.port, 
                                  (input.ip === "" || input.ip === "127.0.0.1" || input.ip === "0.0.0.0") ? "" : ["@", input.ip].join(""),
                                  ')'].join("")
          } else {
            return ''
          }
        }
    }
})();
