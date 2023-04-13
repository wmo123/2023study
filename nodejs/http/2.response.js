let http = require('node:http');

// 如何向客户端写响应
/**
 *  < HTTP/1.1 200 OK // 响应行
    < Date: Thu, 23 Mar 2023 06:45:06 GMT // 响应头
    < Connection: keep-alive
    < Keep-Alive: timeout=5
    < Content-Length: 9
    
    name=zfpx // 响应体
    Transfer-Encoding: chunked // 分块传输

 */
let server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html;chartset=utf8');
    console.log('headersSent1=' + res.headersSent) // 响应头是否已经发送过了
    // 在同一个方法里设置状态码，原因短语、响应头
    // writeHead一旦调用会立刻向客户端发送，而setHeader不会
    // 当调用writeHead或write时才会往客户端发响应头
    res.writeHead(200, 'success', {
        'Content-Type': 'text/html;chartset=utf8'
    });
    console.log('headersSent2=' + res.headersSent)
    // res.statusCode = 200; // 设置响应码
    // res.setHeader('Content-Type', 'text/html;chartset=utf8'); // 设置响应头
    // console.log(res.getHeader('Content-Type'));
    // res.removeHeader('Content-Type'); // 删除响应头
    // console.log(res.getHeader('Content-Type'));
    // res.write('\r\n hello');
    // res.write('world');
    res.end();
});

server.listen(8080, () => {
    console.log('server started')
})