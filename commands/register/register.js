const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'register',
  aliases: ['r'],
  description: 'Register',
  run: async(client, msg, args) => {
    let name = args[0];
    let namee = args[1];
    let rg = msg.guild.roles.cache.find(r => r.id === '1154014726481776660');
    let ch = msg.channel.id

    if(ch !== '1154014890059640903') return msg.reply("Command Ini Hanya Bisa Digunakan Di <#1154014890059640903>");
    if(!name) return msg.reply('*register Nama Kamu');
    if(name.length < 4) return msg.reply('Nama tidak boleh kurang dari 4 huruf!');
    if(!namee) return msg.reply('Tulis nama belakangmu!');
    if(namee.length < 4) return msg.reply('Nama tidak boleh kurang dari 4 huruf!');
    let nm1 = name.charArt(0).toUpperCase() + slice(1)
    let nm2 = namee.charArt(0).toUpperCase() + slice(1)
    if(rg) {
      msg.guild.members.cache.get(msg.author.id).roles.add(rg).then(() => {
        msg.guild.members.cache.get(msg.author.id).setNickname(nm1+'_'+nm2).then(() => {
          let gs = new MessageEmbed()
          .setTitle(`**REGISTER UTOPIA**`)
          .setDescription(`Kamu Telah Berhasil Register Dengan Nama **${nm1}_${nm2}**\nSelamat Bermain:)\n**━━━━━━━━━━━**\n**Cara Register**\n\nCommand: *register Nama Kamu\n\n[!]Gunakan nama Rp yang baik dan benar\nContoh benar:\n- Yan Lazovsky\n- Udin Jayadi\n[!]Buat nama menggunakan spasi seperti contoh diatas\nContoh salah:\n- Andi\n- Kevin Style\n- BobSuging\nSelebihnya bisa cek di channel <#1154014888453210112>\n**━━━━━━━━━━━**`)
          .setFooter({ text: `UTOPIA PRIDE` })
          .setColor(`#00C5FF`)
          .setTimestamp()
          msg.channel.send({ embeds: [gs] }).catch(() => {
            msg.reply('Kamu sudah register!');
            console.error(err);
          });

          let chan = client.channels.cache.get(`1154014891426988064`);
          chan.send(`:identification_card: ${msg.author.tag} berhasil register menggunakan nama **${nm1}_${nm2}**`)
        }).catch(() => { 
          msg.reply('Kamu tidak bisa register!')
        })
      });
    } else {
      console.error(err)
    }
  }
}