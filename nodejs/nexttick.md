nextTick 和setImmediate的区别和联系

- nextTick 把回调函数放在当前执行栈的尾部

- setImmediate把回调函数放在事件队列的尾部

```js
宏任务队列 setTimeOut fs.readFile()
微任务队列 process.nextTick() promise

```

