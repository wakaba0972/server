/* 
  Express伺服器的主程式
  之後會用來處理Unity端的請求
*/

const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('wavs'))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/scripts', (req, res) => {
    const id = req.query.id;
    const filePath = `./results/scripts/${id}.json`;

    fs.readFile(filePath, (err, data)=> {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});