const Discord = require('discord.js');

exports.run = (client, message) => {

  const embed = new Discord.RichEmbed()
    .setThumbnail("https://nest.com/support/images/misc-assets-icons/wi-fi-connection-issues.png")
    .setDescription("Pingim " + client.ping + "ms!")
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Botun pingini gösterir.',
  usage: 'ping'
};
