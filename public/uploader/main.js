/*jslint browser: true, indent: 2, maxlen: 120, nomen: true, plusplus: true */
/*globals angular, console, io */
(function () {
  "use strict";

  var app = angular.module("FileUpload", []);
  var BYTE = 1,
      KILOBYTE = 1024,
      MEGABYTE = 1048576;

  var socket = io();

  function UploadCtrl(
    $scope
  ) {
    var STATE = {
      STOP: "stop",
      PAUSE: "pause",
      START: "start"
    };
    var state = STATE.STOP;
 
    var transfer;
    
    /*$scope.$watch("files", function (newVal, oldVal) {
      
    });*/
    
    function startUpload(file) {
      /*if (transfer) {
        console.log("error: transfer in progress - %j", transfer);
        return;
      }*/
      socket.emit("upload_start", {
        name: file.name,
        size: file.size
      });

      /*transfer = {
        file: file,
        reader: new FileReader(),
        currentIndex: 0,
        chunkSize: MEGABYTE
      };*/
    }
    
    function readMegabyte(options) {
      var megaOffset = options.offset * MEGABYTE;
      return options.reader.readAsArrayBuffer(options.file.slice(megaOffset, megaOffset + MEGABYTE));
    }

    function createTransfer(file) {
      transfers[x] = {
        reader: new FileReader()
      };
      return transfers[x++];
    }

    $scope.upload = function () {
      _.each($scope.files, function (file) {
        /*var transfer = createTransfer(file);
        transfer.reader.onloadend = function (event) {
          console.log(event);
          console.log(transfer.reader.result.byteLength);
        };
        transfer.reader.readAsArrayBuffer(file);*/
        startUpload(file);
      });
    };
  }

  UploadCtrl.$inject = [
    "$scope"
  ];

  app.controller("UploadCtrl", UploadCtrl);
  
  function fileModel() {
    function link($scope, $element) {
      $element.bind("change", function (event) {
        $scope.$apply(function () {
          // Handle both single and multiselect.
          if (event.target.files.length > 0) {
            $scope.fileModel = event.target.files;
          } else {
            $scope.fileModel = event.target.files[0];
          }
        });
      });
    }

    return {
      scope: {
        fileModel: "="
      },
      link: link
    };
  }
  
  app.directive("fileModel", fileModel);
}());
