const Discord = require("discord.js");
      DisTube = require('distube'); //TOTALLY NOT COPIED FROM CATTO SHUT :SOB:
const client = new Discord.Client({ disableMentions: 'everyone' });
const Eco = require("quick.eco");
 //OH MY GOD IM SUCH AN IDIOT
//FIX THE COOOOOOOOOOOOOOOOOOODE
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });
const { DiscordUNO } = require("discord-uno");
const discordUNO = new DiscordUNO();
//YOU FORGOR THE .catch() COMMAND
client.eco = new Eco.Manager(); // quick.eco
client.db = Eco.db; // quick.db
client.config = require("./botConfig");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const fs = require("fs");
const keep_alive = require('./keep_alive.js')

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


client.on("message", async message => {
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

        if (message.content.toLowerCase() === "v!settings")
        await discordUNO.updateSetting(message);

        if (message.content.toLowerCase() === "v!viewsettings") 
        await discordUNO.viewSettings(message);

});
//holy shit
//how do we do uno help now
client.login(client.config.token);
