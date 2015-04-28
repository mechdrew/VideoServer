/*jslint indent: 2, maxlen: 120, node: true, nomen: true, plusplus: true */
/*globals */
(function () {
  "use strict";

  var fs = require("fs"),
    path = require("path");
  /*
  {
    name: (filename),
    size: (bytes)
  }

   */

  function uploadStart(data) {
    if (fs.exists(path.join("../videos/", data.name))) {

    }
  }

  function uploadChunk(data) {

  }

  function uploadEnd(data) {

  }

  module.exports = function (io) {
    io.on("upload_start", uploadStart);
    io.on("upload_chunk", uploadChunk);
    io.on("upload_end", uploadEnd);
  };
}());
