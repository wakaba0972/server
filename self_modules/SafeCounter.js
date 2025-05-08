const fs = require('fs/promises');
const lockfile = require('proper-lockfile');

// 從/data/counter.json讀取持久化變數counter，將其值+1後寫回去，並回傳counter的值
// counter是用來記錄目前劇本的編號，並會用來作為劇本的檔名，儲存在/results/scripts/底下
// 為了避免同時讀寫檔案，每次呼叫此函數時，利用proper-lockfile將檔案鎖定
module.exports = async function addCounterSafely(file = './data/counter.json') {
    let release;
    try {
        release = await lockfile.lock(file);
        const data = await fs.readFile(file, 'utf-8');
        const jsonData = JSON.parse(data);
        jsonData.counter = (jsonData.counter || 0) + 1;
        await fs.writeFile(file, JSON.stringify(jsonData, null, 2));
        return jsonData.counter;
    } catch (err) {
        console.error('Error: /self_modules/SafeCounter.js: ', err);
    } finally {
        if (release) await release();
    }
}