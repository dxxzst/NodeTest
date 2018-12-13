const server = require("./app/server/server");
const router = require("./app/router/router");
const requests = require("./app/data/request");

let handle = requests.get;

server.start(router.route, handle);