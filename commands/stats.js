module.exports = {
	name: 'stats',
	aliases: ['server', 'sinfo'],
	description: 'Server stats: name, total members, creation date',
	guildOnly: true,
	execute(message, args) {
    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nCreated on: ${message.guild.createdAt}`);
	},
};
