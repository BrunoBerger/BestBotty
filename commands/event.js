const { MessageActionRow, MessageButton, MessageSelectMenu  } = require('discord.js');
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
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
		);
		const row2 = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('select')
				.setPlaceholder('Nothing selected')
				.addOptions([
					{
						label: 'Select me',
						description: 'This is a description',
						value: 'first_option',
					},
					{
						label: 'You can select me too',
						description: 'This is also a description',
						value: 'second_option',
					},
				]),
		);
		// console.log("Interaction:", interaction);
		await interaction.reply({content: `Counter: ${data.counter}`, components: [row1, row2], ephemeral: true});    

		const filter = (b_interaction) => b_interaction.message.interaction.id === interaction.id;
		const collector = interaction.channel.createMessageComponentCollector({filter, time: 5000 });
		collector.on('collect', async i => {
			data.counter++;
			// console.log("ButtonInteraction:", i);
			await i.update({ content: `Counter: ${data.counter}`, components: [row1], ephemeral: true });

		});

		collector.on('end', async collected => {
			console.log(`Collected ${collected.size} items`);
		});

	},
	
};


