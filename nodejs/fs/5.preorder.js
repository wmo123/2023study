let fs = require('node:fs');
let path = require('node:path');

/**
 * 异步的先序深度优先遍历
 */

let preDeep = (dir) => {

}




/**
 * 广度先序优先遍历
 * @param {*} dir 
 */
let wide = (dir) => {
    let arr = [dir];

    while (arr.length) {
        let current = arr.shift();
        console.log(current);
        let stat = fs.statSync(current);
        if (stat.isDirectory()) {
            let files = fs.readdirSync(current);
            files.forEach(item => {
                arr.push(path.join(current, item));
            })
        }
    }

};
wide('a');