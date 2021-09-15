const fs = require('fs');
const { SlashCommandBuilder} = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play youtube link someday')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('What you want to play')
				.setRequired(false)),

	async execute(interaction) {
		const givenURL = "https://youtu.be/2rCP4CRRO7E";
		const songInfo = await ytdl.getInfo(givenURL);
		const song = {
			title: songInfo.videoDetails.title,
			url: songInfo.videoDetails.video_url,
			duration: songInfo.videoDetails.lengthSeconds,
			thumbnail: songInfo.videoDetails.thumbnails[0].url
		};
		console.log("Song Reqested:", song);

		const audio = ytdl(song.url, { quality: 'highestaudio' });
  		audio.pipe(fs.createWriteStream('test.webm'));
		  
		const connection = joinVoiceChannel({
			channelId: interaction.member.voice.channelId,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

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
