const {
  MessageEmbed
} = require('discord.js')
const database = require('@replit/database')
const db = new database()

module.exports = {
  name: 'give',
  aliases: ['g'],
  cooldowns: 5,
  description: 'Mengirim Etecash Ke Orang',
  run: async(client, msg, args) => {
    const user = msg.mentions.members.first() //|| msg.guild.members.cache.find(m => m.id === args[0]) || msg.guild.members.cache.get(msg.author.id);
    const gv = parseInt(args[1]);
  
    if(!args[0]) return msg.reply('User tidak ditemukan!');
    if(user === msg.member) return msg.reply('Tidak bisa mengirim ke diri sendiri!')
    if(!gv) return msg.reply('Masukkan angka!');
    if(isNaN(gv)) return msg.reply('Masukkan angka!');
    
    const duit = await db.get(user.user.id)//penerima
    const aduit = await db.get(msg.author.id)//pengirim
    if(aduit < gv) return msg.reply('Etecash tidak cukup!');
    
    //pengirim
    const ppr = aduit - gv;
    await db.set(msg.author.id, ppr);
    //penerima
    //const ppn = duit + gv;
    await db.set(`${user.user.id}`, duit+gv);
    
    const em = new MessageEmbed()
    .setTitle('🪙 **__ETECASH GIVE__**🪙 ')
    .setDescription(`Penerima: **${user}**\nJumlah: **$${gv}**\nSisa: **$${ppr}**`)
    .setFooter({
      text: client.user.username, 
      iconURL: client.user.displayAvatarURL({
        dynamic: true
      })
    })
    .setTimestamp()
    .setColor(`#00C5FF`)
    msg.reply({
      embeds: [em]
    })
  }
}