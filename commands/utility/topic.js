const { SlashCommandBuilder } = require('discord.js');
const Topic = require('.../self_modules/TopicUnit');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('topic')
		.setDescription('利用"/topic [主題]" 生成劇本')
        .addStringOption(option =>
            option.setName('Topic')
                .setDescription('請輸入主題')
                .setRequired(true)
        ),
	async execute(interaction) {
        const topic = interaction.options.getString('Topic');
        const unit = new Topic("user", topic);

        unit.execute().then((result) => {
            interaction.reply(result);
        }
        ).catch((error) => {
            console.error('Error:', error);
            interaction.reply('發生錯誤，請稍後再試。');
        });
    }
};