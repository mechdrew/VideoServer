/*jslint browser: true, indent: 2, maxlen: 120, nomen: true, plusplus: true */
/*globals angular, console */
(function () {
  "use strict";

  function PlayerCtrl($scope) {
    
  }
  
  PlayerCtrl.$inject = [
    "$scope"
  ];

  angular
    .module("PlayerApp", ["video-js"])
    .controller("PlayerCtrl", PlayerCtrl);

});
