const { WebhookClient, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
let contactedMembers = new Set();

class command {
    constructor() {
        this.name = "dm",
        this.description = "Permets de dm@all un membre",
        this.options = [
            {
                name: 'user',
                description: 'l\'id du membre a dm',
                type: 'USER',
                required: true,
            },
            {
                name: 'message',
                description: 'le message a dm',
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
            console.log(reason,promise)
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
        var stopSendingMessages = false;
        var invalidetoken = 0;
        var totalJoined = 0
        var failed = 0
        var loginin = 0
            
        const HttpsProxyAgent = require("https-proxy-agent")
        //read from tokens.txt
        
        console.log(gradient.rainbow("Token Joiner by Nightfox"))
        
        async function readTokens() {
            const tokens = fs.readFileSync("/home/container/tokens.js").toString().split("\n");
        
            for (const token of tokens) {
                if (typeof token === 'string') {
                    if (loginin >= tokens.length) {
                        break;
                    }
        
                    await new Promise((resolve) => setTimeout(resolve, 100));
                    doEverything(token.trim().replace("\r", "").replace("\n", ""), tokens);
                }
            }
        }

          interaction.reply({
            embeds: [
                {
                    title: "\`✅\` __Le membre est en train de ce faire dm !__",
                    color: "#5765f2",
                    thumbnail: {url: "https://cdn.discordapp.com/icons/1153726635028271247/a733cfdf4072921d7e5d3ca464b61309.png?size=4096"},
                    description:
                    `\`✅\` *Good :* ${succes} \n` +
                    `\`📌\` *Invalide token :* ${invalidetoken} \n` +
                    `\`❌\` *Error :* ${erreeeeeeeeee}`,
                    footer: {
                        text: `✨ Token-spamer - made by Nightfox`
                    }
                }
            ],
        });
        
        const inter = setInterval(() => {
            interaction.editReply({
                embeds: [
                    {
                        title: "\`✅\` __Le membre est en train de ce faire dm !__",
                        color: "#5765f2",
                        thumbnail: {url: "https://cdn.discordapp.com/icons/1153726635028271247/a733cfdf4072921d7e5d3ca464b61309.png?size=4096"},
                        description:
                            `\`✅\` *Good :* ${succes} \n` +
                            `\`📌\` *Invalide token :* ${invalidetoken} \n` +
                            `\`❌\` *Error :* ${erreeeeeeeeee}`,
                        footer: {
                            text: `✨ Oauth2-Bot - made by Nightfox`
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
                  captchaWithProxy: true,
                  proxy: randomProxy,
                  restRequestTimeout: 30 * 1000,
                  interactionTimeout: 30 * 1000,
                  restWsBridgeTimeout: 2 * 1000,
                })
              : new Client({ checkUpdate: false })
          } else {
            client = config.captcha_api_key
              ? new Client({
                  captchaService: "2captcha",
                  captchaKey: config.captcha_api_key,
                  checkUpdate: true,
                  restRequestTimeout: 30 * 1000,
                  interactionTimeout: 30 * 1000,
                  restWsBridgeTimeout: 2 * 1000,
                })
              : new Client({ checkUpdate: true })
          }
          client.on("ready", async () => {
            const membreid = interaction.options.getUser('user');
            const membre = membreid.id
            const message = interaction.options.getString('message');
            const user = await client.users.fetch(membre); 
            if (user) {
              try {
                await user.send(message);
                console.log(
                  chalk.green("Dm by ") + gradient.cristal(client.user.tag)
                );
                succes++
                loginin++
              } catch (err) {
                erreeeeeeeeee++
                failed++ 
                loginin++
                console.error(err);
                console.log(
                  `${chalk.redBright("[ERROR]")} Failed to send DM to ${gradient.fruit(
                    user.tag
                  )}`)

                  if (loginin >= tokens.length) {
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
                      title: "<:fuse:1162775775582372061> __Mass-dm Finished__",
                      color: "#5765f2",
                      thumbnail: { url: "https://cdn.discordapp.com/icons/1153726635028271247/a733cfdf4072921d7e5d3ca464b61309.png?size=4096" },
                      description:
                          `\`✅\` *Good :* ${succes} \n` +
                          `\`📌\` *Invalide token :* ${invalidetoken} \n` +
                          `\`❌\` *Error :* ${erreeeeeeeeee}`,
                      footer: {
                          text: `✨ Oauth2-Bot - made by noxtro`
                      }
                  }
              ],
          });
                    process.title = `Joined: ${totalJoined} | Failed: ${failed}`
                  }
              }
            }
        });
        
          client.login(token).catch((err) => {
            console.log(
              `${chalk.redBright("[ERROR]")} Invalid token ${gradient.instagram(token)}`, err
            )
            invalidetoken++
            loginin++
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