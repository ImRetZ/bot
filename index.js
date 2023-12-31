const discord = require('discord.js');
const fs = require('fs');
const {
  Collection,
  MessageEmbed
} = require('discord.js');
const token = 'TOKEN BOT';
const config = require('./config.js');
const {
  owner
} = require('./owner.json')
//const db = require("quick.db");
const x = `\x1b[0m`;
const r = `\x1b[31m`;
const g = `\x1b[32m`;
const y = `\x1b[33m`;
const b = `\x1b[34m`;

const express = require('express');
const app = express();
const port = 8080;
app.get('/', (req, res) => {
  res.send(`
BOT ONLINE!
`);
});
app.listen(port, () => {
  console.log(`http://localhost.com:${port}`);
});

const client = new discord.Client({
  intents: ["GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
    "GUILD_SCHEDULED_EVENTS"],
  prefix: config.prefix
});

client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
module.exports = client;

const cooldowns = new Map();
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const { readdirSync } = require('fs')
readdirSync('./commands').forEach(dir => {
  const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const commandName = file.split(".")[0]
    const command = require(`./commands/${dir}/${commandName}`);

    client.commands.set(commandName, command)
  }
});

client.once('ready', () => {
  process.stdout.write('\x1bc');
  console.log(`
\t----- Info Bot -----
Developer   : "RetZ.#6808"
Username    : "${client.user.tag}"
ID          : "${client.user.id}"
Prefix      : "${config.prefix}"
Commands    : "${client.commands.size}"
Servers     : "${client.guilds.cache.size}"
\t----- Action -----`);

  //PRESENCE DISCORD
  const array = [{
    name: `With Discord.js`,
    type: `PLAYING`,
  }, {
    name: `Use ${config.prefix}help`,
    type: `PLAYING`,
  }, {
    name: `Utopia Pride Roleplay`,
    type: `PLAYING`,
  }];

  async function Presence() {
    const option = Math.floor(Math.random() * array.length);
    try {
      client.user.setPresence({
        status: `dnd`,
        activities: [{
          name: array[option].name,
          type: array[option].type
        }]
      });
    } catch (error) {
      console.error(`\x1b[31mError | ${error}`);
    }
  }
  setInterval(Presence, 5 * 1000);
  //━━━━━━━━━━
  let channel = client.channels.cache.get(`1154014819939274872`);
  let guilds = channel.guild;
  if (channel) {
    const on = new MessageEmbed()
      .setAuthor({
        name: `${client.user.tag.toUpperCase()}`, 
        iconURL: client.user.displayAvatarURL({ 
          dynamic: true 
        })
      })
      .setDescription(`**${client.user.tag} Is Online!**`)
      .setFooter({
        text: `Log In`
      })
      .setTimestamp()
      .setColor(`#00C5FF`)
    return channel.send({
      embeds: [on]
    });
  } else {
    return console.log('Tidak ada channel');
  }
});

client.on('messageCreate', async(msg) => {
  if (msg.author.bot) return;
  if (!msg.guild) return;
  //let prefix = await db.fetch(`prefix_${msg.guild.id}`);
  let prefix = config.prefix;

  if (!msg.content.startsWith(prefix)) return;
  if (!msg.member) msg.member = await msg.guild.fetchMember(msg);
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length == 0) return;
  let command = client.commands.get(cmd) || client.commands.find(command => command.aliases && command.aliases.includes(cmd));

  if (!command) return;

  //COMMAND OWNERS
  if (command.owner) {
    if (!owner.includes(msg.author.id)) {
      const embed = new MessageEmbed()
        .setTitle(`**⚠️ ERROR ⚠️**`)
        .addField(`**Whitelist Only**`, `You are not on the whitelist!`)
        .setTimestamp()
        .setFooter({
          text: `・${msg.author.tag}`, 
          iconURL: msg.author.displayAvatarURL({
            dynamic: true
          })
        })
        .setColor(msg.guild.me.displayHexColor)
      return msg.reply({ embeds: [embed] });
    }
  }
  //DISCORD PERMISSION
  if (!msg.member.permissions.has(command.userPerms || 'VIEW_CHANNEL')) {
    const embed = new MessageEmbed()
      .setFooter({
        text: `・${msg.author.tag}`, 
        iconURL: msg.author.displayAvatarURL({
          dynamic: true
        })
      })
      .addField(`**User Missing Permission**`, `${command.userPerms}`)
      .setTitle(`**⚠️ ERROR ⚠️**`)
      .setColor(msg.guild.me.displayHexColor)
    return msg.reply({ embeds: [embed] });
  }
  if (!msg.guild.me.permissions.has(command.botPerms || 'VIEW_CHANNEL')) {
    const embed = new MessageEmbed()
      .setTitle(`**⚠️ ERROR ⚠️**`)
      .addField(`**Bot Missing Permissions**`, `${command.botPerms.join(" | ")}`, false)
      .setFooter({
        text: `・${msg.author.tag}`, 
        iconURL: msg.author.displayAvatarURL({
          dynamic: true
        })
      })
      .setColor(msg.guild.me.displayHexColor)
    return msg.reply({ embeds: [embed] })
  }

  //COMMAND COOLDOWNS
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const current_time = Date.now();
  const time_stamps = cooldowns.get(command.name);
  const cooldown_amount = (command.cooldowns) * 1000;

  if (time_stamps.has(msg.author.id)) {
    const expiration_time = time_stamps.get(msg.author.id) + cooldown_amount;

    if (current_time < expiration_time) {
      const time_left = (expiration_time - current_time) / 1000;
      return msg.reply(`Please Wait **${time_left.toFixed(1)}s** Before Using **${config.prefix}${command.name}** Again!`).then(ms => {
        setTimeout(() => {
          ms.delete()
        }, time_left * 1000);
      }).catch((e) => console.error(`Error | ${e}`))
    }
  }
  time_stamps.set(msg.author.id, current_time);
  setTimeout(() => time_stamps.delete(msg.author.id), cooldown_amount);

  //COMMAND LOGS
  let channel = client.channels.cache.get(`1154014819939274872`);
  if (channel) {
    const cmdlog = new MessageEmbed()
      .setAuthor({
        name: `LOGS BOT`, 
        iconURL: client.user.displayAvatarURL({
          dynamic: true
        })
      })
      .setDescription(`**Username:** ${msg.author.tag}\n**Guild:** ${msg.guild.name}\n**Channel:** #${msg.channel.name}\n**Command:** ${msg.content}`)
      .setFooter({
        text: `ID: ${msg.author.id}`, 
        iconURL: msg.author.displayAvatarURL({
          dynamic: true
        })
      })
      .setTimestamp()
      .setColor('#00C5FF')
    channel.send({ embeds: [cmdlog] });
  } else {
    return console.log('Tidak ada channel cmd log');
  };

  if (command) command.run(client, msg, args);
});
//------------------------------
client.login(token)
