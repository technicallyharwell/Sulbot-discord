const weather = require('weather-js');

module.exports = {
	name: 'weather',
	description: 'Look up the weather for a given zipcode.',
	args: true,
	usage: '<zipcode>',
	execute(message, args) {
    loc = args.join(" ");
    weather.find({search: loc, degreeType: 'F'}, function(err, result) {
      if(err) {
        console.error(`Error looking up weather for ${loc}..`, error);
        return message.channel.send(`Sorry, there was an error finding that location..`);
      }
      let reply = `Current weather for **${result[0].location.name}**:\n`;
      const tempC = (Number(result[0].current.temperature) - 32) * (5 / 9);
      reply += `**Temperature**: ${result[0].current.temperature} F  (${tempC.toFixed(1)} C)\n`;
      reply += `**Humidity**: ${result[0].current.humidity}%\n`;
      const feelsC = (Number(result[0].current.feelslike) - 32) * (5 / 9);
      reply += `**Feels like**: ${result[0].current.feelslike} F  (${feelsC.toFixed(1)} C)\n`;
      reply += `**Wind**: ${result[0].current.winddisplay}\n`;
      reply += `**Condition**: ${result[0].current.skytext}`;
      message.channel.send(reply);
    })
  	},
};
