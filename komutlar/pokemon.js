const Discord = require('discord.js');
const Pokedex = require('pokedex-api');
const pokedex = new Pokedex({
  userAgent: 'Woodie: Discord Bot (https://is.gd/ybHl0c)',
  version: 'v 2.1.4'
});

exports.run = async (Bastion, message, args) => {
  try {
    let name = args.slice(0).join(' ');
    let pokemon;
    if (name) {
      pokemon = await pokedex.getPokemonByName(encodeURIComponent(name));
    }

    else {
      /**
      * The command was ran with invalid parameters.
      * @fires commandUsage
      */
      return message.reply("**Doğru Kullanım**: -pokemon <pokemon>");
    }

    pokemon = pokemon[0];

    let fields = [
      {
        name: 'Pokédex Numarası',
        value: pokemon.number,
        inline: true
      },
      {
        name: 'Tür',
        value: pokemon.species,
        inline: true
      },
      {
        name: 'Tip',
        value: pokemon.types.join(', '),
        inline: true
      },
      {
        name: 'Yetenekleri',
        value: `Normal: ${pokemon.abilities.normal.join(', ') || '-'}\nHidden: ${pokemon.abilities.hidden.join(', ') || '-'}`,
        inline: true
      },
      {
        name: 'Yumurta Grubu',
        value: pokemon.eggGroups.join(', '),
        inline: true
      },
      {
        name: 'Cinsiyet',
        value: pokemon.gender.length ? `Erkek: ${pokemon.gender[0]}%\nKadın: ${pokemon.gender[1]}%` : 'Bilinmiyor',
        inline: true
      },
      {
        name: 'Boy',
        value: pokemon.height,
        inline: true
      },
      {
        name: 'Ağırlık',
        value: pokemon.weight,
        inline: true
      },
      {
        name: 'Evrim',
        value: pokemon.family.evolutionLine.join(' -> ')
      }
    ];

    let note = '';	
    if (pokemon.starter) {
      note = note.concat('Bir starter pokemon\n');
    }
    if (pokemon.legendary) {
      note = note.concat('Bir legendary pokemon\n');
    }
    if (pokemon.mythical) {
      note = note.concat('Bir mythical pokemon\n');
    }
    if (pokemon.ultraBeast) {
      note = note.concat('Bir ultra beast\n');
    }
    if (pokemon.mega) {
      note = note.concat('Mega evrim geçirebilir\n');
    }

    fields.push({
      name: 'Not',
      value: note.length ? note : '-'
    });

    message.channel.send({
      embed: {
        color: 0x00AE86,
        title: pokemon.name,
        description: `Keşfedilen nesil: ${pokemon.gen}`,
        fields: fields,
        thumbnail: {
          url: pokemon.sprite
        },
      }
    }).catch(e => {
      console.log(e);
    });
  }
  catch (e) {
    if (e.response) {
      return Bastion.emit('error', e.response.statusCode, e.response.statusMessage, message.channel);
    }
    console.log(e);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'pokemon',
  description: 'Belirtilen pokemon hakkında bilgi verir.',
  usage: 'pokedex <pokemon | pokemon id>'
};
