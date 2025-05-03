require('dotenv').config();
const axios = require('axios');

var NOW_CHARACTER = '';
module.exports.NOW_CHARACTER = NOW_CHARACTER;

class ttsClient {
    constructor(text, character){
        this.text = text;
        this.character = character;
        this.ref_audio_path;
        this.ref_text;
    }

    async gpt(gpt_model){
        try {
            const response = await axios.get(`${process.env.TTS_SERVER_URL}/set_gpt_weights?weights_path=GPT_weights_v2/${gpt_model}`);
            return response.data;
        } catch (error) {
            console.error('Error initializing TTS:', error);
            throw error;
        }
    }

    async sovits(sovits_model){
        try {
            const response = await axios.get(`${process.env.TTS_SERVER_URL}/set_sovits_weights?weights_path=SoVITS_weights_v2/${sovits_model}`);
            return response.data;
        } catch (error) {
            console.error('Error initializing TTS:', error);
            throw error;
        }
    }

    async init(character){
        if(character != NOW_CHARACTER){
            let gpt_model;
            let sovits_model;

            switch (character) {
                case 'squidward':
                default:
                    gpt_model = "xxx-e50.ckpt";
                    sovits_model = "xxx_e24_s792.pth";
                    this.ref_audio_path = "C:\\Users\\88690\\Desktop\\GPT-SoVITS-v4-20250422fix\\output\\uvr5_opt\\squidward02.zh\\main\\vocal_2025-05-03 15-19-46.mkv.reformatted.wav_10.wav";
                    this.ref_text = "要是你不想点餐的话，别站在那儿挡住我的光线。";
                }

            await this.gpt(gpt_model);
            await this.sovits(sovits_model);
            return;
        } 
    }

    async tts(){
        try {
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

module.exports.ttsClient = ttsClient;