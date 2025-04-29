const { SlashCommandBuilder } = require('discord.js');
const Topic = require('../../self_modules/TopicUnit');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('topic')
		.setDescription('to generate a script')
        .addStringOption(option =>
            option.setName('topic')
                .setDescription('topic')
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