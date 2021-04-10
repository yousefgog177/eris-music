module.exports = {
name: "skipto",
aliases: [],
description: "skip to a song by the number",
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
if(!args[0]) return bot.createMessage(message.channel.id , `> **يرجي ادخال رقم الاغنية**`)
let num = Math.floor(args[0])
if(!num) return bot.createMessage(message.channel.id , `> **يرجي ادخال رقم صحيح**`)
let song = connection.songs[num - 1]
if(!song) return bot.createMessage(message.channel.id , `> **لم اتمكن من العثور علي هذه الاغنية**`)
connection.songs = connection.songs.slice(num - 1 , connection.songs.length)
connection.stopPlaying()
return bot.createMessage(message.channel.id , `> 🎵 **تم التخطي وجاري تشغيل : ${connection.now.title}**`)
}else{
return bot.createMessage(message.channel.id , `> **لا يوجد موسيقي تعمل**`)
}

}}