module.exports = {
	name: 'say',
	description: 'Make me say whatever you tell me!',
	args: true,
	usage: '<text to say>',
	execute(message, args) {
    const sayMsg = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMsg);
  	},
};
