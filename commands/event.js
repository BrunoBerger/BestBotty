const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = require('../event-manager');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('event')
		.setDescription('Create a new Event'),
	async execute(interaction) {
		const row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('join')
					.setLabel('Join')
					.setStyle('PRIMARY'),
		);
		// const row2 = new MessageActionRow()
		// .addComponents(
		// 	new MessageSelectMenu()
		// 		.setCustomId('select')
		// 		.setPlaceholder('Nothing selected')
		// 		.addOptions([
		// 			{
		// 				label: 'Select me',
		// 				description: 'This is a description',
		// 				value: 'first_option',
		// 			},
		// 			{
		// 				label: 'You can select me too',
		// 				description: 'This is also a description',
		// 				value: 'second_option',
		// 			},
		// 		]),
		// );
		await interaction.reply({content: `Participants: ${data.counter}`, components: [row1], ephemeral: true});    

		const filter = (b_interaction) => b_interaction.message.interaction.id === interaction.id;
		const collector = interaction.channel.createMessageComponentCollector({filter, time: 10000, max: 2});

		let participants = [];
		let u_counter = 0;

		collector.on('collect', async i => {
			u_counter++;
			participants.push(i.user)

			await i.update({ content: `Participants: ${u_counter}`, components: [row1], ephemeral: true });

		});

		collector.on('end', async collected => {
			// console.log(`Collected ${collected.size} items`);
			// console.log(participants);
			await interaction.followUp({ content: `Participants: ${participants}`, ephemeral: true })
		});

	},
	
};


