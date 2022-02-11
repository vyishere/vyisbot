const Discord = require("discord.js");
const ms = require("ms");

exports.execute = async (client, message, args) => { 
  if (!message.member.hasPermission("MANAGE_MESSAGES")) 
  message.channel.send("no")
  else {
  const muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
  let muteMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!muteMember) return message.channel.send("**That user is not in this guild.**").then(msg => {
                    msg.delete({ timeout: 5000 })
            })
            if (muteMember === message.member) return message.channel.send("**You cannot mute yourself!**").then(msg => {
                    msg.delete({ timeout: 5000 })
            })

  //start of create role          

  if(!muterole){
    try {
 muterole = await message.guild.roles.create({
  data: {
   name: 'Muted',
   color: '#514f48',
   permissions: [],
  },
 });
 message.guild.channels.cache.forEach(async (channel, id) => {
  await channel.updateOverwrite(muterole, {
      SEND_MESSAGES: false,
      SPEAK: false,
      ADD_REACTIONS: false,
      SEND_TTS_MESSAGES: false,
      ATTACH_FILES: false 
  })
 });
}
 catch (e) {
 console.log(e.stack);}}
  //end of create role

  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(muteMember.roles.add(muterole.id));
  message.reply(`<@${muteMember.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    muteMember.roles.remove(muterole.id);
    message.channel.send(`<@${muteMember.id}> has been unmuted!`);
  }, ms(mutetime));
  }}

 //end of module

module.exports.help = {
  name: "mute",
  aliases: ["tm", "m"],
  usage: `mute`
}
