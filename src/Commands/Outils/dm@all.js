const { WebhookClient, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
let contactedMembers = new Set();

class command {
    constructor() {
        this.name = "dm-all",
        this.description = "Permet de dm@all un serveur avec tous les tokens (faire ta pub)",
        this.options = [
            {
                name: 'server_id',
                description: 'le serveur a dm',
                type: 'STRING',
                required: true,
            },
            {
                name: 'message',
                description: 'le message a dm',
                type: 'STRING',
                required: true,
            },
            {
                name: 'temps_du_dm',
                description: 'Le temps du dm-all en minute ex 5minute = 5',
                type: 'INTEGER',
                required: true,
            },
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
            
        const HttpsProxyAgent = require("https-proxy-agent")
        //read from tokens.txt
        
        console.log(gradient.rainbow("Token Joiner by nightfox"))
        
        async function readTokens() {
            const tokens = fs.readFileSync("/home/container/tokens.js").toString().split("\n");
        
            for (const token of tokens) {
                if (typeof token === 'string') {
                    if (succes >= tokens.length) {
                        break;
                    }
        
                    await new Promise((resolve) => setTimeout(resolve, 3500));
                    doEverything(token.trim().replace("\r", "").replace("\n", ""), tokens);
                }
            }
        }
        
        const serverid = interaction.options.getString('server_id');
        const messagetodm = interaction.options.getString('message');
          interaction.reply({
            embeds: [
                {
                    title: "\`✅\` __Le serveur est en train de ce faire dm !__",
                    color: "#5765f2",
                    thumbnail: {url: "https://cdn.discordapp.com/icons/1153726635028271247/a733cfdf4072921d7e5d3ca464b61309.png?size=4096"},
                    description:
                    `Tous les tokens sont désormais en train de d'envoyer le message \`${messagetodm}\` a tous les users du serveur avec l'id \`${serverid}\``,
                    footer: {
                        text: `✨ Token-spamer - made by nightfox`
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
            let timeoutId;
            const messagetodm = interaction.options.getString('message');
            const guildId = interaction.options.getString('server_id');
            const guild = await client.guilds.fetch(guildId);
          const tempsdudm = interaction.options.getInteger('temps_du_dm');
            const filePathNoDM = '/home/container/nodm.txt';
            let noDMIds = [];
        
            try {
                const fileContentNoDM = fs.readFileSync(filePathNoDM, 'utf8');
                noDMIds = fileContentNoDM.split('\n').map(id => id.trim());
            } catch (error) {
                console.error('Erreur lors de la lecture du fichier nodm.txt :', error);
            }
            const sendRandomDM = async () => {
                if (stopSendingMessages) {
                    clearTimeout(timeoutId);
                    return;
                }
                const members = await guild.members.fetch();
                const filteredMembers = members.filter(member =>
                    !noDMIds.includes(member.user.id) &&
                    !contactedMembers.has(member.user.id) &&
                    !member.user.bot 
                );
                const randomMember = filteredMembers.random();
            
                if (randomMember && randomMember.user) {
                  setTimeout(function() {
                    const messageContent = messagetodm;
                     randomMember.user.send(`${messageContent}`)
                        .then(() => {
                            console.log(`${randomMember.user.tag} a été DM.`);
                            contactedMembers.add(randomMember.user.id);
                        })
                        .catch((error) => {
console.log(error)
                        });
                }, 5000);
                }
            };

            const interval = 1000; 
            const duration = tempsdudm * 60 * 1000; 
            const repetitions = Math.floor(duration / interval);
        
            for (let i = 0; i < repetitions; i++) {
                setTimeout(sendRandomDM, i * interval);
            }
        
            timeoutId = setTimeout(() => {
                stopSendingMessages = true;
                console.log("stop");
            }, duration);
        });
        
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