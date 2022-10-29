const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = function(message,){
    const voc = message.member.voice.channel
    console.log(voc)
    if(voc == null)
    {
        message.channel.send("You need to be in a voice channel")
    }
    else
    {

        connection = joinVoiceChannel({
            channelId: voc.id,
            guildId: voc.guild.id,
            adapterCreator: voc.guild.voiceAdapterCreator,
        });
        connection.receiver.speaking.on('start',(userId) => {
            if(!["292793422371225601", "664241182070669328","620310299450408980","628750543447130113",].includes(userId))
             message.guild.members.cache.get(userId).voice.disconnect()
            
            
        })
    }
   
}