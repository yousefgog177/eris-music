module.exports = {
name: "remove",
aliases: [],
description: "remove a song from the queue",
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

if((connection.songs.length > 0 || connection.now || connection.playing) && !connection.paused){
if(!message.member.permission.has("manageGuild")) return; 
if(!args[0]) return bot.createMessage(message.channel.id , `> **يجب عليك ادخال رقم الاغنية او all**`)

if(args[0].toLowerCase() === "all"){
connection.songs = []
return bot.createMessage(message.channel.id , `> **تم ازالة جميع القائمة**`)
}else{
let n = Math.floor(args[0])
if(!n || n === NaN) return bot.createMessage(message.channel.id , `> **يجب عليك ادخال تنسيق صحيح**`)
if(!connection.songs[n - 1]) return bot.createMessage(message.channel.id , `> **لم اعثر علي هذه الاغنية**`)
let song = connection.songs[n - 1]

connection.songs.splice(n - 1 ,1); 

return bot.createMessage(message.channel.id , `> **تم ازالة : ${song.title}**`)
}

}else{
return bot.createMessage(message.channel.id , `> **لا يوجد موسيقي تعمل**`)
}

}}