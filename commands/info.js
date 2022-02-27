const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Print many information'),
	async execute(interaction) {
		var client = interaction.client;
		var uptime = new Date(client.uptime).toISOString().substr(11, 8);
		var embed = new MessageEmbed()
			.setColor('#e68447')
			.setTitle("Bot and server info")
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: 'Bot uptime:', value: uptime, inline: true },
				{ name: "Ping:", value: `${client.ws.ping} ms.` , inline: true },
				{ name: "Bot created at:", value: client.user.createdAt.toDateString(), inline: false },
				{ name: "Repo:", value: "https://github.com/BrunoBerger/BestBotty", inline: false}
			)
		await interaction.reply({ embeds: [embed] , ephemeral: false});
	},
};
