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
        var pstTime = DateTime.fromISO(`${content[1]}T${content[2]}`);
        var indianTime = `${pstTime.plus({ hours: 12, minutes: 30 }).toFormat("ccc', ' FF")}`;
        var torontoTime = `${pstTime.plus({ hours: 3 }).toFormat("ccc', ' FF")}`;
        var finalTime = `Eastern Standard Time: **${torontoTime}**\n\nIndian Time: **${indianTime}**\n\n`;

        const newEmbed = new Discord.MessageEmbed()
            .setTitle("Respective Times for EST & IST")
            .setColor("0xff0000")
            .setDescription(finalTime);

        message.channel.send(newEmbed);
    } catch (e) {
        console.error(e.message);
    }
});

client.login(TOKEN);
