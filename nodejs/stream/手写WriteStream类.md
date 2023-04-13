> #### 用例

```js
let fs = require('node:fs');
let WriteStream = require('./7.WriteStream');

// nodejs 方法
// let ws = fs.createWriteStream('./1.txt', {
//     highWaterMark: 3,
//     flags: 'w',
//     mode: 0o666,
//     start: 0,
//     encoding: 'utf8',
//     autoClose: true, // 当写完流之后自动关闭文件
// });

// 自定义方法

let ws = new WriteStream('./1.txt', {
    highWaterMark: 3,
    flags: 'w',
    mode: 0o666,
    start: 0,
    encoding: 'utf8',
    autoClose: true, // 当写完流之后自动关闭文件
})

let n = 9;

ws.on('error', (err) => {
    console.log(err)
});

/**
 * writable.write(chunk[, encoding][, callback])
 * 当流没有排空时，对 write() 的调用将缓冲 chunk，并返回 false。 
 * 一旦所有当前缓冲的块都被排空（操作系统接受交付），则将触发 'drain' 事件。
 */
let write = () => {
    let flag = true;
    while (flag && n > 0) {

        flag = ws.write(n + '');
        n--;
        console.log(flag);
    }
};
ws.on('drain', () => {
    console.log('drain');
    write();
    /**
     * true
        true
        false
        drain
        true
        true
        false
        drain
        true
        true
        false
        drain
     */
});
write();
```

> #### 实现

```js
/**
 * 手写可写流
 *
 */

let fs = require('node:fs');
let EventEmitter = require('node:events');

class WriteStream extends EventEmitter {
    constructor(path, options) {
        super(path, options);
        this.path = path;
        this.flags = options.flags || 'w';
        this.mode = options.mode || 0o666;
        this.start = options.start || 0;
        this.pos = this.start;
        this.encoding = options.encoding || 'utf8';
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark || 16 * 1024;
        this.writing = false; // 表示内部正在写入数据
        this.length = 0; //表示缓存区字节的长度
        this.buffers = []; //缓存区
        this.open();
    }
    open() {
        /**
         * fs.open(path[, flags[, mode]], callback(err,fd))
         */
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) { // 读取文件出错
                if (this.autoClose) {
                    this.destory();
                    return this.emit('error', err);
                }
            }
            this.fd = fd;
            this.emit('open');
        })
    }

    // 如果底层已经在写入数据的话，则必须把当前要写入的数据放到缓存区里
    write(chunk, encoding, cb) {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        // 缓存区长度加上当前写入的长度
        this.length += chunk.length;
        // 判断当前缓存区的大小是否小于最高水位线
        let ret = this.length < this.highWaterMark;

        if (this.writing) {

            // 表示底层已经在写入数据，则必须把当前要写入的数据放到缓存区里
            this.buffers.push({
                chunk,
                encoding,
                cb
            });

        } else {
            this.writing = true;
            // 直接调用底层方法，直接写入
            this._write(chunk, encoding, () => {
                this.clearBuffer()
            })
        }
        return ret;
    }

    clearBuffer() {
        let data = this.buffers.shift();
        if (data) {
            // 有数据接着写下一个
            this._write(data.chunk, data.encoding, () => {
                this.clearBuffer();
            })
        } else {
            this.writing = false;
            // 缓存区清空了
            this.emit('drain');

        }
    }

    _write(chunk, encoding, cb) {
        // 第一次调用write时，文件还没打开
        if (typeof this.fd !== 'number') {
            //----- 此处触发open事件是触发上面emit的open吗？-----
            return this.once('open', () => {
                this._write(chunk, encoding, cb);
            })
        };

        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, bytesWritten) => {
            if (err) {
                if (this.autoClose) {
                    this.destory();
                    this.emit('error', err);
                }
            }

            // 写入多少字节，缓存区需要减少多少字节
            this.length -= bytesWritten;

            this.pos += bytesWritten;
            cb && cb();
        })

    }
    destory() {
        fs.close(this.fd, () => {
            this.emit('close');
        })
    }
}

module.exports = WriteStream;
```

