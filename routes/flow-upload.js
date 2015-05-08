/*jslint indent: 2, maxlen: 120, node: true, nomen: true, plusplus: true */
/*globals */
(function () {
  "use strict";

  var _ = require("lodash"),
    flow = require("./flow-node.js")("../quarantine"),
    multipart = require("connect-multiparty"),
    multipartMiddleware = multipart();
  
  modules.export = function (app) {

    // Handle uploads through Flow.js
    app.post('/upload', multipartMiddleware, function(req, res) {
      flow.post(req, function(status, filename, original_filename, identifier) {
        res.status(status).send();
      });
    });
    
    
    app.options('/upload', function(req, res){
      res.status(200).send();
    });

    // Handle status checks on chunks through Flow.js
    app.get('/upload', function(req, res) {
      flow.get(req, function(status, filename, original_filename, identifier) {
        if (status === "found") {
          status = 200;
        } else {
          status = 204;
        }
        res.status(status).send();
      });
    });
    
    app.get('/download/:identifier', function(req, res) {
      flow.write(req.params.identifier, res);
    });
  }
}());
