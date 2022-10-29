module.exports = function (message,args,bot){
    if (args[0]== 'DM'& message.author.id == '292793422371225601'){
        const user = bot.users.cache.get(args[1])
        if (user == undefined) return message.channel.send("j'ai pas trouvé l'utilisateur");
        user.send(message.content.slice(args[0].length + args[1].length + 2)) 
        message.channel.send('**Envoyer**')}
        else{
            bot.users.cache.get("292793422371225601").send(message.author.username +": "+ message.content)
        }
}