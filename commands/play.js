const fs = require('fs');
const { SlashCommandBuilder} = require('@discordjs/builders');
const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');

// const subscriptions = new Map<>();
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play youtube link someday')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('What you want to play')
				.setRequired(false)),

	async execute(interaction) {
		await interaction.defer();
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

		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Pause,
			},
		});
		player.on('error', error => {
			console.error('Error:', error.message, 'with track', error.resource.metadata.title);
		});

		const resource = createAudioResource('test.webm');
		player.play(resource);
		connection.subscribe(player);

		var embed = new MessageEmbed()
			.setColor('#006280')
			.setTitle(song.title)
			.setURL(song.url)
			.setDescription("Song added to queue (it wasn't)")
			.setThumbnail(song.thumbnail)
			.addFields(
				{ name: 'Duration', value: song.duration, inline: true },
				{ name: 'Baba', value: 'Booeyy', inline: true },
			) // more info here (duration, channel, queue-info, etc)
		await interaction.reply({ embeds: [embed] , ephemeral: false});
	},
};
