const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const google = require('../util/google');

var prefix = ayarlar.prefix;



exports.run = (client, message, args) => {
	let mesaj = args.slice(0).join(' ');
	if (mesaj.length < 1) return message.reply('**Ne aramam gerektiğini belirt**');
  google.search(message.content, message.channel && message.channel.nsfw)
    .then(({ card, results }) => {
      if (card) {
        message.reply(card);
      } else if (results.length) {
        const links = results.map((r) => r.link);
        message.reply(`${links[0]}

**AYRICA BAKINIZ:**
${links.slice(1, 3).map((l) => `<${l}>`).join('\n')}`.trim(), { bold: false });
      } else {
        message.reply('Sonuç bulunamadı');
      }
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ara',
  description: "Google'de istediğnizi aratır.",
  usage: 'ara <aranacak şey>'
};
