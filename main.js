"use strict";
var { DateTime } = require("luxon");
const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token } = require("./config.json");

client.on("message", (message) => {
    if (!message.content.startsWith(prefix)) return;

    var content = message.content.split(" ");

    var finalMessage;

    var indianTime = DateTime.fromISO(`${content[1]}-07:00`);
    indianTime = `Indian Time: **${indianTime.toLocaleString(
        DateTime.DATETIME_FULL
    )}**\n\n Hello World`;

    message.channel.send(indianTime);

    //console.log(message);
});

client.login(token);
