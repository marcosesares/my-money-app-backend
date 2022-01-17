const port = 3003;
const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const allowCors = require("./cors");
const queryParser = require("express-query-int");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);
server.use(queryParser());

server.listen(process.env.PORT || port, function () {
  console.log(`listening on port ${process.env.PORT || port}...`);
});

export default server;
