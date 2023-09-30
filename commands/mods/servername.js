const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: "servername",
  aliases: ["sn", "guildname", "gn"],
  cooldowns: 10,
  userPerms: ['ADMINISTRATOR'],
  botPerms: ['ADMINISTRATOR'],
  usage: "<name>",
  description: "Edit Nama Server",
  run: async(client, msg, args) => {
  let name = args.slice(0).join(" ");
    if(!name) return msg.reply(`Tolong Masukkan Nama Baru!`);
    if(name.length < 2) return msg.reply(`Minimal 2 Kata!`)
    let guild = msg.guild.name
    msg.delete();
      msg.guild.setName(`${name}`).then(() => msg.channel.send(`Berhasil Mengedit Nama Server **${guild}** To **${name}**`) && console.log(`Log | Rename Server [${guild}] To [${name}]`));
  }
}