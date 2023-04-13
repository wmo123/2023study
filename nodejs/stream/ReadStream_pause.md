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
        this.buffer = Buffer.alloc(this.highWaterMark); // 勺子 临时容器
        this.buffers = []; // 真正的缓存
        this.length = 0;


        this.flowing = null;
        // 准备打开文件读取
        // 可以在on data事件中打开
        // 创建流一般需要打开不如提前打开
        this.open();

        // 如果有人给当前实例添加了新的监听函数
        // 会触发newListener事件
        this.on('newListener', (type, listener) => {
            
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
            this.read(0); // 马上调用read方法，填充缓冲区
        })
    }

    read(n) {
        // console.log(n + '---n---')
        let ret;
        if( 0 < n < this.length ){
            // 缓存区数据足够用
            ret = Buffer.alloc(n);
            let index = 0;
            let b;
            while( undefined !== (b = this.buffers.shift())){
                // console.log(b)
                for(let i=0; i<b.length; i++){
                    ret[index++] = b[i];
                    if(index === n) {
                        // 当b没用完需要放回
                        b = b.subarray(i);
                        this.buffers.unshift(b);
                        this.length -= n;
                        break;
                    }
                }
            }
            
        }
        if(this.length < this.highWaterMark){
            fs.read(this.fd, this.buffer, 0, this.highWaterMark, null, (err, bytesRead) => {
                if(bytesRead){
                    let b = this.buffer.subarray(0, bytesRead); // 实际读到的字节
                    this.buffers.push(b);
                    // 缓冲区的数量加上读到的字节数
                    this.length += bytesRead;
                    // 通知外界可读了
                    this.emit('readable');
                }else {
                    this.emit('end');
                }
            })
        }
        return ret && this.encoding? ret.toString(this.encoding) : ret;
        
    }


   
}

module.exports = ReadStream;
```

用例：

```js
// 暂停模式

let fs = require('node:fs');
let ReadStream = require('./12.ReadStream_pause');

// let rs = fs.createReadStream('./1.txt', {
//     start: 0,
//     highWaterMark: 3
// });

let rs = new ReadStream('./1.txt', {
    highWaterMark: 3,
    encoding: 'utf8'
});


// 在真实情况下，可读流创建后会立刻进入暂停模式，会立刻填充缓存区，填充highWaterMark个字节
rs.on('readable', () => {
    console.log(rs.length) // 3
   let char = rs.read(1);
    console.log(char + 'char');
    // // 当消费掉1个字节后，缓存区变成2个字节了
     console.log(rs.length) // 2
    // setTimeout(() => {
    //     // 一旦发现缓存区字节数小于最高水位线，则会再读到最高水位线个字节填充到缓存区
    //     console.log(rs._readableState.length) // 5
    // }, 500)
})
```

