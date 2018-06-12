const Discord = require('discord.js');
const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;

exports.run = (bot, msg, args) => {
	    const question = args.join(' ');
    if (args.length < 1) {
        msg.reply('Bir işlem belirt');
} else {    let answer;
    try {
        answer = math.eval(question);
    } catch (err) {
        msg.reply(`hatalı işlem: ${err}`);
    }

    msg.delete();
	const embed = new Discord.RichEmbed()
	.addField("**İşlem**: ",`**${question}**`, true)
	.addField("**Sonuç**: ",`**${answer}**`, true)
	
	
    msg.channel.send(embed)
	}





};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'hesapla',
  description: 'Matematik işlemi yapar.',
  usage: 'hesapla <işlem>'
};
