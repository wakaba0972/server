require('dotenv').config();
const Groq = require('groq-sdk');
const MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = '永遠以json格式輸出劇本';
const WARNING = "'''只要輸出json劇本就好，不要添加其他文字'''";
const USER_PROMPT = `
生成一段無腦、白癡且無俚頭的海綿寶寶對話劇本，**內容一定要與給予的主題有關**，角色從［海綿寶寶、派大星、蟹老闆、章魚哥、珊迪］中挑選2到3個角色，個性要與角色相符，臺詞約10句左右，台詞中若出現"比基尼海底"替換為"比奇堡"，若出現"克拉斯蒂克拉布"替換為"蟹堡王"，若出現"克拉布肉餅漢堡"等，替換為"蟹堡"，永遠以json格式輸出劇本，不准添加其他文字，json格式如下:
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
            //chatCompletion.choices[0].message.content.topic = message; // 確保主題被包含在回應中
            return chatCompletion.choices[0].message.content;
        }
        catch (error) {
            console.error('Error generating chat completion:');
            throw error;
        }
    }
}

module.exports = GroqClient;