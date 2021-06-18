"use strict";
require("dotenv").config();
var { DateTime } = require("luxon");
const Discord = require("discord.js");
const client = new Discord.Client();
const { PREFIX, TOKEN } = process.env;

client.on("message", (message) => {
    if (!message.content.startsWith(PREFIX)) return;

    var content = message.content.split(" ");

    try {
        var test = DateTime.fromISO(`${content[1]}T${content[2]}`, { zone: "pst" });
        var indianZone = test.setZone("UTC+5:30");
        var torontoZone = test.setZone("UTC-4:00");

        var indianTime = `${indianZone.toFormat("ccc', ' FF")}`;
        var torontoTime = `${torontoZone.toFormat("ccc ', ' FF")}`;

        var finalTime = `Eastern Standard Time: **${torontoTime}**\n\nIndian Time: **${indianTime}**\n\n`;

        message.channel.send(finalTime);
    } catch (e) {
        console.error(e.message);
    }
});

client.login(TOKEN);
