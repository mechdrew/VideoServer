/*jslint indent: 2, maxlen: 120, node: true, nomen: true, plusplus: true */
/*globals */
(function () {
  "use strict";

  var app,
    express = require("express"),
    io,
    path = require("path"),
    port = process.env.port || 3001,
    server;
    //upload;

  app = express();
  server = require("http").Server(app);
  server.listen(port);
  io = require("socket.io")(server);
  //upload = require("./routes/upload")(io);

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    console.log("hi");
  });

  app.use(express.static(path.join(__dirname, "/public")));
  
  app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });
}());
