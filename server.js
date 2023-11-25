const http = require("http");

const server = http.createServer((req, res) => {
    const {headers, url, method} = request;
    console.log(headers, url, method);
    res.end();
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
