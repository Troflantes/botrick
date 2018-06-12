const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');


var lele = ayarlar.prefix;

exports.run = (client, message) => {


      const embedede = new Discord.RichEmbed()
          .setDescription(`**Lucy**`) 
          .setThumbnail("https://vignette.wikia.nocookie.net/dont-starve-game/images/c/c2/Lucy_the_Axe.png/revision/latest?cb=20130625195158") 
          .setColor(0x00AE86) 
          .addField('Lakabı',`The Axe (Balta)`, true)
		  .addField('Yetenek',`
*Sonsuz dayanıklılık
*Dost tavsiyesi verir
		  `,true)
          .addField('Motto',`All work and no play makes me want to chop some trees. (Hep iş yapmak ve hiç oyun oynamamak bende ağaç kesme isteği uyandırıyor`, true)
          .addField('Dayanıklılık',`Sonsuz`, true)
          .addField('Yığın Haline...', `...Getirilemez`, true)
          .addField('Sözler',"https://is.gd/hVhFM1", true)


          
          message.channel.send(embedede); 

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'lucy',
  description: 'Lucy The Axe hakkında bilgi verir.',
  usage: 'lucy'
};
