
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json")

var prefix = ayarlar.prefix;

client.on('ready', () => {
  console.log(`BOT: ${client.user.tag} aDI İLE GİRİŞ YAPTI!!!`);
});

client.on('message', message => {
	console.log(`LOG: M: ${message.content} Y: ${message.author.tag} S: ${message.guild.name}`);
  if (message.content === 'sa') {
    message.reply('as!');
  }
  if (message.content === 'osman abi') {
    message.reply('bekle güreş tutuyorum!');
  }
  if (message.content === 'naber') {
    message.reply('İyiyim senden naber!');
  }
  if (message.content === 'osman') {
    message.reply('');
  }
    if (message.content === 'osman abi bana merhaba de pls') {
    message.reply('merhaba');
  }
   if (message.content.toLowerCase() ==='temizle') {
    message.channel.bulkDelete(100);
    message.channel.send("100 adet mesaj silindi!");
  }
    if (message.content.toLowerCase() ==='reboot') {
    if (message.author.id !== ayarlar.sahip) {
      message.reply('Sadece $Leydi HavuçΩ 🚨#1746 yeniden başlatma yapabilir!!');
    } else {
      message.channel.send(`Ben hemen bi gideyim sonra hemen geleyim!`).then(message => {
      console.log(`BOT: Bot yeniden başlatılıyor...`);
      process.exit(0);
    })
   }
  }
});

client.login(ayarlar.token);
        