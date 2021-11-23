const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS], partials: ["CHANNEL"]});

let logon = false;
let awaitingReply = {};

/**
 *
 * @param msg Discord Message object
 * @param id User ID
 * @param reply Function to reply to the user
 * @param waitFor Function to wait for the user to reply
 */
function onMessage(msg, id, reply, waitFor){}


/**
 *
 * @param name Discord name
 * @param id Discord Id
 */
function onUserAdd(name, id){}

module.exports = {
    sendMessage: sendMessage,
    login: login,
    onMessage: onMessage,
    onUserAdd: onUserAdd,
}

client.on("warn", console.warn);
client.on("error", console.error);
client.on("messageCreate", (message) => {
    if(message.author.bot) return;
    if(message.inGuild()) return;
    if(awaitingReply[message.author.id]) return;

    /**
     *
     * @param seconds Time to wait
     * @returns {Promise<String>} Message the user has replied with
     */
    function waitFor(seconds){
        return new Promise(async (resolve, reject) => {
            awaitingReply[message.author.id] = true;
            if(!message.author.dmChannel){
                await message.author.createDM();
            }
            message.author.dmChannel.awaitMessages({ max: 1, time: seconds * 100, errors: ['time'] }).then(collected => {
                resolve(collected.entries().next().value[1].content);
                delete awaitingReply[message.author.id];
            }).catch(() => {
                reject("No Reply");
                delete awaitingReply[message.author.id];
            });
        })
    }

    /**
     *
     * @param msg Message to send the user
     * @returns {Promise<void>} Resolves when message is sent.
     */
    async function reply(msg){
        if(!message.author.dmChannel){
            await message.author.createDM();
        }
        await message.author.dmChannel.send(msg);
    }

   module.exports.onMessage(message.content, message.author.id, reply, waitFor);
})

client.on("guildMemberAdd", (member) => {
    module.exports.onUserAdd(member.displayName, member.id,);
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