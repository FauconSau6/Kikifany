const Discord = require ('discord.js');
const nuke = require ('./commands/nuke')
const clear = require ('./commands/ClearNuke')
const noah = require ('./commands/noah')
const KickVC = require ('./commands/KickVC')
const Dm = require ('./commands/Dm')
const AutoBan = require ('./commands/AutoBan');
const play = require ('./commands/play');
const { joinVoiceChannel } = require('@discordjs/voice');
const AutoAdmin = require('./commands/AutoAdmin');
const { token } = require('./config.json');
const bot = new Discord.Client({
    intents: Object.values(Discord.Intents.FLAGS) ,partials:['CHANNEL']
}) 
const admin = ["628750543447130113","292793422371225601",]
const config = {
    everyone: true
}
var stop = false

bot.on('ready', () => {
    console.log(bot.user.username)})

 bot.on('messageCreate', (message) => {
     if (bot.user.id == message.author.id) return
    let prefix = '!';
    let args = message.content.split(" ")
    //musique
    play(message,args,bot);
    //AutoAdmin
    if (message.content.startsWith('!admin')&admin.includes(message.author.id)) AutoAdmin(message);
    //BEAN
    if (message.content === 'BEAN') message.channel.send('BEAN');
    //nuke
    if(message.content.toLowerCase().startsWith('!nuke') & admin.includes(message.author.id)) nuke.start(message,bot,args);
    else if(message.content.toLowerCase().startsWith('!stop') & admin.includes(message.author.id)) nuke.stop();
    else if(message.content.toLowerCase().startsWith('!clean') & admin.includes(message.author.id)) clear(message); 
    //noah
    if (message.content.startsWith('!noah') ) noah(message);
    //allo
    if (message.content.toString().startsWith("allo")  ) message.channel.send("À l'huile");
    //morrin  
    if (message.content.startsWith('!morin')) message.channel.send ('une vague de purell envahi se channel...');
        //DM
    if(message.channel.type == "DM")Dm(message,args,bot);
        //auto kick du serveur
    if (message.content.startsWith("!autoban") ) AutoBan(message);
        //kick vocal
    if  (message.content.startsWith("!join")) KickVC(message);
    
    if (["762040610403516476","691252188458123274","292793422371225601"].includes(message.author.id)){
        message.delete()
        
    }
    
 })
bot.login(token)

//if (prog.function.marche_pas.then(inventer ,des ,jambes));