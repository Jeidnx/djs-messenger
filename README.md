# djs-messenger 

Discord bot interface to simplify sending and receiving DMs in Javascript

# Examples 

Respond to every DM with the same Message
```
let dm = require("djs-messenger");

dm.onMessage = (msg, id, reply) => {
    reply(msg);
};

discord.login("Discord Token").then(client => {
    console.log("Logged in as", client.user.tag);
})
```

Send a Specific user a DM

````
let dm = require("djs-messenger");

(async () => {
    await dm.login("Discord Token").then(client => {
        console.log("Logged in as", client.user.tag);
    })
    dm.sendMessage("Message here", "Discord user ID Here").catch(console.log);
})()
````