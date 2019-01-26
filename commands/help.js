const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push('My commands are:');
      data.push(commands.map(command => command.name).join(', '));
      data.push(`\nUse \`${prefix}help <command name>\` for help with a specific command.`);

      return message.author.send(data, { split: true})
          .then(() => {
            if (message.channel.type === 'dm') return;
            message.reply('I just slid in your DMs with a list of all my commands.');
          })
          .catch(error => {
            console.error(`Error sending help DM to ${message.author.tag}..\n`, error);
            message.reply('I could not DM you!  Do you have DMs disabled?');
          });
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply('That is not a valid command!');
    }

    data.push(`*Name:* ${command.name}`);

    if (command.aliases) data.push(`*Aliases:* ${command.aliases.join(', ')}`);
    if (command.description) data.push(`*Description:* ${command.description}`);
    if (command.usage) data.push(`*Usage:* ${prefix}${command.name} ${command.usage}`);

    data.push(`*Cooldown:* ${command.cooldown || 3} second(s)`);

    message.channel.send(data, {split: true});
	},
};
