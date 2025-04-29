require('dotenv').config()
const Groq = require('groq-sdk')

const MODEL = 'llama3-8b-8192'
const PROMPT = "用英文生成一個海綿寶寶的劇本，角色從［海綿寶寶、派大星、蟹老闆、章魚哥、川普、小蝸、Elon Musk］中挑選2到3個角色，約400字，用json格式，內容只包含主題、角色台詞和中文翻譯"

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
                role: 'user', content: PROMPT + ",主題是" + message,
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