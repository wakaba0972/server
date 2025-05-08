/*
    這裡是topic指令
*/

const { SlashCommandBuilder } = require('discord.js');
const Topic = require('../../self_modules/TopicUnit');
const addCounterSafely  = require('../../self_modules/SafeCounter');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('topic')
		.setDescription('輸入一個主題，生成一個劇本')
        .addStringOption(option =>
            option.setName('topic')
                .setDescription('你要的主題')
                .setRequired(true)
        ),
	async execute(interaction) {
        const topic = interaction.options.getString('topic');
        await interaction.deferReply();

        try{
            const unit = new Topic("user", topic);
            let result = await unit.execute();

            // 讀取counter後，儲存至/results/scripts/
            const counter = await addCounterSafely();
            fs.writeFile(`./results/scripts/${counter}.json`, result, ()=>{});

            // 測試用回應
            await interaction.editReply({
                content: `你的編號為: ${counter}\n` + "\`\`\`json\n" + result + "\`\`\`"
            });
        } catch (error) {
            console.error('Error generating topic:', error);
            await interaction.editReply({
                content: "發生錯誤"
            });
        }
    }
};