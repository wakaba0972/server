/*
    測試用程式
*/
async function run(){
const importDynamic = new Function('modulePath', 'return import(modulePath)');

const { client } = await importDynamic('@gradio/client');

const response_0 = await fetch("https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav");
const exampleAudio = await response_0.blob();
						
//const response_1 = await fetch("undefined");
//const exampleFile = await response_1.blob();
const exampleFile = null;

const app = await client("http://localhost:9872/");
const result = await app.predict("/inference", [		
				"Hello!!", // string  in '需要合成的文本' Textbox component		
				"中文", // string  in '需要合成的文本的语种' Dropdown component
				exampleAudio, 	// blob in '主参考音频(请上传3~10秒内参考音频，超过会报错！)' Audio component
				exampleFile, 	// blob in '辅参考音频(可选多个，或不选)' File component		
				"Hello!!", // string  in '主参考音频的文本' Textbox component		
				"中文", // string  in '主参考音频的语种' Dropdown component		
				1, // number (numeric value between 1 and 100) in 'top_k' Slider component		
				0, // number (numeric value between 0 and 1) in 'top_p' Slider component		
				0, // number (numeric value between 0 and 1) in 'temperature' Slider component		
				"不切", // string  in '怎么切' Dropdown component		
				1, // number (numeric value between 1 and 200) in 'batch_size' Slider component		
				0.6, // number (numeric value between 0.6 and 1.65) in '语速' Slider component		
				true, // boolean  in '开启无参考文本模式。不填参考文本亦相当于开启。' Checkbox component		
				true, // boolean  in '数据分桶(并行推理时会降低一点计算量)' Checkbox component		
				0.01, // number (numeric value between 0.01 and 1) in '分段间隔(秒)' Slider component		
				3, // number  in '随机种子' Number component		
				true, // boolean  in '保持随机' Checkbox component		
				true, // boolean  in '并行推理' Checkbox component		
				0, // number (numeric value between 0 and 2) in '重复惩罚' Slider component		
				"4", // string  in '采样步数(仅对V3/4生效)' Radio component		
				true, // boolean  in '音频超采样(仅对V3生效))' Checkbox component
	]);

console.log(result.data);
}

run();