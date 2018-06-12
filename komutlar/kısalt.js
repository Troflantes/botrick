const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const shorten = require('isgd');

var prefix = ayarlar.prefix;
 
exports.run = (client, message, args, tools) => {
 
  if (!args[0]) return message.channel.send('Kısaltmam için bir link gir.**Doğru kullanım : '+ prefix +'kısalt <link>**')
 

  if (!args[1]) { 
   
    shorten.shorten(args[0], function(res) {
      if (res.startsWith('Hata:')) return message.channel.send('Kısaltmam için bir link gir.**Doğru kullanım : '+ prefix +'kısalt <link>**');
     
      message.channel.send(`Kısaltıldı. Link:**<${res}>**`); 
   
    })
   
  } else { 
   
    shorten.custom(args[0], args[1], function(res) { 
     

      if (res.startsWith('Hata:')) return message.channel.send(`Kısaltıldı. Link:**${res}**`); 

     
      message.channel.send(`Kısaltıldı. Link:**<${res}>**`); 
     
     
    })
   
  }
 
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kısalt',
  description: 'Linkinizi kısaltır.',
  usage: 'kısalt <link>'
};