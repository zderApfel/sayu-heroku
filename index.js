
const Discord = require("discord.js"); //Initialization
const client = new Discord.Client();

//Parameters
const userID = process.env.userID; //Person bot will be listening to messages from


client.on("ready", () => {
  console.log("Bot has logged in");
  if(client.users.get(userID) != undefined){ //Prevent crash due to invalid UserID
    client.users.get(userID).send("I AWAKEN. Say what you want me to say. NOTE: I currently cannot send emojis, but hopefully I can in the future :)");
  }
  else{
    console.log("ERROR: User not found! Verify ID and try again");
  }
});

client.on("message", (message) => {
  let sendTo = client.channels.get(process.env.channelID);
  if(message.author.id == userID && message.channel instanceof Discord.DMChannel){
    sendTo.send(message.content);
  }
})

client.login(process.env.BOT_TOKEN); //Edit token in config.json

