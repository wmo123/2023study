```js
let EventEmitter = require('node:events');
let fs = require('node:fs');
class ReadStream extends EventEmitter {
    constructor(path, options) {
        super(path, options);

        this.path = path;
        this.mode = options.mode || 0o666;
        this.flags = options.flags || 'r';
        this.pos = this.start = options.start || 0;
        this.end = options.end;
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.encoding = options.encoding;
        this.buffer = Buffer.alloc(this.highWaterMark); // 勺子
        this.flowing = null;
        // 准备打开文件读取
        // 可以在on data事件中打开
        // 创建流一般需要打开不如提前打开
        this.open();

        // 如果有人给当前实例添加了新的监听函数
        // 会触发newListener事件
        this.on('newListener', (type, listener) => {
            if (type === 'data') {
                // 如果监听了data事件，流也没有暂停，流会【自动】切换到流动模式
                this.flowing = true;
                this.read();
            }
        })
    }

    read() {
        // 先判断文件是否打开
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this.read());
        }


        // 读取长度
        let howMuchToRead = this.end ? Math.min(this.end - this.pos + 1, this.highWaterMark) : this.highWaterMark;

        // this.buffer并不是缓存区
        // 勺子拿到后没地方放 放置的地方才是缓存区

        // bytesRead 实际读到字节数
        fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
            if (err) {
                if (this.autoClose) {
                    this.destory();
                    this.emit('error', err);
                }
            }

            if (bytesRead) {
                // 发送的数据的处理
                let data = this.buffer.subarray(0, bytesRead);
                this.pos += bytesRead;
                data = this.encoding ? data.toString(this.encoding) : data;
                this.emit('data', data);
                console.log('pos' + this.pos)
                if (this.end && this.pos > this.end) {
                    this.endFn();
                } else {
                    if (this.flowing) this.read();
                }
            } else {
                this.endFn();
            }
        })
    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                if (this.autoClose) {
                    this.destory();
                    return this.emit('error', err)
                }
            }

            this.fd = fd;
            this.emit('open');
        })
    }


    endFn() {
        this.emit('end');
        this.destory();
    }

    destory() {
        fs.close(this.fd, () => {
            this.emit('close');
        })
    }

    /**
     * 
     * @param {*} dest 目标流
     */
    pipe(dest) {

        this.on('data', (data) => {
            let flag = dest.write(data);
            if (!flag) {
                this.pause();
            }
        });

        dest.on('drain', () => {
            this.resume();
        })
    }

    pause() {
        this.flowing = false;
    };
    resume() {
        this.flowing = false;
        this.read();
    };
}

module.exports = ReadStream;
```

用例：

```js
/**
 * 流动模式 不走缓存
 */

const fs = require('node:fs');
let ReadStream = require('./9.ReadStream');

// let rs = fs.createReadStream('./1.txt', {
//     flags: 'r',
//     mode: 0o666,
//     start: 3,
//     end: 8, // 6个字节 包括结束位置
//     autoClose: true,
//     encoding: 'utf8',
//     highWaterMark: 3 // 最高水位线是3个字节
// });

let rs = new ReadStream('./1.txt', {
    flags: 'r',
    mode: 0o666,
    start: 3,
    end: 7, // 6个字节 包括结束位置
    autoClose: true,
    encoding: 'utf8',
    highWaterMark: 3 // 最高水位线是3个字节
});

rs.on('open', () => {
    console.log('open')
});
rs.on('data', (data) => {
    console.log(data)
});
rs.on('end', () => {
    console.log('end')
});
rs.on('close', () => {
    console.log('close')
});
rs.on('error', () => {
    console.log('error')
});
```

```js
let ReadStream = require('./9.ReadStream');
let WriteStream = require('./7.WriteStream');
let rs = new ReadStream('./1.txt', {
    // start: 3,
    // end: 8,
    highWaterMark: 3
});

let ws = new WriteStream('./2.txt', {
    highWaterMark: 3
});

rs.on('error', err => {
    console.log(err);
})

rs.pipe(ws);
```

