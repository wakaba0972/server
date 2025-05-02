/*
    這裡是tts指令
*/

const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');
const ttsClient = require('../../self_modules/Ttsclient');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stts')
		.setDescription('輸入文本，生成語音')
        .addStringOption(option =>
            option.setName('language')
                .setDescription('設定語言')
                .addChoices(
                    {name: 'zh', value: 'zh'},
                    {name : 'en', value: 'en'}
                )
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('text')
                .setDescription('輸入文本')
                .setRequired(true)
        ),
	async execute(interaction) {
        const text = interaction.options.getString('text');
        const language = interaction.options.getString('language');
        await interaction.deferReply();

        try{
            let client = new ttsClient(text, "", language);
            await client.init();
            const result = await client.tts();

            const fileName = Date.now();
            let buffer = Buffer.from(result.data);
            let filePath = `./wavs/${fileName}.wav`;
        
            fs.writeFileSync(filePath, buffer, (err) => {
                if (err) console.error('Error writing file:', err);
                else console.log('File written successfully:', filePath);
            });

            await interaction.editReply({
                files: [filePath]
            })
        } catch (error) {
            console.error('Error generating TTS:', error);
            await interaction.editReply({
                content: "發生錯誤，請稍後再試。"
            });
        }
    }
};