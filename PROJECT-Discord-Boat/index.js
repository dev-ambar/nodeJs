const {Client,GatewayIntentBits}  = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]});


client.on("messageCreate",(message) => {

    if(message.author.bot) return ;
    message.reply({
        content:"Hi from Bot",
    });

    if(message.content.startsWith("create"))
    {
         const url = message.content.split("create")[1];
          console.log("url",url)
          message.reply("shorturl for your Url is : "+ url);
    }
});

client.on("interactionCreate",(interaction) => {
    if(!interaction.isChatInputCommand())
           return ;
    if(interaction.commandName === 'ping')
         interaction.reply("Pong!");
 
         
});


client.login("MTQzMzUxMTEwNDM1NjgxMDgxMg.G-wNM6.1fgK4U_uY4yDGfQ_qzhjBzXxKPZU0H5H32KTSw");