import http from 'http';
import fs from 'fs';

const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'content-type': 'text/html'});
    fs.createReadStream('index.html').pipe(res);
});

server.listen(port);
console.log(`server started on port ${port}`);
