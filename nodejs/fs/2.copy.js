/**
 * 为了节约内存，读一点read写一点write
 * 异步实现读写，效率高
 */
let fs = require('node:fs');

const BUFFER_SIZE = 3; //缓存大小3个字节
function copy(src, target) {
    // 打开源文件，读取
    fs.open(src, 'r', 0o666, (err, readFd) => {
        // 打开目标文件，写入
        fs.open(target, 'w', 0o666, (err, writeFd) => {
            let buff = Buffer.alloc(BUFFER_SIZE)
            let next = () => {
                fs.read(BUFFER_SIZE, buff, 0, BUFFER_SIZE, null, (err, bytesRead, buffer) => {
                    if (bytesRead > 0) {
                        fs.write(writeFd, buff, 0, bytesRead, null, next);
                    }

                })
            };
            next();
        })
    })

}
copy('1.txt', '2.txt');