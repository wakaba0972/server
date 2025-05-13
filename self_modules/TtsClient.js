require('dotenv').config();
const axios = require('axios');

// 用來向TTS Server發送API的類別
// 這裡的TTS Server是開源專案GPT-SoVITS-v4，默認是跑在本地端
// 請使用該專案中的api_v2.py來啟動伺服器
class ttsClient {

    // 建構子，讀取台詞text和角色character
    constructor(text, character){
        this.text = text;
        this.character = character;
    }

    // 向TTS Server發送請求，生成語音
    // TTS Server的URL是由環境變數TTS_SERVER_URL指定的
    // 回傳的格式是arraybuffer
    async ctts(){
        try {
            const response = await axios.get(`${process.env.TTS_SERVER_URL}/ctts?character=${this.character}&text=${this.text}`,{
                responseType: 'arraybuffer',
            });
            return response;
            
        } catch (error) {
            console.error('Error generating TTS:', error);
            throw error;
        }
    }
}

module.exports.ttsClient = ttsClient;