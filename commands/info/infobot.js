const {
  MessageEmbed
} = require('discord.js');

const {
  prefix
} = require('../../config.js');
//const os = require('os');
const moment = require('moment');

const {
  mem,
  cpu, 
  os
} = require('node-os-utils');

module.exports = {
  name: 'infobot',
  aliases: ['botinfo', 'info'],
  cooldowns: 5,
  description: 'Melihat info bot',
  run: async(client, msg, args) => {
    require("moment-duration-format");
    const uptime = moment.duration(client.uptime).format(`D [days], H [hrs], m [mins], s [secs]`);
    
    const s = client.guilds.cache.map(guild => guild);
    
    const {
      totalMemMb,
      usedMemMb
    } = await mem.info();
    
    const info = new MessageEmbed()
    .setAuthor({
      name: `${client.user.tag.toUpperCase()}`, 
      iconURL: client.user.displayAvatarURL({ 
        dynamic: true 
      })
    })
    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
    .addField(`**__Owner:__**`, `RetZ.#6808`)
    .addField(`**__Client:__**`, `\`\`\`Prefix: ${prefix}\nServer's: ${s.length}\nCommand's: ${client.commands.size}\nPing: ${msg.client.ws.ping} ms\nUptime: ${uptime}\`\`\``)
    .addField(`**__Host:__**`, `\`\`\`OS: ${os.platform()}\nCores: ${cpu.count()}\nCPU Usage: ${await cpu.usage()}%\nRAM: ${totalMemMb} MB\nRAM Usage: ${usedMemMb} MB\`\`\``)
    .addField(`**__Discord:__**`, `[[Klik Disini]](https://discord.gg/mtCXG7qUFu)`)
    .setFooter({
      text: `〢${msg.author.tag}`, 
      iconURL: msg.author.displayAvatarURL({ 
        dynamic: true 
      })
    })
    .setTimestamp()
    .setColor(`#00C5FF`)
    msg.reply({ embeds: [info]});
  }
}
