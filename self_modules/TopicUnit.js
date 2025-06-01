/*
    因為系統架構有變更，之後這裡可能會最做修改
*/

const GroqClient = require('./GroqClient');

class Topic{
    constructor(user, topic){
        this.user = user;
        this.topic = topic;
    }

    // 開始流水線
    async execute(){
        let groq_request = new GroqClient();
        let result = await groq_request.send(this.topic);
        result = JSON.parse(result);
        result['topic'] = this.topic;
        result = JSON.stringify(result, null, 2);
        return result;
    }
}


module.exports = Topic;