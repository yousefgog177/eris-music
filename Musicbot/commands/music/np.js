module.exports = {
name: "nowplaying",
aliases: [ "np" ],
description: "show the current song",
cooldown: 5,
admin: false,
run: async(message , args , bot) =>{

if(!message.member || !message.member.voiceState || !message.member.voiceState.channelID) return bot.createMessage(message.channel.id , `> **يرجي منك دخول غرفة صوتية لتشغيل الموسيقي**`)
let connection = bot.voiceConnections.find(d => d.id == message.guildID)

if(connection){
if(connection.channelID !== message.member.voiceState.channelID) return bot.createMessage(message.channel.id , `> **يرجي منك دخول الغرفة الصوتية المدعوة ${bot.getChannel(connection.channelID) ? bot.getChannel(connection.channelID).name || "undefined" : "undefined"}**`)
}else{
return bot.createMessage(message.channel.id , `> **لا يوجد موسيقي تعمل**`)
}

if(!connection.now || !connection.playing){
return bot.createMessage(message.channel.id , `> **لا يوجد موسيقي تعمل**`)
}


let embed = {
title: connection.now.title.slice(0 , 250),
color: connection.now.type === "video" || connection.now.videoId ? 16711680 : 16737792,
description: bot.util.embedFormat(connection)
}

bot.createMessage(message.channel.id , {embed})


}}