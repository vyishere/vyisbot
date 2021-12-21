const Discord = require("discord.js");
DisTube = require('distube');
const client = new Discord.Client();
const ms = require('ms')
const Eco = require("quick.eco");
const snipes = new Discord.Collection()
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: false, leaveOnEmpty: true, leaveOnFinish: true, leaveOnStop: true});
const { DiscordUNO } = require("discord-uno");
const discordUNO = new DiscordUNO();
client.eco = new Eco.Manager(); // quick.eco
client.db = Eco.db; // quick.db
const db = require('quick.db');
client.config = require("./botConfig");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const fs = require("fs");
const keep_alive = require('./keep_alive.js')
var spam = false

client.on('messageDelete', message => {
  snipes.set(message.channel.id, message)
})

client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: false });

client.distube

.on("playSong", (message, queue, song) => {
    let playingEmbed = new Discord.MessageEmbed()
    .setColor("#FFFF00")
    .setTitle(`🎵 Now Playing 🎵`)
    .setDescription(`[**${song.name} - ${song.formattedDuration}**](${song.url})`)
    .setFooter(`Requested by ${song.user.tag}`)
    message.channel.send(playingEmbed)
})
.on("addSong", (message, queue, song) => {
    let queueEmbed = new Discord.MessageEmbed()
    .setColor("#FFFF00")
        .setTitle(`✅ Added to the Queue ✅`)
    .setDescription(`[**${song.name} - ${song.formattedDuration}**](${song.url})`)
    .setFooter(`Requested by ${song.user.tag}`)
    message.channel.send(queueEmbed)
})
.on("playList", (message, queue, playlist, song) => {

    message.channel.send(`Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\``)
})
.on("addList", (message, queue, playlist) => message.channel.send(
    `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue`
))
// DisTubeOptions.searchSongs = true
.on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
})
// DisTubeOptions.searchSongs = true
.on("searchCancel", (message) => message.channel.send(`**Searching canceled!**`))
.on("error", (message, e) => {
    console.error(e)
});



client.on('ready', () => console.log("Distube is Active"))
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        const event = require(`./events/${f}`);
        let eventName = f.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        let command = require(`./commands/${f}`);
        client.commands.set(command.help.name, command);
        command.help.aliases.forEach(alias => {
            client.aliases.set(alias, command.help.name);
        });
    });
});

// --- uno command --

client.on("message", async message => { 
        //dont blame me im lazy to make like another 20000 commands with a handler lol
        if (message.content.toLowerCase() === "v!creategame") {
        await discordUNO.createGame(message);
    }
        if (message.content.toLowerCase() === "v!join")
        await discordUNO.addUser(message);
           
           
        if (message.content.toLowerCase() === "v!leave")
        await discordUNO.removeUser(message);

        if (message.content.toLowerCase() === "v!startgame")
        await discordUNO.startGame(message);

        if (message.content.toLowerCase() === "v!endgame")
        await discordUNO.endGame(message);


        if (message.content.toLowerCase() === "v!closegame")
        await discordUNO.closeGame(message);  

        if (message.content.toLowerCase().startsWith("v!unoplay"))
        await discordUNO.playCard(message);

        if (message.content.toLowerCase().startsWith("v!UNO"))
        await discordUNO.UNO(message);

        
        if (message.content.toLowerCase() === "v!draw")
        await discordUNO.draw(message);

        if (message.content.toLowerCase() === "v!cards")
        await discordUNO.viewCards(message);

        if (message.content.toLowerCase() === "v!table")
        await discordUNO.viewTable(message);

        if (message.content.toLowerCase() === "v!viewwinners")
        await discordUNO.viewWinners(message);

//miscellaneous
      
        if (message.content.toLowerCase() === "pingvylololol") {
          message.channel.send(`<@358904934282035211> <:ga:895234396649578526>`)
          message.channel.send(`<@358904934282035211> <:ga:895234396649578526>`)
          message.channel.send(`<@358904934282035211> <:ga:895234396649578526>`)
          message.channel.send(`<@358904934282035211> <:ga:895234396649578526>`)
          message.channel.send(`<@358904934282035211> <:ga:895234396649578526>`)
          message.channel.send(`<@358904934282035211> <:ga:895234396649578526>`)
        }

        if (message.content.toLowerCase() === "v!settings")
        await discordUNO.updateSetting(message);

// -- snipe command --

        if (message.content.toLowerCase() === "vy tell me what the hell did the other guy say")
        {let sniped = snipes.get(message.channel.id)
        if(!sniped) return message.channel.send('I have no idea lol')
        
        const snipeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFF00")
    .setAuthor("sussy message", message.author.avatarURL)
    .setDescription(sniped.content)
    .setFooter(`Message by ${sniped.author.tag}`)
    message.channel.send(snipeEmbed)
    
        
        }


        if (message.content.toLowerCase() === "v!viewsettings") 
        await discordUNO.viewSettings(message);

});
client.login(client.config.token);
