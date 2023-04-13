```js
let fs = require('node:fs');

let rs = fs.createReadStream('./1.txt', {
    highWaterMark: 1
});

/**
 * 立刻从文件中读取highWaterMark（3字节）的数据，读完之后填充缓冲区，然后出发发射readable
 */

rs.on('readable', () => {
    let char = rs.read(1);
    console.log(rs._readableState.length);
    console.log(char)
})
rs.on('end', () => {
    console.log('end')
})
```

