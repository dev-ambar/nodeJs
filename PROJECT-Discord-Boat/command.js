const  { REST, Routes }  = require("discord.js")

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
   {
    name: 'create',
    description: 'create a short url for any given Url',
  },
];

const rest = new REST({ version: '10' }).setToken("TOKEN");
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands("1433511104356810812"), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


