module.exports = {
  name: "ready",
  execute(bot) {
    const gradient = require("gradient-string");
    const chalk = require("chalk");
    const config = require("../../config.js");
    const { Client } = require("discord.js-selfbot-v13");

    const HttpsProxyAgent = require("https-proxy-agent");
    const fs = require("fs");

    const path = require("path");
    console.log("\x1b[34m%s\x1b[0m", `Tous les tokens sont en ligne ! `);
    async function readTokens() {
      const tokenfiles = path.join(__dirname, "../../tokens.js");
      const fileContent = fs.readFileSync(tokenfiles, "utf-8");
      const tokens = fileContent.split("\n");

      for (i in tokens) {
        await new Promise((resolve) =>
          setTimeout(resolve, i * config.joinDelay)
        );
        doEverything(
          tokens[i]?.trim()?.replace("\r", "")?.replace("\n", ""),
          tokens
        );
      }
    }
    readTokens();
    const proxiesfiles = path.join(__dirname, "../../proxies.txt");
    const proxiesContent = fs.readFileSync(proxiesfiles, "utf-8");
    const proxies = proxiesContent.split("\n");

    async function doEverything(token, tokens) {
      const randomProxy = proxies[Math.floor(Math.random() * proxies.length)]
        ?.replace("\r", "")
        ?.replace("\n", "");
      var client;
      if (config.useProxies) {
        var agent = HttpsProxyAgent(randomProxy);
        client = config.captcha_api_key
          ? new Client({
              captchaService: config.captcha_service,
              captchaKey: config.captcha_api_key,
              checkUpdate: false,
              http: { agent: agent },
              captchaWithProxy: true,
              proxy: randomProxy,
              restRequestTimeout: 10 * 1000,
              interactionTimeout: 10 * 1000,
              restWsBridgeTimeout: 10 * 1000,
            })
          : new Client({ checkUpdate: false });
      } else {
        client = config.captcha_api_key
          ? new Client({
              captchaService: config.captcha_service,
              captchaKey: config.captcha_api_key,
              checkUpdate: false,
            })
          : new Client({ checkUpdate: false });
      }
      client.login(token).catch((err) => {
        console.log(
          `${chalk.redBright("[ERROR]")} Invalid token ${gradient.instagram(
            token
          )}`,
          err
        );
      });
    }
  },
};
