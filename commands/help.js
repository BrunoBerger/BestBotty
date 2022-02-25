const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Print help message'),
	async execute(interaction) {
		var commandList = interaction.client.commands
		// console.log(commandList)

		var embed = new MessageEmbed()
			.setColor('#e68447')
			.setTitle("List of commands")
			.setURL("https://github.com/BrunoBerger/js-bot")

		for (const [key, value] of commandList.entries()) {
			var descr = value.data.description || "No desc";
			embed.addField("/"+key, descr, false);
		}

		await interaction.reply({embeds: [embed], ephemeral: true});
	},
};
