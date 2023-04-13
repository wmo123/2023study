/**
 * linux经典的管道概念
 * 前者的输出是后者的输入
 */

let fs = require('node:fs');

let rs = fs.createReadStream('./1.txt', {
    highWaterMark: 3
});

let ws = fs.createWriteStream('./2.txt', {
    highWaterMark: 3
});

rs.pipe(ws);


// /**
//  *  当监听可读流data事件的时候会触发回调函数的执行
//  *  可以实现数据的生产者和消费者速度的均衡
//  *  tcp http 网络层
//  */

// rs.on('data', (data) => {
//     console.log(data);
//     let flag = ws.write(data);
//     if (!flag) {
//         rs.pause();
//     }
// })

// /**
//  *  监听可写流缓存区清空事件，当所有要写入的数据写入完成后，
//  *  接着恢复从可读流里读取并触发data事件.
//  */

// ws.on('drain', () => {
//     console.log('drain');
//     rs.resume();
// })