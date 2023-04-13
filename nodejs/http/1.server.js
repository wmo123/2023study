// 如何创建一个http服务器
// http服务器是继承自tcp服务器， http协议是应用层协议，是基于tcp的
// socket 服务器和客户端的连接对象，双工流可读可写，可获取客户端传递的数据信息
// 对请求和响应进行包装
// req 流对象 可读流
// res 可写流 write
let http = require('node:http');
let url = require('node:url');

// callback 当客户端给服务端发消息时执行
// 发消息就等于客户端连接吗？ 不等于

let server = http.createServer();
// 当客户端连接上服务端后执行回调
server.on('connection', (socket) => {
    console.log(`客户端连接`)
});

// 服务器监听客户端的请求，当有请求到来的时候执行回调
server.on('request', (req, res) => {
    // console.log(req.method);
    // 第二个参数为true,那么query是对象
    // let urlObj = url.parse(req.url, true);
    let { pathname, query } = url.parse(req.url, true);
    console.log(pathname);
    console.log(query);
    // console.log(req.url);
    // console.log(req.headers);

    let result = [];
    req.on('data', (data) => {
        result.push(data)
    });

    req.on('end', () => {
        let r = Buffer.concat(result);
        // console.log(r.toString());

        res.end(r);
    })
})


server.on('close', (req, res) => {
    console.log(`服务器关闭`)
})
server.on('error', (err) => {
    console.log(`服务器错误：${err}`)
})

server.listen(8080, () => {
    console.log('server started at http://localhost:8080')
})

// http.createServer((req, res) => {

// }).listen(8080, () => {
//     console.log('server started at http://localhost:8080')
// })