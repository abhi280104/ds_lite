const app = require("./app");
const http = require("http");
const wss = require("./sockets/index.js")
const db = require("./config/db.js")


const server = http.createServer(app);
wss(server);
server.listen(3000, () => {
    console.log("http+websocket Server running on port 3000");
});
