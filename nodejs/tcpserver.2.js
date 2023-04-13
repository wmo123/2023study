const net = require('node:net');
const path = require('node:path');
const ws = require('node:fs').createWriteStream(path.join(__dirname, './msg.text'));

let server = net.createServer((socket) => {
    socket.pause();
    setTimeout(() => {
        socket.pipe(ws);
    }, 10 * 1000)

});

server.listen(22, () => {
    console.log('服务已启动')
})