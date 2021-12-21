const Discord = require("discord.js")


exports.execute = (client, message, args) => {
        if (!message.mentions.users.size) {
            const embed = new Discord.MessageEmbed()
                .setTitle(message.author.username)
                .setColor(0x00ffff)
                .setImage(message.author.displayAvatarURL({ format: 'png', size: 4096 }));
            return message.channel.send(embed);
        }

        const mention = message.mentions.members.first();
        const Embed = new Discord.MessageEmbed()
            .setTitle(message.mentions.users.first().username)
            .setColor(0x00ffff)
            .setImage(mention.user.displayAvatarURL({ format: 'png', size: 4096 }));
        return message.channel.send(Embed);

    },


exports.help = {
    name: "avatar",
    aliases: ["a", "ava", "pfp"],
    usage: `avatar`
}
