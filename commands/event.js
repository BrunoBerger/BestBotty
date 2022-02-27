const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = require('../event-manager');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('event')
		.setDescription('Create a new Event')
		.addStringOption(option =>
			option.setName('description')
				.setDescription('What is your event?')
				.setRequired(false))
		.addIntegerOption(option =>
			option.setName('time')
				.setDescription('When is your event? (in ms)')
				.setRequired(false))
	,
	async execute(interaction) {
		const is_ephemeral = true;
		var row1 = new MessageActionRow()
			.addComponents(
				join_button = new MessageButton()
					.setCustomId('join')
					.setLabel('Join')
					.setStyle('PRIMARY'),
		);
		
		var event_form = {
			content: `Crazy Event`,
			components: [row1],
			ephemeral: is_ephemeral
		}
		await interaction.reply(event_form);

		const time = (interaction.options.getInteger('time') || 10) * 1000; 
		const filter = (b_interaction) => b_interaction.message.interaction.id === interaction.id;
		const collector = interaction.channel.createMessageComponentCollector({filter, time: time, max: 3});

		let participants = [];
		let u_counter = 0;
		// event_form.content = `Crazy Event\n${u_counter} joined`


		collector.on('collect', async i => {
			if ( participants.find(u => u.id === i.user.id) ) {
				await i.reply({ content: "You already joined", ephemeral: true })
			} 
			else {
				participants.push(i.user)
				u_counter++;
				event_form.content = `Crazy Event\n${u_counter} joined`
				await i.update(event_form);
			}
		});
		collector.on('end', async collected => {
			// console.log(`Collected ${collected.size} items`);
			event_form.components[0] = row1.setComponents(join_button.setDisabled(true));
			await interaction.editReply(event_form);
			await interaction.followUp({ content: `Event is starting: ${participants}`, ephemeral: is_ephemeral })
		});

	},

};
