module.exports = function(message,){
    message.channel.send('BAN')
    message.author.send("tu l'as cherché").then(msg =>  message.guild.members.cache.get(message.author.id).kick('la commande à encore frappé...') )
}