const { WebhookClient, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

class command {
    constructor() {
        this.name = "token-leaver",
        this.description = "Faire leave tous les token d\'un serveur",
        this.options = [
            {
                name: 'guild_id',
                description: 'Lid du serveur ou faire leave tous les tokens',
                type: 'STRING',
                required: true,
            }
        ];
    }

    async execute(bot, interaction) {
const user = interaction.user.id;
      const owners = bot.config.clients.owners;

      if (!owners.includes(user)) {
        const linkButton = new MessageButton()
        .setLabel('Obtenir un Spamer-Bot')
        .setStyle('LINK') 
        .setEmoji("1156670419840028852")
        .setURL('https://discord.gg/rfr8fuGsvE');

        const row = new MessageActionRow().addComponents(linkButton);

        const errorEmbed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle("<:attention:1176936008235888700>  Accès Restreint !")
            .setDescription("Seul **le propriétaire** peut utiliser cette commande !");

        await interaction.reply({
            embeds: [errorEmbed],
            components: [row]
        });
        return
      };
          const filePath = '/home/container/tokens.js';
        let tokens = [];
        const fs = require("fs")
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            tokens = fileContent.split('\n').map(token => token.trim());
        } catch (error) {
            console.error('Erreur lors de la lecture du fichier tokens.js :', error);
        }
process.on("unhandledRejection", (reason, promise) => {
})

process.on("uncaughtException", (err, origin) => {
})
const gradient = require("gradient-string")
const chalk = require("chalk")
const config = require("/home/container/config.js")
const { Client } = require("discord.js-selfbot-v13")
var erreeeeeeeeee = 0;
var succes = 0;
var invalidetoken = 0;
var totalJoined = 0
var failed = 0
var loginin = 0;
loginin = null;
loginin = 0;
    
const HttpsProxyAgent = require("https-proxy-agent")
//read from tokens.txt

console.log(gradient.rainbow("Token Joiner by Nightfox"))

async function readTokens() {
    const tokens = fs.readFileSync("/home/container/tokens.js").toString().split("\n");
  
    for (const token of tokens) {
        if (typeof token === 'string') {
            if (succes >= tokens.length) {
                break;
            }

            await new Promise((resolve) => setTimeout(resolve, 1));
            doEverything(token.trim().replace("\r", "").replace("\n", ""), tokens);
        }
    }
}

const targetGuildIde = interaction.options.getString('guild_id');

    interaction.reply({
        embeds: [
            {
                title: "<:fuse:1162775775582372061> __Tokens Leaving__",
                color: "#5765f2",
                thumbnail: {url: "https://cdn.discordapp.com/icons/1153726635028271247/a733cfdf4072921d7e5d3ca464b61309.png?size=4096"},
                description:
                `Les token sont en train de leave le serveur avec l'id \`${targetGuildIde}\` !`,
                footer: {
                    text: `✨ Oauth2-Bot - made by Nightfox`
                }
            }
        ],
    });

readTokens()
const proxies = fs.readFileSync("/home/container/proxies.txt").toString().split("\n")
async function doEverything(token, tokens) {
  // console.log(token);
  const randomProxy = proxies[Math.floor(Math.random() * proxies.length)]
    ?.replace("\r", "")
    ?.replace("\n", "")
  var client
  if (config.useProxies) {
    var agent = HttpsProxyAgent(randomProxy)
    client = config.captcha_api_key
      ? new Client({
          captchaService: "2captcha",
          captchaKey: config.captcha_api_key,
          checkUpdate: false,
          http: { agent: agent },
          captchaWithProxy: true,
          proxy: randomProxy,
          restRequestTimeout: 60 * 1000,
          interactionTimeout: 60 * 1000,
          restWsBridgeTimeout: 2 * 1000,
        })
      : new Client({ checkUpdate: false })
  } else {
    client = config.captcha_api_key
      ? new Client({
          captchaService: "2captcha",
          captchaKey: config.captcha_api_key,
          checkUpdate: false,
        })
      : new Client({ checkUpdate: false })
  }
  client.on("ready", async () => {
    try {
    console.log(
      chalk.green("Logged in as ") + gradient.cristal(client.user.tag)
    )
            const targetGuildId = interaction.options.getString('guild_id');
const targetGuild = client.guilds.cache.get(targetGuildId);

if (targetGuild) {
    try {
        await targetGuild.leave();
        console.log(
            chalk.greenBright(
              `Leaved as ${gradient.passion(client.user.tag)}`
            )
          )
    } catch (error) {
    }
} else {
}
            succes++
            totalJoined++
            if (joinedUsers >= 10) {
              }
  
              joinedUsers += `[+] ${client.user.tag}\n`;
            process.title = `Joined: ${totalJoined} | Failed: ${failed}`

            if (loginin >= tokens.length) {
              console.log(
                `${chalk.magentaBright("[INFO]")} Joined ${gradient.passion(
                  totalJoined
                )} servers and failed to join ${gradient.passion(
                  failed
                )} servers}`
              )
              interaction.channel.send({
        embeds: [
            {
                title: "<:fuse:1162775775582372061> __Leaving Finished__",
                color: "#5765f2",
                thumbnail: { url: "https://cdn.discordapp.com/icons/1153726635028271247/a733cfdf4072921d7e5d3ca464b61309.png?size=4096" },
                description:
                    `Tous les token on leave le serveur avec succès !`,
                footer: {
                    text: `✨ Oauth2-Bot - made by Nightfox`
                }
            }
        ],
    });
              process.title = `Joined: ${totalJoined} | Failed: ${failed}`
            }
        } catch (err) {
            console.log(
              `${chalk.redBright("[ERROR]")} An error occurred while sending DMs`
            );
            console.error(chalk.redBright(err));
          }
          })
  client.login(token).catch((err) => {
    console.log(
      `${chalk.redBright("[ERROR]")} Invalid token ${gradient.instagram(token)}`, err
    )
    invalidetoken++
    if (client.token === tokens.length) {
      console.log(
        `${chalk.magentaBright("[INFO]")} Joined ${gradient.passion(
          totalJoined
        )} servers and failed to join ${gradient.passion(failed)} servers`
      )
      
      process.title = `Joined: ${totalJoined} | Failed: ${failed}`
    }
  })
}
    }
}

module.exports = command