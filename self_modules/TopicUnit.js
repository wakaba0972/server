/*
    將一個用戶的topic指令封裝成Topic Unit物件
    為啥? 因為這個topic要先送給LLM, 再送給TTS, 最後送給Unity
    封裝成一個class這樣比較好管理
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
        return result;
    }
}


module.exports = Topic;