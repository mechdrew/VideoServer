/*jslint browser: true, indent: 2, maxlen: 120, nomen: true, plusplus: true */
/*globals angular, console */
(function () {
  "use strict";

  var app = angular.module("FileUpload", []);
  var BYTE = 1,
      KILOBYTE = 1024,
      MEGABYTE = 1048576;

  function UploadCtrl(
    $scope
  ) {
    var transfers = {},
      x = 1;
    
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
        var transfer = createTransfer(file);
        transfer.reader.onloadend = function () {
          console.log(transfer.reader.result.byteLength);
        };
        transfer.reader.onload = function (event) {
          console.log(event.loaded);
        };
        transfer.reader.readAsArrayBuffer(file);
      });
      console.log($scope.file);
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
