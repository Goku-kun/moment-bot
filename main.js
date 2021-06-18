"use strict";
require("dotenv").config();
var { DateTime } = require("luxon");
const Discord = require("discord.js");
const client = new Discord.Client();
const { PREFIX, TOKEN } = process.env;

client.on("message", (message) => {
    if (!message.content.startsWith(PREFIX)) return;
    var receivedZone = "";
    if (message.content.includes("PST") || message.content.includes("PT")) {
        receivedZone = "PST";
    } else if (message.content.includes("EST") || message.content.includes("EDT")) {
        receivedZone = "EDT";
    } else if (message.content.includes("IST")) {
        receivedZone = "IST";
    } else {
        message.channel.send("No timezone available.");
        return;
    }

    var content = message.content.split(" ");

    try {
        if (receivedZone === "PST") {
            var pstTime = DateTime.fromISO(`${content[1]}T${content[2]}`);
            var indianTime = `${pstTime.plus({ hours: 12, minutes: 30 }).toFormat("ccc', ' FF")}`;
            var torontoTime = `${pstTime.plus({ hours: 3 }).toFormat("ccc', ' FF")}`;
            var finalTime = `Eastern Standard Time: **${torontoTime}**\n\nIndian Time: **${indianTime}**\n\n`;
            var title = "Respective Time for EST & IST";
        } else if (receivedZone === "EDT") {
            var edtTime = DateTime.fromISO(`${content[1]}T${content[2]}`);
            var indianTime = `${edtTime.plus({ hours: 9, minutes: 30 }).toFormat("ccc', ' FF")}`;
            var pLocalTime = `${edtTime.minus({ hours: 3 }).toFormat("ccc', ' FF")}`;
            var finalTime = `Pacific Time: **${pLocalTime}**\n\nIndian Time: **${indianTime}**\n\n`;
            var title = "Respective Time for PT & IST";
        } else {
            var istTime = DateTime.fromISO(`${content[1]}T${content[2]}`);
            var pLocalTime = `${istTime.minus({ hours: 12, minutes: 30 }).toFormat("ccc', ' FF")}`;
            var edtLocalTime = `${istTime.minus({ hours: 9, minutes: 30 }).toFormat("ccc', ' FF")}`;
            var finalTime = `Pacific Time: **${pLocalTime}**\n\nEastern Standard Time: **${edtLocalTime}**\n\n`;
            var title = "Respective Time for PT & EST";
        }

        const newEmbed = new Discord.MessageEmbed()
            .setTitle(title)
            .setColor("0xff0000")
            .setDescription(finalTime);

        message.channel.send(newEmbed);
    } catch (e) {
        console.error(e.message);
    }
});

client.login(TOKEN);
