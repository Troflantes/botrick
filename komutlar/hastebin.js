const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const snekfetch = require('snekfetch');

var prefix = ayarlar.prefix;



exports.run = (client, message, args) => {
	if (!args.slice(0)
		.join(' ')) return message.channel.send('Lütfen bir mesaj belirtin. **Doğru kullanım: ' + prefix + 'hastebin <mesaj>**')

	snekfetch.post('https://hastebin.com/documents')
		.send(args.slice(0)
			.join(' '))
		.then(body => {
			message.channel.send("Hastebin'e yüklendi\nURL: https://hastebin.com/" + body.body.key);
		});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'hastebin',
  description: "Mesajınızı Hastebin'e yükler.",
  usage: 'hastebin <mesaj>'
};
