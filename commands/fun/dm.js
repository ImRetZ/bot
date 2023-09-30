const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: "dm",
  aliases: ['pm'],
  cooldowns: 5,
  description: 'Mengirim Dm Ke User Lain',
  usage: '<@user> <message>',
  run: async(client, msg, args) => {
    let user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])
    if(!user) return msg.reply(`User Tidak Ditemukan!`)
    if(!args.slice(1).join(" ")) return msg.reply(`<@${msg.author.id}> Tolong Masukan Pesan!`)
    const embed = new MessageEmbed()
      .setAuthor({
        name: `Direct Messageタ`, 
        iconURL: msg.author.displayAvatarURL({ 
          dynamic: true
        })
      })
      .setDescription(`${args.slice(1).join(" ")}\n`)
      .setColor(msg.guild.me.displayHexColor)
      .setFooter({
        text: `Dari: ${msg.author.tag}`
      });
    msg.delete();
    user.user.send({ embeds: [embed]}).catch(() => msg.channel.send(`Tidak Bisa Mengirim Dm Ke **${user.user.tag}**`)).then(() => msg.channel.send(`Berhasil Mengirim Dm Ke **${user.user.tag}**`));
  }
}