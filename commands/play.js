const ytdl = require("ytdl-core")
const discord = require("discord.js")
const _voice = require("@discordjs/voice")
const yts = require( 'yt-search' )
const map = new Map;
const queue = new Map
module.exports = async function(message,args,bot){
    if (args[0] === '!play') {
        let search = message.content.slice(args[0].length)
        if (search.length<1) return
        const voice = message.member.voice.channel
        if (!voice) {
            message.reply('You need to be in a voice channel to use this command!')
        }
        else {
            let channel = voice
            if (!map.get(channel.guild.id)){
                map.set(channel.guild.id,_voice.createAudioPlayer());
                queue.set(message.guild.id,[])
                
                map.get(channel.guild.id).on('stateChange', (oldstate, newState) => {
                    if(oldstate.status == 'playing'&newState.status == 'idle') {
                        if (queue.get(message.guild.id)== undefined) return 
                        if(queue.get(message.guild.id).length < 1) return
                        queue.get(message.guild.id).shift()
                        if(queue.get(message.guild.id).length < 1) return
                        const stream = ytdl(queue.get(message.guild.id)[0].url, {filter: 'audioonly'}) 
                        const resources = _voice.createAudioResource(stream)
                        map.get(channel.guild.id).play(resources);
                    }
                })
            }
            
           /* map.get(message.guild.id).on('error', error => {
                console.log('error')
                map.get(message.guild.id).stop();
            }); */
            const connection = _voice.joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
             
            const r = await yts (search)
            let error = new discord.MessageEmbed
            error.title = '404 not found'; error.color = '#FF0000'
            if(r.videos.at(0)== undefined) return message.channel.send({embeds:[error]})
            const subscription = connection.subscribe(map.get(channel.guild.id));
            
            queue.get(message.guild.id).push(r.videos.at(0))
           if (queue.get(message.guild.id).length == 1){
                const stream = ytdl(queue.get(message.guild.id)[0].url, {filter: 'audioonly'})
                const resources = _voice.createAudioResource(stream)
                map.get(channel.guild.id).play(resources);
                let embed = new discord.MessageEmbed
                embed.title = 'Now playing :musical_note: ';embed.description = r.videos.at(0).title; embed.color = '#00CD00'
                message.channel.send({
                    embeds: [embed]
                    
                })
            }
                else{
                    let embed = new discord.MessageEmbed
                embed.title = 'Added to queue :musical_note: ';embed.description = r.videos.at(0).title; embed.color = '#00CD00'
                message.channel.send({
                    embeds: [embed]
                    
                })
                }
            
        }
    }
    if (args[0] === '!stop') {
        let voice = bot.guilds.cache.get(message.guild.id).members.cache.get(bot.user.id).voice.channel
       if (voice) {
            let voiceuser = message.member.voice.channel
            if (voiceuser ==undefined) return 
             if (voiceuser.id!==voice.id) return 
       }
        let id = message.guild.id
        if (map.get(id)){map.get(id).stop()
            map.delete(id)
            queue.delete(id)
        let embed = new discord.MessageEmbed
        embed.title = 'Stopped :stop_button: ';embed.color = '#FF0000'
            message.channel.send({
                embeds: [embed]})}
    }
    if (args[0]=== '!queue'){
        var list = 'Now playing: '
        let id = message.guild.id
        
        if (!queue.get(id)){
            let noqueue = new discord.MessageEmbed
            noqueue.title = 'There is no queue yet';noqueue.color = '#E5E5E5';
                message.channel.send({
                    embeds: [noqueue]})
          return
        }
        queue.get(id).forEach((element,index) => {
          if (index == 0)  list += element.title+'\n'
          else list +=index+'. '+ element.title+'\n'
        });
        let embed = new discord.MessageEmbed
        embed.title = 'Queue';embed.color = '#22BADD'; embed.description = list
            message.channel.send({
                embeds: [embed]})
    }





    if (args[0] === '!skip') {
        let voice = bot.guilds.cache.get(message.guild.id).members.cache.get(bot.user.id).voice.channel
       if (voice) {
            let voiceuser = message.member.voice.channel
            if (voiceuser ==undefined) return 
             if (voiceuser.id!==voice.id) return 
       }
        let id = message.guild.id
        if (map.get(id)){map.get(id).stop()
        let embed = new discord.MessageEmbed
        embed.title = 'Skipped :fast_forward: ';embed.color = '#E6E600'
            message.channel.send({
                embeds: [embed]})}
    }
    if (args[0] === '!pause') {
        let voice = bot.guilds.cache.get(message.guild.id).members.cache.get(bot.user.id).voice.channel
       if (voice) {
            let voiceuser = message.member.voice.channel
            if (voiceuser ==undefined) return 
             if (voiceuser.id!==voice.id) return 
       }
        let id = message.guild.id
        if (map.get(id)){ map.get(id).pause()
        let embed = new discord.MessageEmbed
        embed.title = 'Paused :pause_button: ';embed.color = '#FF0000'
            message.channel.send({
                embeds: [embed]})}
    }
    if (args[0] === '!resume') {
        let voice = bot.guilds.cache.get(message.guild.id).members.cache.get(bot.user.id).voice.channel
        if (voice) {
             let voiceuser = message.member.voice.channel
             if (voiceuser ==undefined) return 
              if (voiceuser.id!==voice.id) return 
        }
        let id = message.guild.id
        if (map.get(id)){ map.get(id).unpause()
        let embed = new discord.MessageEmbed
        embed.title = 'Resuming :arrow_forward: ';embed.color = '#00CD00'
            message.channel.send({
                embeds: [embed]})}
    }
    if (args[0] === '!leave') {
        let voice = bot.guilds.cache.get(message.guild.id).members.cache.get(bot.user.id).voice.channel
        if (voice) {
             let voiceuser = message.member.voice.channel
             if (voiceuser ==undefined) return 
              if (voiceuser.id!==voice.id) return 
        }
      let connection = _voice.getVoiceConnection(message.guild.id)
        let id = message.guild.id
       if (map.get(id)){
        map.get(id).stop()
        map.delete(id)
        queue.delete(id)
       } 
       
       if (connection){ connection.destroy()
        let embed = new discord.MessageEmbed
        embed.title = 'Succesfully left the channel :stop_button: ';embed.color = '#FF0000'
        message.channel.send({
            embeds: [embed]})}
    }
}