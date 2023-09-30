const {
  MessageEmbed
} = require('discord.js');
const database = require('@replit/database');
const db = new database();

module.exports = {
  name: 'cash',
  cooldowns: 5,
  description: 'Cek Uang',
  run: async(client, msg, args) => {
    const user = msg.mentions.members.first() || msg.guild.members.cache.get(msg.author.id);
    const duit = await db.get(`${user.id}`)
    
    if(duit === null) {
      const cek = new MessageEmbed()
      .setTitle('💸 **__ETECASH BANK__** 💸')
      .setDescription(`Username: **${user.user.tag}**\nUang: **$0**\nServer: **${msg.guild.name}**`)
      .setFooter({
        text: `${client.user.username}`, 
        iconURL: msg.author.displayAvatarURL({
          dynamic: true
        })
      })
      .setTimestamp()
      msg.reply({ embeds: [cek] })
    } else {
      const cek = new MessageEmbed()
      .setTitle('💸 **__ETECASH BANK__** 💸')
      .setDescription(`Username: **${user.user.tag}**\nUang: **$${duit}**\nServer: **${msg.guild.name}**`)
      .setColor(`#00C5FF`)
      .setFooter({
        text: `${client.user.username}`, 
        iconURL: msg.author.displayAvatarURL({
          dynamic: true
        })
      })
      .setTimestamp()
      msg.reply({ embeds: [cek] })
    }
  }
}