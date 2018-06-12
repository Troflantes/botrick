const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const economy = require('discord-eco');

var prefix = ayarlar.prefix;

var fortunes = [
  "evet",
  "hayır",
  "belki",
  "olabilir",
  "olmayabilir",
  "daha sonra tekrar sor"
];

exports.run = (client, message) => {
  var args = message.content.substring(prefix.length).split(" ");
  if (args[1]) message.channel.sendMessage("**" + fortunes[Math.floor(Math.random() * fortunes.length)] + "**");
  else message.channel.sendMessage('**Bir soru belirt!**');
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: '8ball',
  description: 'Sihirli 8ball sorduğunuz soruyu cevaplar.',
  usage: '8ball <soru>'
};
