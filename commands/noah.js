module.exports = function(message,){
    message.channel.send("Tout le monde t'aime sauf...");
    setTimeout(() => {
        message.channel.send('TI')
    
    }, 7000);
    setTimeout(() => {
        message.channel.send('FA')
        
    }, 7000);
    setTimeout(() => {
        message.channel.send('NY')
    }, 7000);
    
}