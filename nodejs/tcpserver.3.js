const net = require('node:net');
let clients = {};
let broadcast = (name, msg) => {
    Object.keys(clients).forEach(name => {
        if (name !== clients[name]) {
            clients[name].write(msg + '\r\n');
        }
    })
}
// 简单的聊天室 可以设置昵称 可以广播
const server = net.createServer((socket) => {
    // 连接欢迎语
    server.getConnections((err, count) => {
        socket.write('欢迎连接，当前在线人数有：' + count + '位\r\n')
    })
    socket.setEncoding('utf8')
    let username;
    socket.on('data', data => {
        data = data.replace(/\r\n/, '')
        // 设置昵称
        if (username) {
            broadcast(username, `${username}说：${data}`);
        } else {
            username = data;
            clients[username] = socket;
            // 广播
            broadcast(username, `欢迎${username}加入`);
        }
    });
    socket.on('end', () => {
        broadcast(username, `${username}离开广播室`);
        clients[username] && clients[username].destory();
        delete clients[username];
    })
});

server.listen(8080, () => {
    console.log('服务已启动', server.address())
})