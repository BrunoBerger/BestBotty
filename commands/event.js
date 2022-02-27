const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = require('../event-manager');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('event')
		.setDescription('Create a new Event'),
	async execute(interaction) {
		const is_ephemeral = true;
		const row1 = new MessageActionRow()
			.addComponents(
				join_button = new MessageButton()
					.setCustomId('join')
					.setLabel('Join')
					.setStyle('PRIMARY'),
		);
		await interaction.reply({content: `Crazy Event`, components: [row1], ephemeral: is_ephemeral});

		const filter = (b_interaction) => b_interaction.message.interaction.id === interaction.id;
		const collector = interaction.channel.createMessageComponentCollector({filter, time: 20000, max: 2});

		let participants = [];
		let u_counter = 0;

		collector.on('collect', async i => {
			u_counter++;
			participants.push(i.user)

			await i.update({ content: `Crazy Event\n${u_counter} joined`, components: [row1], ephemeral: is_ephemeral });

		});

		collector.on('end', async collected => {
			// console.log(`Collected ${collected.size} items`);
			// console.log(participants);
			row1.setComponents(join_button.setDisabled(true));
			await interaction.followUp({ content: `Event is starting: ${participants}`, ephemeral: is_ephemeral })
			await interaction.editReply({ content: `Crazy Event\n${u_counter} joined`, components: [row1], ephemeral: is_ephemeral });
		});

	},

};
