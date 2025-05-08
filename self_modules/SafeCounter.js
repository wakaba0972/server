/*
    在./data/counter.json儲存一個持久化的變數counter
    為了避免同時讀寫檔案出現問題，每次使用時，用proper-lockfile將檔案鎖定
*/

const fs = require('fs/promises');
const lockfile = require('proper-lockfile');

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