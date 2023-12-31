const {
  MessageEmbed
} = require('discord.js');
const {
  readdirSync
} = require('fs');
const config = require('../../config.js')

module.exports = {
  name: "help",
  aliases: ['h'],
  cooldowns: 3,
  description: "Melihat Semua Commands",
  run: async(client, msg, args) => {
    if(!args[0]){
      let categories = []
      readdirSync('./commands/').forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}`).filter((file) => file.endsWith(".js"))
        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`)
          if(!file.name) return "Tidak Ada Nama";
          let name = file.name.replace(".js", "");

          return `${name}`;
        })
        let data = new Object();
        data = {
          name: `**__${dir.toUpperCase()}__**`,
          value: `\`\`\`${cmds.length === 0 ? "In progress." : cmds.join(" | ")}\`\`\``
        };
        categories.push(data);
      });
      const embed = new MessageEmbed()
      .setAuthor({ name: `📚 HELP 📚` })
      .setTitle(`**Semua Commands:** ${client.commands.size}`)
      .addFields(categories)
      .setThumbnail(msg.guild.iconURL({
        dynamic: true
      }))
      .setDescription(`**Use:** ${config.prefix}help <command> Untuk Melihat Info Command\n**Contoh:** ${config.prefix}help say`)
      .setTimestamp()
      .setFooter({
        text: `〢${msg.author.tag}`, 
        iconURL: msg.author.displayAvatarURL({
            dynamic: true
        })
      })
      .setColor('#00C5FF')
      return msg.reply({ embeds: [embed]})
    } else {
      const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
      if(!command){
        const embed = new MessageEmbed()
        .setTitle(`Command Tidak Ditemukan!`)
        .setDescription(`**Contoh:** ${config.prefix}help say`)
        .setColor(msg.guild.me.displayHexColor)
        return msg.reply({ embeds: [embed]})
      }
      const embed = new MessageEmbed()
      .setTitle(`INFO COMMAND`)
      .addField(`Name:`, command.name ? `${command.name}` : "No Name")
      .addField(`Aliases:`, command.aliases ? `${command.aliases.join(" | ")}` : "No Aliases")
      .addField(`Cooldowns:`, command.cooldowns ? `${command.cooldowns}` : "No Cooldowns")
      .addField(`Whitelist Only:`, command.owner ? `${command.owner}` : 'false')
      .addField(`User Permissions:`, command.userPerms ? `${command.userPerms.join(" | ")}` : 'No User Permissions Required')
      .addField(`Bot Permissions:`, command.botPerms ? `${command.botPerms.join(" | ")}` : 'No Bot Permissions Required')
      .addField(`Usage:`, command.usage ? `${config.prefix}${command.name} ${command.usage}` : `${config.prefix}${command.name}`)
      .addField(`Description:`, command.description ? command.description : "No Description")
      .setTimestamp()
      .setFooter({
        text: `・${msg.author.tag}`, 
        iconURL: msg.author.displayAvatarURL({
          dynamic: true
        })
      })
      .setColor(msg.guild.me.displayHexColor)
      return msg.reply({ embeds: [embed], ephemeral: true}).then(msg => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
    }
  }
}