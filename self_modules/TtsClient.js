require('dotenv').config();
const axios = require('axios');

// 當前的角色，用來判斷是否需要重新向TTS Server設定語音模型
var CURRENT_CHARACTER = '';
module.exports.CURRENT_CHARACTER = CURRENT_CHARACTER;

// 用來向TTS Server發送API的類別
// 這裡的TTS Server是開源專案GPT-SoVITS-v4，默認是跑在本地端
// 請使用該專案中的api_v2.py來啟動伺服器
class ttsClient {

    // 建構子，讀取台詞text和角色character
    // this.ref_audio_path和this.ref_text是用來設定參考音檔和參考台詞的
    // 這兩個參數會在init()中根據角色設定
    constructor(text, character){
        this.text = text;
        this.character = character;
        this.ref_audio_path;
        this.ref_text;
    }

    // 向TTS Server傳送設定GPT模型的請求
    // GPT模型的路徑默認儲存在GPT-SoVITS-v4/GPT_weights_v2/底下
    // 如果路徑不同，請自行更改
    // gpt_model是模型的檔名，他會在init()中被設定
    async gpt(gpt_model){
        try {
            const response = await axios.get(`${process.env.TTS_SERVER_URL}/set_gpt_weights?weights_path=GPT_weights_v2/${gpt_model}`);
            return response.data;
        } catch (error) {
            console.error('Error initializing TTS:', error);
            throw error;
        }
    }

    // 向TTS Server傳送設定SoVITS模型的請求
    // SoVITS模型的路徑默認儲存在GPT-SoVITS-v4/SoVITS_weights_v2/底下
    // 如果路徑不同，請自行更改
    // sovits_model是模型的檔名，他會在init()中被設定
    async sovits(sovits_model){
        try {
            const response = await axios.get(`${process.env.TTS_SERVER_URL}/set_sovits_weights?weights_path=SoVITS_weights_v2/${sovits_model}`);
            return response.data;
        } catch (error) {
            console.error('Error initializing TTS:', error);
            throw error;
        }
    }

    // 根據角色設定GPT、SoVITS模型和參考音檔和參考台詞
    // 如果設定的角色和CURRENT_CHARACTER相同，則跳過
    // GPT模型預設在GPT-SoVITS-v4/GPT_weights_v2/底下
    // SoVITS模型預設在GPT-SoVITS-v4/SoVITS_weights_v2/底下
    // 參考音檔預設在GPT-SoVITS-v4/ref_audios/底下
    // 參考台詞目前是寫死在程式碼的，之後可能會再修改^^
    async init(character){
        if(character != CURRENT_CHARACTER){
            let gpt_model;
            let sovits_model;

            switch (character) {
                case 'star':
                    gpt_model = "star03-e50.ckpt";
                    sovits_model = "star04_e25_s675.pth";
                    this.ref_audio_path = "C:\\Users\\88690\\Desktop\\GPT-SoVITS-v4-20250422fix\\ref_audios\\star_ref.wav";
                    this.ref_text = "啊，我本来要跟你说，我被球球到了，后来雪融化变成了水，我就喝下水了，现在好多了。";
                    break;
                    
                case 'squidward':
                default:
                    gpt_model = "xxx-e50.ckpt";
                    sovits_model = "xxx_e24_s792.pth";
                    this.ref_audio_path = "C:\\Users\\88690\\Desktop\\GPT-SoVITS-v4-20250422fix\\ref_audios\\squidward_ref.wav";
                    this.ref_text = "要是你不想点餐的话，别站在那儿挡住我的光线。";
                }

            await this.gpt(gpt_model);
            await this.sovits(sovits_model);
            return;
        } 
    }

    // 向TTS Server發送請求，生成語音
    // TTS Server的URL是由環境變數TTS_SERVER_URL指定的
    // 回傳的格式是arraybuffer
    async tts(){
        try {
            await this.init(this.character);
            const response = await axios.post(`${process.env.TTS_SERVER_URL}/tts`, {
                "text": this.text,
                "text_lang": "zh",
                "ref_audio_path": this.ref_audio_path,
                "aux_ref_audio_paths": [],
                "prompt_lang": "zh",
                "prompt_text": this.ref_text,
                "top_k": 5,
                "top_p": 1,
                "temperature": 1,
                "text_split_method": "cut0",
                "batch_size": 20,
                "batch_threshold": 0.75,
                "split_bucket": true,
                "speed_factor": 1,
                "fragment_interval": 0.3,
                "seed": -1,
                "media_type": "wav",
                "streaming_mode": false,
                "parallel_infer": true,
                "repetition_penalty": 1.35,
                "sample_steps": 32,
                "super_sampling": false
            },{
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