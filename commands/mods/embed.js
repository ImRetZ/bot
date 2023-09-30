const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'embed',
  aliases: ['em'],
  cooldowns: 10,
  userPerms: ['ADMINISTRATOR'],
  botPerms: ['ADMINISTRATOR'],
  usage: '<title> <message>',
  description: 'Send Embed',
  run: async(client, msg, args) => {
    let cht = args.slice(0).join(" ");

    if(!cht) return msg.channel.send("Tolong Tulis Pesan Yang Akan Di Kirim.").then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 3000);
    });
    
    msg.delete();
    const embd = new MessageEmbed()
    .setDescription(cht)
    .setColor('#00C5FF')
    .setTimestamp()
    .setFooter({
      text: `${msg.guild.name}`
    })
    msg.channel.send({
      embeds: [embd]
    });
  }
}