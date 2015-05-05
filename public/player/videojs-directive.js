/*jslint browser: true, indent: 2, maxlen: 120, nomen: true, plusplus: true */
/*globals angular, videojs */
(function () {
  "use strict";

  function videojsDirective() {
    var player;

    function destroyPlayer() {
      videojs(player).dispose();
    }

    function postlink (scope, element, attributes) {
      player = element.find("video");
      element.$on("$destroy", destroyPlayer);
    }

    function prelink(scope, element, attributes) {
      
    }

    return {
      restrict: "E",
      link: {
        pre: prelink,
        post: postlink
      },
      scope: {},
      templateUrl: "/player/videojs-template.html"
    };
  }
  
  videojsDirective.$inject = [];

  angular
    .module("video-js", [])
    .directive("videojs", videojsDirective);
});
