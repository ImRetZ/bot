const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'ban',
  aliases: ['b'],
  cooldowns: 10,
  userPerms: ['ADMINISTRATOR'],
  botPerms: ['ADMINISTRATOR'],
  usage: '<@member> <reason>',
  description: 'Ban Member',
  run: async(client, msg, args) => {
    let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ") || `None`;

    if(!member) return msg.reply(`Tolong Tag Atau Tulis Nama User!`);

    if(member == msg.member) return msg.reply(`Kamu Tidak Bisa Ban Diri Sendiri!`)
  if(member.roles.highest.position >= msg.member.roles.highest.position) return msg.reply(`Tidak Bisa ban user!`);

    if(member.roles.highest.position >= msg.guild.me.roles.highest.position) return msg.reply(`Tidak Bisa Ban user!`);

    member.ban({
      reason: reason
    })
    const ban = new MessageEmbed()
      .setAuthor({ name: `BAN MEMBER` })
      .setTitle(`**━━━━━━━**`)
      .setDescription(`Username: ${member.user.tag}\nReason: ${reason}\nServer: ${msg.guild.name}`)
      .setTimestamp()
      .setColor(`#00C5FF`)
      .setFooter({
        text: `Dari: ${msg.author.tag}`, 
        iconURL: msg.author.displayAvatarURL({
          dynamic: true
        })
      })
    
    if(member.ban) {
      msg.reply({ embeds: [ban]});
      member.user.send({embeds: [ban]}).catch(() => {
        console.log(`Tidak bisa mengirim dm ke ${member.user.tag}`)
      });
    }
    
  }
}