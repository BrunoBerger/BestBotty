const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the full profile pic of any user')
		.addUserOption(option => option.setName('target')
			.setDescription('Select a user')),

	async execute(interaction) {
		const target = interaction.options.getUser('target') || interaction.user;

		// const avatarEmbed = new MessageEmbed()
    //     .setColor(0x333333)
    //     .setAuthor(target.username)
    //     .setImage(target.avatarURL);

		// text = target.username + "'s avatar:\n" + target.displayAvatarURL();

		await interaction.reply(target.displayAvatarURL());
	},
};
