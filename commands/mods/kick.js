const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'kick',
  aliases: ['k'],
  cooldowns: 10,
  userPerms: ['ADMINISTRATOR'],
  botPerms: ['ADMINISTRATOR'],
  usage: '<@member> <reason>',
  description: 'Kick Member',
  run: async(client, msg, args) => {
    let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ") || `None`;

    if(!member) return msg.reply(`Tolong Tag Atau Tulis Nama User!`);

    if(member == msg.member) return msg.reply(`Kamu Tidak Bisa Kick Diri Sendiri!`)
  if(member.roles.highest.position >= msg.member.roles.highest.position) return msg.reply(`Tidak Bisa Kick user!`);

    if(member.roles.highest.position >= msg.guild.me.roles.highest.position) return msg.reply(`Tidak Bisa Kick user!`);

    member.kick({
      reason: reason
    })
    const kick = new MessageEmbed()
      .setAuthor({ name: `KICK MEMBER` })
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
    
    if(member.kick) {
      msg.reply({ embeds: [kick]});
      member.user.send({embeds: [kick]}).catch(() => {
        console.log(`Tidak bisa mengirim dm ke ${member.user.tag}`)
      });
    }
    
  }
}