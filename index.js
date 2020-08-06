const Discord = require("discord.js"); //Initialization
const client = new Discord.Client();

//Parameters
const botToken = process.env.TOKEN; //Bot token
const userID = process.env.USERID; //Person bot will be listening to messages from 
const chanList = process.env.CHANNELS; //Array

console.log(typeof chanList);

client.on("ready", () => {
  console.log("Bot has logged in");
  if(client.users.get(userID) != undefined){ //Prevent crashes from invalid userID
    client.users.get(userID).send("I AWAKEN. I can now send messages to multiple channels! Type !help for info!");
  }
  else{
    console.log("ERROR: User not found! Verify ID and try again");
  }
});

client.on("message", (message) => {
  if(message.author.id == userID && message.channel instanceof Discord.DMChannel){
    let command = "";
    if(message.content.startsWith("!") == true){
      command = getCommand(message.content);
      setCommand(command, message.content);
    }
  }
})

function getCommand(text){
  let newText = text.split(" ");
  return newText[0];
}

function setCommand(comm, fullMessage){
  if (comm == "!help"){
    return client.users.get(userID).send(makeHelpMessage());
  }
  for (x in chanList){
    if (comm == `!${chanList[x].name.toLowerCase()}`){
      return client.channels.get(chanList[x].id).send(fullMessage.slice(comm.length + 1));
    }
  }
  client.users.get(userID).send("Sorry, I don't understand you, type !help for the list of commands I can understand");
}

function makeHelpMessage(){
  let setHelpMessage = `
**-Base Commands-** These serve basic functions
* !help - Shows this help message
**-Channel Commands-** Use these before a message to specify the channel you want me to post in\n
`;
  for (x in chanList){
    setHelpMessage = setHelpMessage+`* !${chanList[x].name.toLowerCase()}\n`;
  }
  return setHelpMessage;
}

client.login(botToken);
