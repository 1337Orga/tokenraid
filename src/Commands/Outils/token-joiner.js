const { WebhookClient, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
let loginin = 0;

class command {
    constructor() {
        this.name = "token-joiner",
        this.description = "Permets de faire rejoindre les tokens",
        this.options = [
            {
                name: 'invite',
                description: 'Invitations du serveur ou faire join les token',
                type: 'STRING',
                required: true,
            },
            {
                name: 'nombre',
                description: 'Nombre de token a faire rejoindre sur le serveur',
                type: 'INTEGER',
                required: true,
            },
            {
                name: 'joindelay',
                description: 'Temps en miliseconde entre les joins des tokens',
                type: 'INTEGER',
                required: true,
            },
        ];
    }

    async execute(bot, interaction) {
        const maxTotalJoins = interaction.options.getInteger('nombre');
        if (maxTotalJoins <= 0) {
            interaction.reply("Le nombre de token a faire rejoindre doit être supérieure a 0 !");
            return;
          }
          const filePath = '/home/container/tokens.js';
        let tokens = [];
        const fs = require("fs")
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            tokens = fileContent.split('\n').map(token => token.trim());
        } catch (error) {
            console.error('Erreur lors de la lecture du fichier tokens.js :', error);
        }
        if (maxTotalJoins > tokens.length) {
            const notAuthorizedEmbed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Erreur")
            .setDescription(`Le nombre de tokens à faire rejoindre ne peut pas être supérieur au nombre de tokens disponibles ! (${tokens.length})`);
            
            interaction.reply({ embeds: [notAuthorizedEmbed], ephemeral: true  });
            return;
        }
process.on("unhandledRejection", (reason, promise) => {
  console.log(promise,reason)
})

process.on("uncaughtException", (err, origin) => {
console.log(err,origin)
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
var invite = interaction.options.getString('invite')
var inviteCode = invite;
if (invite.includes(".")) {
  inviteCode = invite.match(/\/([^/]+)$/)?.[1] || ""
} else {
  inviteCode = invite
}
    
const HttpsProxyAgent = require("https-proxy-agent")
//read from tokens.txt

console.log(gradient.rainbow("Token Joiner by Nightfox"))

async function readTokens() {
    const tokens = fs.readFileSync("/home/container/tokens.js").toString().split("\n");
  
    for (const token of tokens) {
        if (typeof token === 'string') {
            if (loginin >= maxTotalJoins) {
                break;
            }
            const delay = interaction.options.getInteger('joindelay');
            await new Promise((resolve) => setTimeout(resolve, delay)); 
            doEverything(token.trim().replace("\r", "").replace("\n", ""), tokens);
        }
    }
}

  interaction.reply({
    embeds: [
        {
            title: "<:fuse:1162775775582372061> __Tokens Joining__",
            color: "#5765f2",
            thumbnail: {url: "https://cdn.discordapp.com/icons/1153726635028271247/a733cfdf4072921d7e5d3ca464b61309.png?size=4096"},
            description:
            `\`✅\` *Good :* ${succes} \n` +
            `\`📌\` *Invalide token :* ${invalidetoken} \n` +
            `\`❌\` *Error :* ${erreeeeeeeeee}`,
            footer: {
                text: `✨ OAUTH-OFF - made by Nightfox`
            }
        }
    ],
});


const inter = setInterval(() => {
    interaction.editReply({
        embeds: [
            {
                title: "<:fuse:1162775775582372061> __Token Joining__",
                color: "#5765f2",
                thumbnail: {url: "https://cdn.discordapp.com/icons/1153726635028271247/a733cfdf4072921d7e5d3ca464b61309.png?size=4096"},
                description:
                    `\`✅\` *Good :* ${succes} \n` +
                    `\`📌\` *Invalide token :* ${invalidetoken} \n` +
                    `\`❌\` *Error :* ${erreeeeeeeeee}`,
                footer: {
                    text: `✨ OAUTH-OFF - made by Nightfox`
                }
            }
        ],
    });
}, 1100);

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
          captchaWithProxy: false,
          proxy: randomProxy,
          restRequestTimeout: 30 * 1000,
          interactionTimeout: 30 * 1000,
          restWsBridgeTimeout: 10 * 1000
        })
      : new Client({ checkUpdate: false })
  } else {
    client = config.captcha_api_key
      ? new Client({
          captchaService: "2captcha",
          captchaKey: config.captcha_api_key,
          checkUpdate: false,
          restRequestTimeout: 60 * 1000,
          interactionTimeout: 60 * 1000,
          restWsBridgeTimeout: 10 * 1000
        })
      : new Client({ checkUpdate: false })
  }
  client.on("ready", async () => {
    console.log(
      chalk.green("Logged in as ") + gradient.cristal(client.user.tag)
    )

 await client
      .fetchInvite(inviteCode)
      .then(async (invite) => {
        await invite
          .acceptInvite(true)
          .then(async () => {
            console.log(
              chalk.greenBright(
                `Joined as ${gradient.passion(client.user.tag)}`
              )
            )
            loginin++
            succes++
            totalJoined++
          })
          .catch((err) => {
            totalJoined++
            loginin++
            console.log(err)
            failed++
            erreeeeeeeeee++
            process.title = `Joined: ${totalJoined} | Failed: ${failed}`

            console.error(chalk.redBright(err))

            if (loginin >= maxTotalJoins) {
              clearInterval(inter)
                loginin = 0;
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
                title: "<:fuse:1162775775582372061> __Joining Finished__",
                color: "#5765f2",
                thumbnail: { url: "https://cdn.discordapp.com/icons/1153726635028271247/a733cfdf4072921d7e5d3ca464b61309.png?size=4096" },
                description:
                    `\`✅\` *Good :* ${succes} \n` +
                    `\`📌\` *Invalide token :* ${invalidetoken} \n` +
                    `\`❌\` *Error :* ${erreeeeeeeeee}`,
                footer: {
                    text: `✨ OAUTH-OFF - made by Nightfox`
                }
            }
        ],
    });
              process.title = `Joined: ${totalJoined} | Failed: ${failed}`
            }
          })
      })
      .catch((err) => {
        if (err.toString().includes("Unknown Invite"))
          return console.log(`${chalk.redBright("[ERROR]")} Unknown Invite: The provided invite (${inviteCode}) is invalid or formatted incorrectly.`)
        console.error(err)
      })
  })
  client.login(token).catch((err) => {
    loginin++
            totalJoined++
    console.log(
      `${chalk.redBright("[ERROR]")} Invalid token ${gradient.instagram(token)}`, err
    )
    invalidetoken++
  })
}
    }}

    module.exports = command