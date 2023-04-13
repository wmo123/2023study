###### path

```js
let path = require('node:path');

console.log(path.join('a', 'b')); // a\b

// 从当前路径触发，解析出一个绝对路径
// ..代表上一级目录
// . 代表当前目录
// 字符串a代表当前目录下面的a目录
console.log(path.resolve('..', '.', 'a'))
console.log(__dirname)
console.log(__filename)

// 环境变量路径分隔符
// 在不同操作系统下，分隔符不同
console.log(path.delimiter); // windows ; mac/linux :
console.log(path.win32.delimiter);
console.log(path.posix.delimiter);
// 文件路径分割符
console.log(path.sep);
console.log(path.win32.sep);
console.log(path.posix.sep);

// path.relative 获得两个路径之间的相对路径

console.log(path.basename('aa.jpg')); // aa.jpg
console.log(path.basename('aa.jpg', '.jpg')); // aa
console.log(path.extname('aa.jpg'));// .jpg
```

