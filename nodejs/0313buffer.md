#### Buffer

1. 一些基本概念

- 计算机内部，所有信息都是二进制值；

- 每一个二进制位（bite）都有0和1两种状态，8个二进制位就可以组合出256种状态，这称为一个字节（byte）【即8个二进制位组成一个字节】；

- word【字符】 = 16bits = 2bytes

  - 字节是一个8位的存储单位；

  - 字符是一个文化的相关符号；

2. 单位

```js
8bite = 1字节

1024字节 = 1k

1024K=1M

1024M = 1G

1024G = 1T
// 传输基本单位是字节
```

3. JS的进制换算

   ```js
   let a = 0b10010; 18 // 二进制
   let b = 0O24; 20 // 八进制
   let c = 0X14; 20 // 十六进制
   // 任意进制转成十进制
   parseInt(数值，进制单位)
   console.log('0X14', 16) // 20
   // 如何把十进制装成任意进制
   20.toString(进制单位)
   ```

4. UTF-8

Unicode很长一段时间无法推广，知道互联网的出现，为解决Unicode如何在互联网上传输的问题，于是面向传输的众多UTF标准出现了。

> Universal CharacterSet（UCS）Transfer Format： UTF编码

- UTF-8就是在互联网上使用最广的一种Unicode实现方式

- 每次以8个位为单位【即1个字节】传输数据

- UTF-16每次16个位

- 最大特点：变长的编码方式；

- Unicode一个中文字符占2个字节，UTF-8每个中文字符占3个字节，一个英文是1个字节

  

#### Buffer概念

1. 什么是buffer？

- 缓存区buffer是暂时存放输入输出数据的一段内存；
- JS语言没有二进制数据类型，而在处理TCP和文件流的时候，必须处理二进制数据；
- Node提供了Buffer对象来提供对二进制数据的操作；
- 是一个表示固定内存分配的全局对象，也就是说要放到缓存区中的字节数需要提前确定；
- Buffer好比由一个8位字节元素组成的数组，可以有效在js中表示二进制数据；

```js
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
```

