require('dotenv').config();
const axios = require('axios');

class ttsClient {
    constructor(text, character, lang){
        this.text = text;
        this.character = character;
        this.lang = lang;
    }

    async gpt(){
        try {
            const response = await axios.get(`${process.env.TTS_SERVER_URL}/set_gpt_weights?weights_path=GPT_weights_v2/sponge01-e15.ckpt`);
            return response.data;
        } catch (error) {
            console.error('Error initializing TTS:', error);
            throw error;
        }
    }

    async sovits(){
        try {
            const response = await axios.get(`${process.env.TTS_SERVER_URL}/set_sovits_weights?weights_path=SoVITS_weights_v2/sponge01_e8_s216.pth`);
            return response.data;
        } catch (error) {
            console.error('Error initializing TTS:', error);
            throw error;
        }
    }

    async init(){
        await this.gpt();
        await this.sovits();
        return;
    }

    async tts(){
        try {
            const response = await axios.post(`${process.env.TTS_SERVER_URL}/tts`, {
                "text": this.text,
                "text_lang": this.lang,
                "ref_audio_path": "C:\\Users\\88690\\Desktop\\GPT-SoVITS-v4-20250422fix\\output\\denoise_opt\\We're not talking about this - Original vs MS Paint (mp3cut.net) (3).wav",
                "aux_ref_audio_paths": [],
                "prompt_lang": "en",
                "prompt_text": "Then you'll say we're not talking about this, or this, we're talking about thissss!",
                "top_k": 5,
                "top_p": 1,
                "temperature": 1,
                "text_split_method": "cut0",
                "batch_size": 1,
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

module.exports = ttsClient;