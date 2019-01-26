module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	async execute(message, args) {
    const m = await message.reply("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.  API latency is ${Math.round(message.client.ping)}ms`);
  	},
};
