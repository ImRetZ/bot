const {
    MessageEmbed
} = require('discord.js')
const {
  prefix
} = require('../../config.js')
const database = require('@replit/database')
const db = new database()

module.exports = {
    name: 'fish',
    cooldowns: 30,
    description: `Memancing Ikan`,
    run: async(client, msg, args) => {
        const duit = await db.get(msg.author.id);
        const aa = [0,4,9,10,7,2,6,1,8,5,3,0,4,2,1,5,3,0,4,2,1,5,3,]
        const berat = aa[Math.floor(Math.random() * aa.length)];
        const ikan = 12 * berat;
        const pancing = await db.get(`pancing_${msg.author.id}`)
        const adpt = duit - 5;
        await db.set(msg.author.id, adpt)
        if(duit < 5) return msg.reply('Etecash anda tidak cukup!');
        if(pancing === null) return msg.reply(`Anda tidak memiliki alat pancing, silahkan beli di **${prefix}buy**`);
      
        msg.reply(`Membeli umpan menggunakan **$5** dan melempar kail pancing......`).then(msg => {
            const em = new MessageEmbed()
            .setTitle('🎣 **__ETECASH FISHING__** 🎣')
            .setDescription(`Kamu mendapatkan ikan �\nBerat: **${berat.toLocaleString()}kg**\nHarga: **$${ikan}**`)
            .setColor(`#00C5FF`)
            .setFooter({
              text: `${client.user.username}`, 
              iconURL: msg.author.displayAvatarURL({
                dynamic: true
              })
            })
            .setTimestamp()
            setTimeout(() => {
                if(berat < 1) {
                    msg.edit(`Sayang sekali kamu mendapatkan sampah, coba lagi!`)
                } else {
                    msg.edit({ embeds: [em] });
                }
            }, 3000);
        });
        const bal = await db.get(msg.author.id)
        const dpt = bal + ikan
        await db.set(msg.author.id, dpt)
    }
}