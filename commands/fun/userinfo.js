const {
  MessageEmbed
} = require('discord.js');

const moment = require('moment');

module.exports = {
  name: 'userinfo',
  aliases: ['ui'],
  cooldowns: 5,
  usage: '<@user/id>',
  description: 'Melihat User Info',
  run: async(client, msg, args) => {
    let user = msg.mentions.members.first() || msg.guild.members.cache.find(m => m.id === args[0]) || msg.guild.members.cache.get(msg.author.id);

    if(!user) return msg.reply(`User Tidak Ditemukan!`);
    
    const roles = user.roles.cache.filter(r => r.id !== msg.guild.id).map(roles => `${roles.toString()}`);

    const info = new MessageEmbed()
    .setAuthor({
      name: user.user.tag, 
      iconURL: user.displayAvatarURL({ 
        dynamic: true 
      })
    })
    .addField(`**__User Info:__**`, `**Nickname: ${user} \`\`\`${user.user.tag}\`\`\`**
**ID: \`\`\`${user.id}\`\`\`**
**Bot: \`\`\`${user.user.bot ? `True` : `False`}\`\`\`**
**Status: \`\`\`${user.presence ? user.presence.status : `offline`}\`\`\`**
**Joined At: \`\`\`${moment(user.joinedAt).format('DD MMMM YYYY')}\`\`\`**
**Created At: \`\`\`${moment(user.user.createdAt).format('DD MMMM YYYY')}\`\`\`**`)
    .addField(`**__Roles [${roles.length}]:__**`, `${roles.join(", ") || `Tidak Ada Roles`}`)
    .setColor(msg.guild.me.displayhexColor)
    .setFooter({
      text: msg.author.tag, 
      iconURL: msg.author.displayAvatarURL({ 
        dynamic: true 
      })
    })
    .setTimestamp()
    msg.reply({ embeds: [info]});
  }
}