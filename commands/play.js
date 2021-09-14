const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play youtube link someday'),
	async execute(interaction) {
		console.log("Song Reqested");
		var embed = new MessageEmbed()
			.setColor('#e68447')
			.setTitle('Song Name')
			.setURL("https://youtu.be/2rCP4CRRO7E")
			.setDescription('It do be like that')
			// .setThumbnail('https://i.imgur.com/AfFp7pu.png') // youtube thumbnail here
			// .addFields(
			// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
			// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
			// ) // song info here (duration, channel, queue-info, etc)
		await interaction.reply({ embeds: [embed] });
	},
};
