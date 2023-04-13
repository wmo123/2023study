

/***
 * unicode符号范围               |      UTF-8编码方式
 * （十六进制）                  |          （二进制）
 * 0000 0000-0000 007F          |   0xxxxxx
 * 0000 0080-0000 07FF          |   110xxxxx 10xxxxxx
 * 0000 0800-0000 FFFF          |   1110xxxx 10xxxxxx 10xxxxxx
 * 0001 0000-0010 FFFF          |   11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
 * 
 * 
 * utf8 是Unicode的一种实现方式
 */

// 把unicode转为utf8
// 万 = 4E07
function transfer(number) {
    let arr = ['1110', '10', '10'];
    let str = number.toString(2);
    arr[2] += str.substring(str.length - 6);
    arr[1] += str.substring(str.length - 12, str.length - 6);
    arr[0] += str.substring(0, str.length - 12).padStart(4, '0'); // 最后一段可能不够四位用0补齐
    return arr.map(item => parseInt(item, 2).toString(16))
}

let r = transfer(0x4E07);
console.log(r);
// 转成2进制
let b = parseInt(0x4E07.toString(2));
console.log(b); // 100111000000111