const Discord = require("discord.js")


exports.execute = (client, message, args, guilds) => {
        const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!mention) {
            const embed = new Discord.MessageEmbed()
                .setTitle(message.author.username)
                .setColor(0x00ffff)
                .setImage(message.author.displayAvatarURL({ format: 'png', size: 4096 }))
                .setTimestamp()
                .setFooter(message.author.username);
            return message.channel.send(embed);
        }
        
        const Embed = new Discord.MessageEmbed()
            .setTitle(`${mention.displayName}'s Avatar'`)
            .setColor(0x00ffff)
            .setImage(mention.user.displayAvatarURL({ format: 'png', size: 4096 }))
            .setTimestamp()
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }));
        return message.channel.send(Embed);

    },


exports.help = {
    name: "avatar",
    aliases: ["av", "ava", "pfp"],
    usage: `avatar [@user]`
}
