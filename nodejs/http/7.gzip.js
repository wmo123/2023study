/**
 * 静态文件服务器
 * 1. 静态文件服务器
 * 2. 实现缓存
 * 3. 实现断点续传
 * 4. 实现压缩
 * 5. 实现命令行工具
 * 6. 实现配置，读取命令行的参数
 * 7. 加密和权限的功能
 */


// 用于实现压缩
console.log(process.cwd());
const { createGzip } = require('node:zlib');
const { pipeline } = require('node:stream');
const {
  createReadStream,
  createWriteStream
} = require('node:fs');

const gzip = createGzip();
const source = createReadStream('input.txt');
const destination = createWriteStream('input.txt.gz');

pipeline(source, gzip, destination, (err) => {
  if (err) {
    console.error('An error occurred:', err);
    process.exitCode = 1;
  }
});