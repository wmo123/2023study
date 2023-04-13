let fs = require('node:fs');


/** 
 *  可写流 就是往里面写
 *  当往可写流里写数据的时候，不会立刻写入文件，
 *  而是先写入缓存区,缓存区大小就是highWaterMark，默认是16k，等缓存区满了之后再次真正写入文件里。
 * 
 */
let ws = fs.createWriteStream('./2.txt', {
    flag: 'w',
    mode: 0o666,
    start: 0,
    highWaterMark: 3

});

// 如果缓存区已满返回false；如果缓存区未满返回true  
// 如果能接着写返回true，不能接着写返回false
// 按理说如果返回了false就不能再往里面写了，但是如果真的往里面写了数据也不会丢失
// ，会缓存在内存里，等缓存区清空之后再从内存里读出来
let flag = ws.write('1');
console.log(flag)
flag = ws.write('2');
console.log(flag)
flag = ws.write('3');
console.log(flag)
flag = ws.write('4');

console.log(flag)