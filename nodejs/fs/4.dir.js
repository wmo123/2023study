const fs = require('node:fs');

// 当创建目录的时候必须要求父目录是存在的
// fs.mkdir('a/b', (err) => {
//     console.log(err)
//     /**
//      * [Error: ENOENT: no such file or directory, mkdir 'D:\document\2023年\nodejs\fs\a\b'] {
//         errno: -4058,
//         code: 'ENOENT',
//         syscall: 'mkdir',
//         path: 'D:\\document\\2023年\\nodejs\\fs\\a\\b'
//         }
//      * 
//      *  */
// })


// 判断一个目录或文件是否存在

// fs.access('a', fs.constants.R_OK, (err) => {
//     console.log(err)
// })

/**
 * 递归异步创建目录
 */
const mkdirp = (dir) => {
    let paths = dir.split('/');
    let next = (index) => {
        if (index > paths.length) return;
        let path = paths.slice(0, index).join('/');
        fs.access(path, fs.constants.R_OK, (err) => {
            if (err) {
                fs.mkdir(path, 0o666, () => next(index + 1));
            } else {
                next(index + 1);
            }
        })
    };
    next(1);
}
// mkdirp('a/b/c');

/** 
 * 递归删除非空目录
 * 
 *  1.获取一个目录下所有的目录和文件
 *   fs.readDir()
 *  2.删除一个文件
 *   fs.unlink()
 *  3.删除一个空目录
 *   fs.rmdir()
 *  4. fs.statSync()
 *  5. stat.isDirectory() 是否是一个目录
 *  
 */

function rmdirp(dir) {
    let files = fs.readdirSync(dir);
    files.forEach(file => {
        let currentPath = `${dir}/${file}`;
        let current = fs.statSync(currentPath);
        if (current.isDirectory()) {
            rmdirp(currentPath)
        } else {
            fs.unlink(currentPath, (err) => {
                console.log(err);
            });
        }
    })
    fs.rmdirSync(dir);

}
rmdirp('a');