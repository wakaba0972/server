/*
    將一個用戶的topic請求封裝成Topic物件
    這樣比較好管理
*/

const GroqClient = require('./GroqClient');

class Topic{
    constructor(user, topic){
        this.user = user;
        this.topic = topic;
    }

    async execute(){
        let groq_request = new GroqClient();
        let result = await groq_request.send(this.topic);
        return result;
    }
}


module.exports = Topic;