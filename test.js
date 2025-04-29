/*
    測試用程式
*/

const Topic = require('./self_modules/TopicUnit');

let topic = new Topic("user", "海綿寶寶的劇本");
topic.execute().then((result) => {
    console.log(result);
});