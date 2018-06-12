var Jimp = require("jimp");
exports.run = function(client, message, args) {
      let imageurl = args[0] === undefined ? message.attachments.first() : { url: args[0] };

      if (imageurl === undefined) {
          message.channel.send("**Bir resim ekle**");
          return;
      }

      imageurl = imageurl.url;

      var watermark;

      Jimp.read("./res/watermark.png").then(function (image) {
          watermark = image.opacity(.75);
      });

      Jimp.read(imageurl).then(function (image) {
          watermark.resize(watermark.bitmap.width / watermark.bitmap.height * (image.bitmap.height / 5), image.bitmap.height / 5);
          image.composite(watermark, 20, image.bitmap.height - (watermark.bitmap.height + 20))
              .getBuffer(Jimp.MIME_PNG, (error, buffer) => {
                  message.channel.send("", {
                      files: [{
                          attachment: buffer,
                          name: "grandayy.png"
                      }]
                  });
              });
      });
  }

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [''],
    permLevel: 0
  };
  
  exports.help = {
    name: 'grandayy',
    description: 'fotoya grandayy yazısı ekler !!!!.',
    usage: '<image> grandayy'
  };
