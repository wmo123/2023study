
/**
 * 1. 再看一下http服务器概念，了解请求头，复习流的概念
 * 2. 知道http服务器和tcp服务器的关系
 *    req 和res都是从socket来的,先监听socket的data事件，然后等事件发生的时候进行解析，
 *    解析出请求头对象，再创建请求对象，再根据请求对象创建响应对象
 * 3.
 */
let http = require('node:http');
let server = http.createServer();
server.on('request', (req, res) => {
    res.end('\r\nok')
}).listen(8080, () => {
    console.log('server start')
})
// let server = http.createServer((req, res) => {
//     res.end('\r\nok')
// }).listen(8080, () => {
//     console.log('server start')
// })