module.exports = {
name: "stop",
aliases: [],
description: "stops the current song and clear the queue and leave the room",
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
connection.songs = []
connection.stopPlaying();
bot.leaveVoiceChannel(connection.channelID)
return bot.createMessage(message.channel.id , `> **تم ايقاف الموسيقي**`)
}else{
return bot.createMessage(message.channel.id , `> **لا يوجد موسيقي تعمل**`)
}

}}