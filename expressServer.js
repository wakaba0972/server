/* 
  這裡是Express伺服器的主程式
  用來處理Unity端的請求
*/

const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('wavs'))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});