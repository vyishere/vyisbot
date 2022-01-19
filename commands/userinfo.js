exports.execute = (client,message,args,guild) => {
      const { MessageEmbed } = require("discord.js");
      const embed = new MessageEmbed()
const moment = require('moment');

const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if (!member) 
     return message.channel.send('Please mention the user for the userinfo..');
   const uiembed = new MessageEmbed() 
     .setTitle(`${member.displayName}'s Information`)
     .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
     .addField('User', member, true)
     .addField('Discriminator', `\`#${member.user.discriminator}\``, true)
     .addField('ID', `\`${member.id}\``, true)
     .addField('Bot', `\`${member.user.bot}\``, true)
     .addField('Highest Role', member.roles.highest, true)
     .addField('Joined server on', `\`${moment(member.joinedAt).format('MMM DD YYYY')}\``, true)
     .addField('Joined Discord on', `\`${moment(member.user.createdAt).format('MMM DD YYYY')}\``, true)
     .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
     .setTimestamp()
   message.channel.send(uiembed);
   }

exports.help = {
    name: "userinfo",
    aliases: ["ui","about"],
    usage: `userinfo`
}
