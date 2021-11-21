const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.DIRECT_MESSAGES], partials: ["CHANNEL"]});

let logon = false;

/**
 *
 * @param msg Discord Message object
 */
function onMessage(msg){}

module.exports = {
    sendMessage: sendMessage,
    login: login,
    onMessage: onMessage
}

client.on("warn", console.warn);
client.on("error", console.error);
client.on("messageCreate", (message) => {
    if(message.author.bot) return;

    async function reply(msg){
        if(!message.author.dmChannel){
            await message.author.createDM();
        }
        await message.author.dmChannel.send(msg);
    }

   module.exports.onMessage(message.content, reply);
})




/**
 * Sends a DM to the specified user
 * @param message{String} Message to send
 * @param id{String} Discord user ID as String
 */
function sendMessage(message, id){
    return new Promise(async (resolve, reject) => {
        if(!logon){
            reject("Bot is not Logged in.");
            return;
        }
        let user = await client.users.fetch(id).catch(reject);
        if(!user.dmChannel){
            await user.createDM().catch(reject);
        }
        user.dmChannel.send(message).catch(reject);
        resolve();
    })
}

/**
 * Login Bot
 * @param token Discord Bot Token
 */
function login(token){
    return new Promise((resolve, reject) => {
        client.login(token).then(() => {
            logon = true;
            resolve(client);
        }).catch(reject);
    })
}