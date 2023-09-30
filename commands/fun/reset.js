const {
  MessageEmbed
} = require('discord.js');
const {
  owner
} = require('../../owner.json');
const database = require('@replit/database');
const db = new database();

module.exports = {
  name: 'reset',
  cooldowns: 5,
  owner: true,
  description: 'Mereset Akun',
  run: async(client, msg, args) => {
    const user = msg.mentions.members.first() || msg.guild.members.cache.find(m => m.id === args[0]);
    
    if(!user) return msg.reply(`User tidak diketahui!`);
    
    await db.delete(user)
    const cek = new MessageEmbed()
      .setTitle('🗑 **__RESET ACCOUNT__** 🗑')
      .setDescription(`Berhasil mereset akun ${user}!`)
      .setFooter({
        text: `ETERNAL ROLEPLAY`, 
        iconURL: msg.author.displayAvatarURL({
          dynamic: true
        })
      })
      .setTimestamp()
    msg.reply({ embeds: [cek] })
  }
}