let net = require('node:net');
let server = net.createServer({}, (socket) => {
    console.log('客户端已连接');
    console.log(socket.address());
    socket.on('data', (data) => {
        console.log('接收到客户端发来的数据是：%&  %&', data, 1);
        socket.write('服务端确认：' + data);
    })
    socket.on('end', () => {
        console.log('end%&  %&');
    })
});

server.listen(8080, () => {
    console.log(server.address())
    console.log('服务器启动成功')
})