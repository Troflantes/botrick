console.log("[App] Başlatılıyor...");
const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client({fetchAllMembers:true});
const economy = require('discord-eco');
const ayarlar = require('./ayarlar.json');
const ownerID = '331846231514939392'
const chalk = require('chalk');
const botconfig = require("./botconfig");
const ytdl = require("ytdl-core");
const request = require("superagent")
const getYoutubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const mysql = require("mysql");
const weather = require('weather-js');
const YoutubeDL = require('youtube-dl');
const async = require("async-mysql");
const embed = new Discord.RichEmbed();
const ffmpeg = require("ffmpeg");
const yt = require('ytdl-core');
const tokens = require('./tokens.json');
const modRole = 'asistanadmin';
const fs = require('fs');
const snekfetch = require('snekfetch');
const inspect = require('util');
const moment = require('moment');
const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));
require('./util/eventLoader')(client);
let xp = require("./xp.json");
let purple = botconfig.purple;
const userData = JSON.parse(fs.readFileSync('Storage/userData.json', "utf8"));

var prefix = ayarlar.prefix;




const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};




client.on('message', message => {
	/**
	message.member.roles.find("name", "abe")
	if(message.content.includes('abe')){
		
		var kanal = message.guild.channels.find('name', 'uyarı')
		var heheytşeş = new Discord.RichEmbed()
			.addField("Suçlu", `${message.author}`)
			.addField("Mesajı", `${message.content}`)
			
		if (message.author.id === "358299380182286336" || message.author.id === "449496747488837634" || message.author.id === "450930144337461248" || message.author.id === "331846231514939392") {
			
			return;
			
		} else if (!kanal){

			message.delete()
			message.reply('neden küfür ediyorsun')
			message.guild.channels.find('name', 'xxwarningxx').send(heheytşeş)

		}else {
			message.delete()
			message.reply('neden küfür ediyorsun')
			kanal.send(heheytşeş)
		}
	}
**/


	if (message.author.id === client.user.id) return;
	  console.log(`LOG: S: ${message.guild.name} M: ${message.content} Y: ${message.author.tag}`);

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("SEVİYE ATLADIN!")
    .setColor(purple)
    .addField("Şuanki seviyen:", curlvl + 1);

    //////message.channel.send(lvlup).then(msg => {msg.delete(5000)});
}
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });


  
    if (message.content === `${prefix}övgü`) {
      if (message.member.roles.find("name", "övgü")) {
        message.reply('**Hay aslanım benim sen her şeyi becerirsin kendine güven aslanım benim! **')
      } else {
        message.reply("**Övgü Komutu** eşyasını satın alman lazım")
      }
    }

	
  if (message.content.toLowerCase() === 'sa') {

	message.reply('Aleyküm selam, hoş geldin ^^');
		}
	
	  if (message.content.toLowerCase() === 'naber') {
		  message.reply('iyidir senden naber');
	  }
	  	  if (message.content.toLowerCase() === 'woodie') {
		  message.reply('konuşmayı kes ve bana kemirmem için **odun** getir hemen!!');
    }
    

    if (!userData[message.author.id]) userData[message.author.id] = {
      messagesSent: 0
    }
    userData[message.author.id].messagesSent++;
  
    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
      if (err) console.error(err)
    });
    
});








client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

//Bot login.
bot.login(process.env.BOT_TOKEN).catch((err) => console.log(`[Client] Bağlantı başarısız: ${err.message}`))
//Saves endless looking around if there is an Uncaught Promise Error.
process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
client.login(process.env.BOT_TOKEN);
