const canvacord = require("canvacord");
var baseConvert = require('baseconvert');

module.exports = {
name: "xp",
aliases: [],
description: "",
cooldown: 1,
admin: false,
run: async(message , args , bot) =>{


const rank = new canvacord.Rank()
    .setAvatar(message.author.avatarURL)
    .setCurrentXP(302)
    .setRequiredXP(1000)
    .setStatus("online" , true)
    .setProgressBar(["#FFFFFF", "#F8C300"], "GRADIENT")
    .setUsername(message.author.username)
    .setDiscriminator(message.author.discriminator)
   .setBackground("IMAGE" , "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg")


rank.build()
    .then(data => {
console.log("test")
message.channel.createMessage({} , {file:data , name: "rank.gif"})
    }).catch(console.log)


}}
