const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit"">Send</button></form></body>');
        res.write("</html>");
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        const requestBody = [];
        req.on("data", (chunk) => {
            requestBody.push(chunk);
        });
        req.on("end", () => {
            const parsedBody = Buffer.concat(requestBody).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFileSync("message.txt", message);
        });
        res.writeHead(302, { Location: "/" });

        return res.end();
    }
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
    res.write("</html>");
    res.end();
});

server.listen(3001);
