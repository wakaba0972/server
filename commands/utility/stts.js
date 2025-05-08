/*
    這裡是tts指令
*/

const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');
const { ttsClient } = require('../../self_modules/TtsClient');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stts')
		.setDescription('輸入文本，生成語音')
        .addStringOption(option =>
            option.setName('character')
                .setDescription('選擇角色')
                .addChoices(
                    {name: '章魚哥', value: 'squidward'},
                    {name: '派大星', value: 'star'},
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
        const character = interaction.options.getString('character');
        await interaction.deferReply();

        try{
            let client = new ttsClient(text, character);
            await client.init();
            const result = await client.tts();

            const fileName = Date.now();
            let buffer = Buffer.from(result.data);
            let filePath = `./results/wavs/${fileName}.wav`;
        
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