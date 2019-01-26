const ud = require('urban-dictionary');

module.exports = {
	name: 'urban',
  aliases: ['ud', 'urbandict', 'urbandictionary'],
	description: 'Looks up a word on urbandictionary.',
	args: true,
	usage: '<word to lookup>',
	execute(message, args) {
    const definition = args.join(" ");
    ud.term(definition).then((result) => {
      const entries = result.entries;
      let reply = `**Word:** ${entries[0].word}\n\n`;
      reply += `**Definiton:** ${entries[0].definition.replace(/((\[\s*)|(\s*\]))/g, '')}\n\n`;
      reply+= `**Example:** ${entries[0].example.replace(/((\[\s*)|(\s*\]))/g, '')}`;
      message.channel.send(reply);
    })
    .catch((error) => {
      console.error(`Error accessing urbandictionary for term: ${definition}..\n`, error);
      message.channel.send(`Sorry, I have encountered an error looking up that term..`);
    });
  },
};
