const { SlashCommandBuilder } = require('discord.js');
const Topic = require('../../self_modules/TopicUnit');

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
        const unit = new Topic("user", topic);

        unit.execute().then((result) => {
            interaction.reply(result);
        }
        ).catch((error) => {
            console.error('Error:', error);
            interaction.reply('error');
        });
    }
};