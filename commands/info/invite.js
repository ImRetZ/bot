const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'invite',
  aliases: ['inv'],
  cooldowns: 5,
  description: 'Link Invite Bot',
  run: async(client, msg, args) => {
    msg.delete();
    
    const embed = new MessageEmbed()
    .setTitle(`**Invite ${client.user.username}**`)
    .setDescription(`**Klik Tulisan Biru Untuk Invite Saya**
**[[Disini]](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)**`)
    .setFooter({
      text: `By: ${msg.author.tag}`, 
      iconURL: msg.author.displayAvatarURL({ 
        dynamic: true
      })
    })
    .setTimestamp()
    .setColor(`#00C5FF`)
    msg.channel.send({ embeds: [embed]});
  }
}