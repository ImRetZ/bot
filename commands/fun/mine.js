const {
  MessageEmbed
} = require('discord.js')
const database = require('@replit/database')
const db = new database()

module.exports = {
  name: 'mine',
  cooldowns: 7,
  description: 'Mining Duit',
  run: async(client, msg, args) => {
    const reward = [5, 10, 15, 20, 25, 50, 5, 10, 15, 20, 25, 50, 5, 200, 10, 15, 20, 25, 5, 10, 15, 20, 5, 10, 15, 5, 10, 5, 10, 15, 20, 5, 10, 15, 20]
    const dpt = reward[Math.floor(Math.random() * reward.length)];
    const duit = await db.get(`${msg.author.id}`)
    const em = new MessageEmbed()
    .setTitle('⛏️  **__ETECASH MINING__**  ⛏️')
    .setDescription(`Kamu mendapatkan **$${dpt.toLocaleString()}** dari menambang!`)
    .setColor(`#00C5FF`)
    .setFooter({
      text: `${client.user.username}`, 
      iconURL: msg.author.displayAvatarURL({
        dynamic: true
      })
    })
    .setTimestamp()
    
    msg.reply({
      embeds: [em]
    })
    const bb = duit + dpt;
    await db.set(`${msg.author.id}`, bb)
  }
}