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
            if(!["",].includes(userId))
                //put your user id in "" to not get kicked out of the vc
             message.guild.members.cache.get(userId).voice.disconnect()
            
            
        })
    }
   
}
