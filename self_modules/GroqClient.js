require('dotenv').config();
const Groq = require('groq-sdk');
const MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = '永遠以json格式輸出劇本';
const WARNING = "'''只要輸出json劇本就好，不要添加其他文字'''";
const USER_PROMPT = `
用中文生成一個海綿寶寶的劇本，角色從［海綿寶寶、派大星、蟹老闆、章魚哥、小蝸］中挑選2到3個角色，臺詞總共約500字，永遠以json格式輸出劇本，不能添加其他文字，json格式如下:
{
  "topic": "打招呼",
  "script": [
    {
      "character": "海綿寶寶",
      "text": "嗨",
    },
    {
      "character": "派大星",
      "text": "嗨",
    },
    {
      "character": "蟹老闆",
      "text": "嗨",
    },
  ]
}
`;

// 此類別用來向Groq發送請求並獲取回應
// 之後會改成OpenAI，所以這裡是測試用的
class GroqClient {

    // 建構子，讀取環境變數GROQ_API_KEY
    constructor() {
        this.client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    // 使用JSON mode發送請求
    async send(message) {
        try {
            const chatCompletion = await this.client.chat.completions.create({
                messages: [{
                    role: 'system', content: SYSTEM_PROMPT,
                    role: 'user', content: `${USER_PROMPT},主題是${message},${WARNING}`,
                }],
                model: MODEL,
                response_format: { "type": "json_object" },
            });

            return chatCompletion.choices[0].message.content;
        }
        catch (error) {
            console.error('Error generating chat completion:', error);
            throw error;
        }
    }
}

module.exports = GroqClient;