/*jslint browser: true, indent: 2, maxlen: 120, nomen: true, plusplus: true */
/*globals angular, console */
(function () {
  "use strict";

  var app = angular.module("FileUpload", []);

  function UploadCtrl(
    $scope
  ) {
    $scope.upload = function () {
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
