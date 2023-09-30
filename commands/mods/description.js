module.exports = {
  name: "description",
  aliases: ['desc'],
  cooldowns: 10,
  userPerms: ['ADMINISTRATOR'],
  botPerms: ['ADMINISTRATOR'],
  usage: '<description>',
  description: "Edit Deskripsi Server",
  run: async(client, msg, args) => {
    let desc = args.slice(0).join(" ");
    msg.delete();
    msg.guild.edit({
      description: desc
    }).then(() => msg.channel.send(`Berhasil Mengedit Deskripsi Server!`));
  }
}