```js
/**
 * fs核心模块 读写文件
 */

let fs = require('node:fs');

// flag 对文件做何种操作

// fs.readFile('1.txt', { encoding: 'utf8', flag: 'r' }, (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)
//     }
// })
```

![image-20230324162951452](D:\document\2023年\nodejs\fs\image-20230324162951452.png)

```js

// fs.writeFile('./2.txt', 'data', {
//     encoding: 'utf8',
//     flag: 'a', // 追加
//     mode: 0x666, // linux的权限位
// }, (err) => {
//     if (err) {
//         console.log(err)
//     }
// })

// 追加文件
// fs.appendFile('./2.txt', 'data', (err) => {
//     if (err) {
//         console.log(err)
//     }
// })

/**
 * 他们都是把文件当成一个整体来操作
 * 当文件特别大的时候，大于内存时是无法执行这样的操作的
 * 我们需要精确控制读取的字节数
 */
/**
open(path: fs.PathLike, flags: fs.OpenMode | undefined, 
    mode: fs.Mode | null | undefined, 
    callback: (err: NodeJS.ErrnoException | null, fd: number) => void): void
 */
// fd: file discriptor 文件描述符
// 0 标准输入 1 标准输出  2 错误输出

fs.open('./1.txt', 'r+', 0o666, (err, fd) => {
    // console.log(fd)// 3

    // 读
    // let buff = Buffer.alloc(4);
    // 0 写入索引 3从文件中读取几个字节 0文件的读取位置
    // fs.read(fd, buff, 0, 3, 0, (err, bytesRead) => {
    //     console.log(buff.toString()) // 123
    // })
    // fs.read(fd, buff, 1, 3, 1, (err, bytesRead) => {
    //     console.log(buff.toString()) // 234
    // })

    //写
    // 0 读取buffer的偏移量 3读三个字节 3写入索引
    fs.write(fd, Buffer.from('珠峰'), 0, 3, 3, (err, written) => {
        console.log(err);
        console.log(written);
    })


})
```

