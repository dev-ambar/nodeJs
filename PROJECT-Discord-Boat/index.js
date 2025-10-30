const {Client,GatewayIntentBits}  = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]});


client.on("messageCreate",(message) => {

    if(message.author.bot) return ;
    message.reply({
        content:"Hi from Bot",
    });
});

client.login("MTQzMzUxMTEwNDM1NjgxMDgxMg.GKGcq1.BkqTUrNy5IOpG-R_enjwzRtla6XoOrCEPRmnwU");