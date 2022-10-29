module.exports = function (message,args,bot){
    if (args[0]== 'DM'& message.author.id == ''){
        //put your discord ID in the ''
        const user = bot.users.cache.get(args[1])
        if (user == undefined) return message.channel.send("j'ai pas trouvé l'utilisateur");
        user.send(message.content.slice(args[0].length + args[1].length + 2)) 
        message.channel.send('**Envoyer**')}
        else{
            bot.users.cache.get("").send(message.author.username +": "+ message.content)
            //put your discord id in the ""
        }
}
