const {
  MessageEmbed
} = require('discord.js');

const {
  prefix
} = require('../../config.js');

const {
  owner
} = require('../../owner.json')

module.exports = {
  name: 'whitelist',
  aliases: ['wl'],
  owner: true,
  description: 'Melihat Whitelist Bot',
  run: async(client, msg, args) => {
    let us = ``;
    client.users.cache.forEach(u => {
      if(owner.includes(u.id)){
        us = us.concat(`${owner ? `- **${u.tag}**\n` : `None`}`);
      }
    });
    const user = new MessageEmbed()
      .setTitle(`**WHITELIST INFO**`)
      .addField(`${owner.length}〢**__Whitelist Users:__**`, us)
      .setFooter({
        text: `〢${msg.author.tag}`, 
        iconURL: msg.author.displayAvatarURL({ 
          dynamic: true 
        })
      })
      .setTimestamp()
      .setColor(`#00C5FF`)
    msg.reply({ embeds: [user]})
  }
}