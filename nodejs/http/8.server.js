let http = require('node:http');
let fs = require('node:fs');
let path = require('node:path');
let url = require('node:url');
let promisify = require('node:util');

// 把一个异步方法转成一个返回promise的方法
let stat = promisify(fs.stat);

http.createServer(async (req, res) => {
    let { pathname } = url.parse(req.url); // /msg.txt
    let filepath = path.join(__dirname, pathname); 
    // D:\document\2023年\nodejs\http\msg.txt 文件的绝对路径
    try {
        let statObj = await stat(filepath); // 判断文件是否存在

    } catch(err){
        res.statusCode = 404;
        res.end();
    }
}).listen('8080')
