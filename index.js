// Load discord.js library
const Discord = require("discord.js");

// Create a Client for the bot to use
const Client = new Discord.Client();

// Load config.json file, which contains:
//  - token
//  - prefix
const config = require("./config.json");

console.log(`Starting up..`);

// Triggers if the bot starts and logs in successfully
Client.once("ready", () => {
  console.log(`Bot started; ${Client.users.size} users, in ${Client.channels.size} channels of ${Client.guilds.size} servers`);

  // Loop thru all users seen by the bot and log their username
  // setInterval (function (){
  //   var Count;
  //   for(Count in Client.users.array()) {
  //     var someUser = Client.users.array()[Count];
  //     console.log(`u/n: ${someUser.username}`);
  //   }
  // }, 10000);

  // Set "Playing..."
  Client.user.setActivity(`with 0s and 1s`);
});

// Triggers when joining a server
Client.on("guildCreate", guild => {
  console.log(`New server joined: ${guild.name} (id: ${guild.id}). This server has ${guild.memberCount} members!`);
  Client.user.setActivity(`beep boop`);
});

// Triggered when removed from a server
Client.on("guildDelete", guild => {
  console.log(`Bot has been removed from: ${guild.name} (id: ${guild.id})`);
});

// Triggered on every recvd message
Client.on("message", async message => {
  // Ignore if message if from another Bot
  if(message.author.bot) return;

  // Ignore if message does not begin with prefix defined in config.json
  if(!message.content.startsWith(config.prefix) return;

  // Separate command from arguments
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Latency between sending and editing a message; latency to API websocket server
  if(command === "ping") {
    // const m = await message.channel.send("Ping?");
    const m = await message.reply("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.  API latency is ${Math.round(Client.ping)}ms`);
  }

  // Say a user-defined message and delete the initiating command
  if(command === "say") {
    const sayMsg = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMsg);
  }

  // Minimum xp required for a user-specified level
  if(command === "xp") {
    if (isNaN(args[0])) {
        var commResp = 'Error - ' + args[0] + ' is not a number';
    }
    else {
        const levelArray = [ 0, 0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973,
                          4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406,
                          24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333,
                          111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599,
                          407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443,
                          1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294, 4385776,
                          4842295, 5346332, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431];
        var i;
        for (i = 1; i < 99; i++) {
            if (levelArray[i + 1] > args[0]) {
                break;
            }
        }
        // i holds the level determined
        var commResp = args[0] + ' experience occurs at level: ' + i;
        message.reply(commResp);
    }
  }

  // Minimum lvl required for a user-specified xp
  if(command === "lvl") {
    // determine the minimum xp required for the supplied level
    const levelArray = [ 0, 0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973,
                      4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406,
                      24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333,
                      111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599,
                      407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443,
                      1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294, 4385776,
                      4842295, 5346332, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431];
    if (levelArray[args[0]] >= 0 && args[0] > 0) {
      var commResp = 'The minimum exp for level ' + args[0] + ' is ' + levelArray[args[0]];
    }
    else {
      var commResp = 'Error - Could not find exp for level: ' + args[0];
    }
    message.reply(commResp);
  }

  // Difference in xp between 2 user-specified levels
  if(command === "xpdiff") {
    const levelArray = [ 0, 0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973,
                      4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406,
                      24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333,
                      111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599,
                      407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443,
                      1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294, 4385776,
                      4842295, 5346332, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431];
    if (args[0] < 1 || args[1] < 1 || args[0] > 99 || args[1] > 99) {
      var commResp = "Invalid argument - please enter numbers between 1 and 99";
    }
    else {
      var xpDifference = Math.abs(levelArray[args[0]] - levelArray[args[1]]);
      var commResp = "There is " + xpDifference + " experience between levels " + args[0] + " and " + args[1] + ".";
    }
    message.reply(commResp);
  }

  // The current weather conditions for a user-specified zip code
  if(command === "weather") {
    // use the zip code provided in args[0] to GET data about weather

    // use RESPONSE to generate:
      // name of city/location
      // current temperature in BOTH F and C
      // current weather conditions (sunny, cloudy, rainy, etc)

    // finally, send constructed message to the channel
  }

  else if(command === "stats") {
    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nCreated on: ${message.guild.createdAt}`);
  }



  // Exit message handling
});



Client.login(config.token);
