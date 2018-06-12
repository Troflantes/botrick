const Discord = require('discord.js');

exports.run = (client, message) => {

const embed = new Discord.RichEmbed()
  .addField("Davet Linki", "https://is.gd/ybHl0c");
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Botun davet linkini gönderir.',
  usage: 'davet'
};
