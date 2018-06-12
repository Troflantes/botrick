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
message.channel.send(`**Arkadaşlar, Bir YouTube kanala davet edildiniz. 
Bu kanalda Kendi oyunlarınızı ve kendi discord botunuzu kodlamayı öğreneceksiniz!... 
Ayrıca ufak tefek oyun videoları ve çekilişlerle eğlencenize eğlence katacağız :3**

Botumu sunucunuza ekleyin:

**dve??ekle**

Kanal Uzun link:
**https://www.youtube.com/channel/UCGk3rHjmDEExnent31KiT8g?view_as=subscriber**

Botumuzun destek sunucusu:
**dve??destek**

**Şimdiden tüm takipçilerimize teşekkürler.**
@everyone `)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'reklam',
  description: 'Bota reklam yaptırır.',
  usage: 'reklam'
};
