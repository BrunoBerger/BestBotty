const fs = require('fs');
const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play youtube link someday'),

	async execute(interaction) {
		const url = "https://youtu.be/2rCP4CRRO7E";
		const songInfo = await ytdl.getInfo(url);
		const song = {
			title: songInfo.videoDetails.title,
			url: songInfo.videoDetails.video_url,
			duration: songInfo.videoDetails.lengthSeconds,
			thumbnail: songInfo.videoDetails.thumbnails[0].url
		};
		console.log("Song Reqested", song);

		// ytdl(song.url)
  		// 	.pipe(fs.createWriteStream('video.mp4'));

		var embed = new MessageEmbed()
			.setColor('#e68447')
			.setTitle(song.title)
			.setURL(song.url)
			.setDescription('Mo info here')
			.setThumbnail(song.thumbnail)
			.addFields(
				{ name: 'Duration', value: song.duration, inline: true },
				{ name: 'Baba', value: 'Booeyy', inline: true },
			) // more info here (duration, channel, queue-info, etc)

		await interaction.reply({ embeds: [embed] , ephemeral: true});
	},
};
