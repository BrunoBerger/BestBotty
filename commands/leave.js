const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');
const { guildId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('leave the current voice channel'),
	async execute(interaction) {
        const connection = getVoiceConnection(guildId);
        if (connection) {
            connection.destroy();
            await interaction.reply({content:'Left voice channel', ephemeral: true});
        } else {
            await interaction.reply({content:'No voice channel to leave', ephemeral: true});
        }
	},
};
