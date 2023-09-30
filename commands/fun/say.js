module.exports = {
  name: 'say',
  aliases: ['s'],
  cooldowns: 5,
  usage: '<text>',
  description: 'Untuk Chat Menggunakan Bot',
  run: async(client, msg, args) => {
    let text = args.slice(0).join(" ");

    if(!text) return msg.reply(`Tolong Ketik Sesuatu!`);

    msg.delete();
    msg.channel.send(text);
  }
}