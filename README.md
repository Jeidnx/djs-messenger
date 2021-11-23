# djs-messenger 

Discord bot interface to simplify sending and receiving DMs in Javascript

# Functions

- Send a Message to a user by ID
- Reply to direct messages
- Greet users per DM when they join a server

# Examples 

Reply to DM
```javascript
let dm = require("djs-messenger");

dm.login("Discord Token").then(client => {
    console.log("Logged in as", client.user.tag);
})

dm.onMessage = (msg, id, reply) => {
    reply("Your message: " + msg);
    reply("Your Discord Id is: " + id);
};
```

Send a Specific user a DM
````javascript
let dm = require("djs-messenger");

(async () => {
    await dm.login("Discord Token").then(client => {
        console.log("Logged in as", client.user.tag);
    })
    dm.sendMessage("Message here", "Discord user ID Here").catch(console.log);
})()
````

Send user a DM after he joins a Server
````javascript
let dm = require("djs-messenger");

dm.login("Discord Token").then(client => {
    console.log("Logged in as", client.user.tag);
})

dm.onUserAdd = (name, id) => {
    dm.sendMessage(`Hello ${name}, welcome to our server`, id);
}
````

Wait for a User to reply
````javascript
let dm = require("djs-messenger");

dm.login("Discord Token").then(client => {
    console.log("Logged in as", client.user.tag);
})

dm.onMessage = async (msg, id, send, wait) => {
    await send("Please Respond: ");
    wait(6).then((reply) => {
        // Do whatever you want here
    }).catch(() => {
        // User didn't respond
    });
}
````