module.exports = {
name: "volume",
aliases: [ "vol" , "v" ],
description: "change the volume of the player",
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

let vol = args[0]
if(!vol) return bot.createMessage(message.channel.id , `> ${bot.util.vol(connection.volume * 100)} **مستوي الصوت الحالي : ${connection.volume * 100}**`)
vol = Math.floor(vol)
if(!vol || vol === NaN) return bot.createMessage(message.channel.id , `> **يجب ان تدخل تنسيق صوت صحيح**`)
if(0 > vol || vol > 150) return bot.createMessage(message.channel.id , `> **يجب ان ينحصر الصوت بين 0 - 150**`)

connection.setVolume(vol / 100)

return bot.createMessage(message.channel.id , `> ${bot.util.vol(vol)} **تم تغيير مستوي الصوت : ${vol}/150**`)
}else{
return bot.createMessage(message.channel.id , `> **لا يوجد موسيقي تعمل**`)
}

}}
