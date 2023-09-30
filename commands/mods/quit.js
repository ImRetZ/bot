module.exports = {
  name: 'quit',
  aliases: ['out', 'q'],
  owner: true,
  description: 'Mengeluarkan Bot Dari Server',
  run: async(client, msg, args) => {
    msg.delete();
    msg.channel.send(`**Selamat Tinggal @everyone, Saya Akan Keluar Dari Server Ini!**`).then(() => msg.guild.leave()).catch(() => msg.channel.send(`Gagal Keluar Dari Server Ini!`));
  }
}