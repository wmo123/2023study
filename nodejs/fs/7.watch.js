// 监控文件的变化
// 当文件发生变化后执行相应的回调

let fs = require('node:fs');

// stat 是一个对象 fs.Stat 对象
fs.watchFile('a.txt', (newStat, oldStat) => {
    console.log(Date.parse(newStat.ctime));
    console.log(Date.parse(oldStat.ctime))
    if (Date.parse(oldStat.ctime) === 0) {
        console.log('add')
    }
    if (Date.parse(newStat.ctime) > Date.parse(oldStat.ctime)) {
        console.log('edit')
    }
    if (Date.parse(newStat.ctime) === 0) {
        console.log('delete')
    }
})