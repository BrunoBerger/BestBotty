const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Print help message'),
	async execute(interaction) {
		await interaction.reply({content:'Google it', ephemeral: true});
	},
};
