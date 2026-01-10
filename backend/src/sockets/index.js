const WebSocket = require("ws");

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    console.log("WebSocket server initialized");

    wss.on("connection", (ws, req) => {
        console.log("WebSocket connected");

        if (ws.readyState === ws.OPEN) {
            ws.send("Connected to the WebSocket server");
        }

        ws.on("close", () => {
            console.log("WebSocket disconnected");
        });

        ws.on("error", (err) => {
            console.error("WebSocket error:", err);
        });
    });
};
