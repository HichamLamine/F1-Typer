import http from 'http';
import fs from 'fs';

const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('Error: File not found');
        } else {
            res.write(data);
        }
        res.end();
    });
});

server.listen(port, (err) => {
    if (err) {
        console.log(`something went wrong: ${err}`);
    } else {
        console.log(`Server listening on port ${port}`);
    }
})
