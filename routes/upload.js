/*jslint indent: 2, maxlen: 120, node: true, nomen: true, plusplus: true */
/*globals */
(function () {
  "use strict";

  var _ = require("lodash"),
    fs = require("fs"),
    path = require("path");
    
  var KILOBYTE = 1024, 
    MEGABYTE = 1048576,
    QUARANTINE_PATH = "../quarantine/",
    VIDEO_PATH = "../videos/";
    
  var files = {};

  // Based on http://stackoverflow.com/a/2117523
  function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      return ((c === "x") ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  function createGUID() {
    var guid;
    // Attempt to ensure that GUID is actually unique.
    while (!guid || _.has(files, guid)) {
      guid = generateGUID();
    }
    return guid;
  }
  
  function deleteFile(file) {
    if (file.quarantine) {
      fs.unlink(path.join(QUARANTINE_PATH, file.name));
    }
    if (file.path) {
      fs.unlink(path.join(file.path));
    }
    delete files[file.guid];
  }
  
  function createFile(data) {
    var file = {
      guid: createGUID(),
      name: data.name,
      size: data.size,
      chunkSize: MEGABYTE,
      currentPosition: 0
    };
    files[file.guid] = file;
    return file;
  }
  
  function getFile(socket, data) {
    var file = _.findWhere(files, { name : data.name });
    if (file) {
      socket.emit("file_data", file);
    } else {
      socket.emit("file_does_not_exist", data);
    }
  }
  
  function startUpload(socket, data) {
    var existingFile = files[data.guid];
    if (existingFile) {
      
    } else {
      
    }
  }
  
  function uploadStart(socket, data) {
    var existingFile = _.findWhere(files, { name: data.name });
    if (existingFile) {
      if (data.overwrite) {
        deleteFile(existingFile);
      } else {
        socket.emit("file_exists", existingFile);
        return; 
      }
    }
    console.log(data);
    socket.emit("file_started", createFile(data));
    
  }

  function uploadChunk(socket, data) {
    if (files[data.guid] && (files[data.guid].position === data.position)) {
      files[data.guid].writer.write()
    }
  }

  function uploadEnd(socket, data) {

  }

  module.exports = function (io) {
    io.on("connection", function (socket) {
      socket.on("upload_start", function (data) {
        uploadStart(socket, data);
      });
      socket.on("upload_chunk", function (data) {
        uploadChunk(socket, data);
      });
      socket.on("upload_end", function (data) {
        uploadEnd(socket, data);
      });
      socket.on("get_file", function (data) {
        getFile(socket, data);
      });
    });
  };
}());
