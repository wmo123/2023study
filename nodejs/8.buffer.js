// 定义buffer

// 表示分配一个长度为6个字节的Buffer
// 会把所有的字节设置为0
let buf1 = Buffer.alloc(6, 2);

// 分配一块没有初始化的内存
let buf2 = Buffer.allocUnsafe(6);

let buf3 = Buffer.from('珠峰');


// console.log(buf1);
// console.log(buf2);
// console.log(buf3);


/**
 * buffer中的一些方法
 * 
 */
let buf4 = Buffer.alloc(6);
// buf4.fill(3, 1, 3);
// console.log(buf4);

// 1写的字符 2填充的开始索引 3填充的字节长度 4编码
buf4.write('珠峰', 0, 3, 'utf8');
// console.log(buf4.toString());
buf4.write('峰', 3, 3, 'utf8');
// console.log(buf4.toString());


let buf5 = Buffer.alloc(6);
buf5.writeInt8(0, 0)
buf5.writeInt8(16, 1)
buf5.writeInt8(32, 2)


/**
 * string_decoder 
 * 解决乱码问题
 */
let buf9 = Buffer.from('珠峰培训');
let buf10 = buf9.slice(0, 5);
let buf11 = buf9.slice(5);

// console.log(buf10.toString()) // 珠�

const { StringDecoder } = require('string_decoder');
let sd = new StringDecoder();

// write 读取buffer内容，返回一个字符串
// write时会判断是不是一个字符，如果是则输出，不是则缓存在对象内部，等下次write时会把前面缓存的字符加到第二次write的buffer再进行判断
// console.log(sd.write(buf10)); // 珠
// console.log(sd.write(buf11)); // 峰培训


// Buffer.concat() 连接buffer

let buf12 = Buffer.from('珠');
let buf13 = Buffer.from('峰');
Buffer.concat2 = function (list, total = list.reduce((length, item) => length + item.lengh, 0)) {
    if (list.length === 1) {
        return list[0];
    }
    let result = Buffer.alloc(total);
    let index = 0;
    for (let buf of list) {
        for (let b of buf) {
            result[index++] = b;
        }
    }
    return result;
}
console.log(Buffer.concat2([buf12, buf13], 7))