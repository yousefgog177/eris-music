module.exports = {
name: "ping",
aliases: [],
description: "to get bot's connection speed",
cooldown: 20,
admin: false,
run: async(message , args , bot) =>{
bot.createMessage(message.channel.id , 'Pong...').then((msg) => {
      msg.edit(`Pong...  -  Time taken: **${msg.createdAt - message.createdAt} ms**`);
 })
}

}
