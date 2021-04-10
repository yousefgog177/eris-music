module.exports = {
name: "repeat",
aliases: ["loop"],
description: "repeat the current song or the current queue",
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

if(connection.repeating === 0) {
connection.repeating = 1
return bot.createMessage(message.channel.id , `> :repeat_one: **سيتم اعادة تشغيل الاغنية الحالية**`)
}else
if(connection.repeating === 1) {
connection.repeating = 2
return bot.createMessage(message.channel.id , `> :repeat: **سيتم اعادة قائمة التشغيل كاملة**`)
}else{
connection.repeating = 0
return bot.createMessage(message.channel.id , `> :musical_note: **تم ايقاف الاعادة**`)
}

}else{
return bot.createMessage(message.channel.id , `> **لا يوجد موسيقي تعمل**`)
}

}}