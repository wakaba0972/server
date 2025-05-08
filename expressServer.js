const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

// 測試用
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// scripts路由，用來回傳劇本
// 路由中的參數id是劇本的編號，也是檔名
// 呼叫此路由後會讀取/results/scripts/下名為{id}.json的檔案，並回傳
app.get('/scripts', (req, res) => {
    const id = req.query.id;
    const filePath = `./results/scripts/${id}.json`;

    if (!fs.existsSync(filePath)) {
        res.status(404).send('File not found');
        return;
    }

    fs.readFile(filePath, (err, data)=> {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// 啟動server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});