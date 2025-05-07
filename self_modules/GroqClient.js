/*
    GroqClient的類別，用來向Groq發送請求並獲取回應。
    之後會改成OpenAI，所以這裡也是測試用的
*/

require('dotenv').config()
const Groq = require('groq-sdk')

const MODEL = 'llama3-70b-8192'

const PROMPT = `
用中文生成一個海綿寶寶的劇本，角色從［海綿寶寶、派大星、蟹老闆、章魚哥、小蝸］中挑選2到3個角色，臺詞總共約400字，用json格式如下
\`\`\`json
{
  "topic": "主題名稱",
  "script": [
    {
      "character": "A",
      "text": "嗨",
    },
    {
      "character": "B",
      "text": "嗨",
    },
    {
      "character": "C",
      "text": "嗨",
    },
  ]
}
\`\`\`
`

const WARNING = "'''只要輸出json劇本就好，不要添加其他文字'''";

class GroqClient {
    constructor() {
        this.client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

  async send(message) {
    try {
        const chatCompletion = await this.client.chat.completions.create({
            messages: [{ 
                //role: 'system', content: prompt,
                role: 'user', content: `${PROMPT},主題是${message},${WARNING}`,
            }],
            model: MODEL,
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