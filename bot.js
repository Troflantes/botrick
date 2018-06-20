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

const ytdl = require("ytdl-core");
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./ayarlar');
const YouTube = require('simple-youtube-api');


const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Müzik kodları Aktif! iyi dinlemeler moruk'));

client.on('disconnect', () => console.log('bağlantı kesildi. tekrar bağlanmaya çalışıyorum.'));

client.on('reconnecting', () => console.log('Tekrar bağlanıyorum..'));

client.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'oynat') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
		const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('🚫 | Şuanda olduğunuz kanala girmek için gerekli izinlere sahip değilim.'));
		}
		if (!permissions.has('SPEAK')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('🚫 | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız.'));
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // ehehehehu videomuzu bulalım
				await handleVideo(video2, msg, voiceChannel, true); // ve gönderelim
			}
      return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setDescription(`✔ | Playlist ➢ **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.sendEmbed(new Discord.RichEmbed().setDescription(`
__**Şarkı seçimi:**__ \n 
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
 \n **lütfen 1-10 arasında bir rakam seciniz 30 saniye içinde liste iptal edilecektir.**
`)
          .setColor('RANDOM'));
					// en fazla 5 tane 
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
            return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription('❎ | Şarkı seçimi iptal edildi. '));
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
          return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('RANDOM')
          .setDescription(' ❎ | Herhangi bir arama sonucu elde edemedim.'));
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'geç') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
		if (!serverQueue) return msg.channel.send(' ❎ | Kuyruk boş olduğu için geçemiyorum. ');
		serverQueue.connection.dispatcher.end('Geç komudu kullanıldı.');
		return undefined;
	} else if (command === 'qweqweqwedosgjsdflkh242309857238957y239856239856012356') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Şu anda herhangi bir şarkı çalmıyorum.'));
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Kapat komutu kullanıldı!');
		return undefined;
	} else if (command === 'ses') {
    if (!message.guild) {
      if (!msg.guild) {
        const ozelmesajuyari = new Discord.RichEmbed()
        .setDescription(`You can not use commands here.`)
        return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
  .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
   .setDescription(' ❎ | Şu anda herhangi bir şarkı çalmıyorum.'));
    if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(` <:hope:412142425838977024> | Ses seviyesi: **${serverQueue.volume}**`));
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    (` <:hope:412142425838977024> | Yeni ses seviyesi: **${args[1]}**`));
      }
	} else if (command === 'şarkıadı') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`<:uyari:405162608631480320> | Şu anda hiçbir şey çalmıyorum.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('There is nothing playing.'));
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`🎶 Şu anda çalınan şarkı: **${serverQueue.songs[0].title}**`));
	} else if (command === 'kuyruk') {
		if (!serverQueue) return msg.channel.send('❎ | Şu anda hiçbir şey çalmıyorum. ');
		return msg.channel.send(`
__**Şarkı listesi:**__ \n 
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
\n **Şu anda çalınan:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'durdur') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setDescription('⏸ | Müzik durduruldu.')
      .setColor('RANDOM'));
		}
		return msg.channel.send('🚫 | Şu anda hiçbir şey çalmıyorum.');
	} else if (command === 'devamet') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('▶ | Müzik şu anda devam ediyor..'));
		}
		return msg.channel.send('❎ | Şu anda hiçbir şey çalmıyorum.');
  }

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: video.title, 
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
    else return msg.channel.sendEmbed(new Discord.RichEmbed()
  .setDescription(`✔ | **${song.title}** adlı şarkı başarıyla kuyruğa eklendi.`)
  .setColor('RANDOM'));
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()
  .setDescription(`🎶 Çalınan şarkı: **${song.title}**`)
  .setColor('RANDOM'));
}


client.on('message', (message) => {
    if (message.content.toLowerCase() === prefix + 'gir') {
        if (!message.guild) {
            const ozelmesajuyari = new Discord.RichEmbed()
            .setDescription(`You can not use commands here.`)
            return message.author.sendEmbed(ozelmesajuyari); }
        try 
    {
    message.member.voiceChannel.join();
     return message.channel.sendEmbed(new Discord.RichEmbed()
     .setDescription(' Başarılı ➢**' + message.member.voiceChannel+ '** adlı kanala giriş yaptım. ')
     .setColor('RANDOM'));
    }
    catch(e) 
    {
    return message.channel.sendEmbed(new Discord.RichEmbed()
    .setDescription('❎ | Lütfen öncelikle sesli bir kanala katılınız.')
    .setColor('RANDOM'));
    }
    }

    if (message.content.toLocaleLowerCase() === prefix + 'kapat') {
        if (!message.guild) {
            const ozelmesajuyari = new Discord.RichEmbed()
            .setDescription(`You can not use commands here.`)
            return message.author.sendEmbed(ozelmesajuyari); }
            try
            {
                message.member.voiceChannel.leave();
                return message.channel.sendEmbed(new Discord.RichEmbed()
                .setDescription(' Başarılı ➢**' + message.member.voiceChannel+ '** adlı kanaldan çıkış yaptım.')
                .setColor('RANDOM'));
               }
               catch(e) 
               {
               return message.channel.sendEmbed(new Discord.RichEmbed()
               .setDescription('<:uyari:405162608631480320> | Lütfen öncelikle sesli bir kanala katılınız.')
               .setColor('RANDOM'));
               }
              }
          if (message.content.toLowerCase() === prefix + 'kanal bilgi' ) {
            if (!message.guild) {
              const ozelmesajuyari = new Discord.RichEmbed()
              .setDescription(`You can not use commands here.`)
              return message.author.sendEmbed(ozelmesajuyari); }
            try 
            {
           message.channel.sendEmbed(new Discord.RichEmbed().addField(' __Sesli kanal bilgileri__', ` **•** kanal ismi: **${message.member.voiceChannel.name}** \n **•** MAX kullanıcı sayısı: **${message.member.voiceChannel.userLimit}** \n **•** Bit hızı: **${message.member.voiceChannel.bitrate}** \n **•** kanal ID: **${message.member.voiceChannelID} ** \n **•** Kanal pozisyonu **${message.member.voiceChannel.position}**`).setColor('RANDOM'));
              }
              catch(e)
              {
                message.channel.sendEmbed(new Discord.RichEmbed()
                .setDescription('❎ | Lütfen öncelikle sesli bir kanala katılınız.')
                .setColor('RANDOM'));
              };
            }           
        });

client.login(process.env.BOT_TOKEN);
