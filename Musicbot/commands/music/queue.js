module.exports = {
name: "queue",
aliases: ["q"],
description: "get the current queue of the songs",
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

let page = Number(args[0]) - 1 || 0
  
let embed = {
title: connection.now.title.slice(0 , 250),
color: connection.now.type === "video" || connection.now.videoId ? 16711680 : 16737792,
description:  connection.songs.slice((page * 8) , (page * 8) + 8).map(value => 
`> ${bot.util.numberFormat(connection.songs.indexOf(value) + 1)} ${value.type === "video" || value.videoId ? "🔴" : "🟠"} **${value.title}**`
).join("\n"),
	footer: {
		text: `الصفحة : ${page + 1}/${Math.ceil(connection.songs.length / 8)}`
  }
}

if(!embed.description || embed.description.length < 1) embed.description = "**هذه الصفحة غير موجودة**"

bot.createMessage(message.channel.id , {embed})

}}