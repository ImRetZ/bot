const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'announcement',
  aliases: ['announce'],
  cooldowns: 10,
  userPerms: ['ADMINISTRATOR'],
  botPerms: ['ADMINISTRATOR'],
  usage: '<#channel> <message>',
  description: 'Mengirim Pesan Pengumuman',
  run: async(client, msg, args) => {
    let channel = msg.mentions.channels.first() || msg.guild.channels.cache.find(channel => channel.name === args[0]);
    
    let pesan = args.slice(1).join(" ");

    if(!channel) return msg.reply(`Tolong Tag Atau Tulis Nama Channel!`);
    if(!pesan) return msg.reply('Tolong Tulis Pesan Untuk Diumumkan!');

    msg.delete();
    msg.channel.send(`Berhasil Mengirim Pengumuman Ke **__${channel}__**`).then(() => {
      const embed = new MessageEmbed()
      .setAuthor({
        name: `ANNOUNCEMENT`, 
        iconURL: msg.author.displayAvatarURL({ 
          dynamic: true
        })
      })
      .setDescription(pesan)
      .setFooter({ text: `Dari: ${msg.author.tag}` })
      .setColor(`#00C5FF`)
      .setTimestamp()
      channel.send({
        content: '||@everyone||',
        embeds: [embed]
      });
    }).catch(() => msg.channel.send(`Channel Tidak Ditemukan!`));
  }
};