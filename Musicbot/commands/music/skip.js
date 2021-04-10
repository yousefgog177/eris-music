module.exports = {
name: "skip",
aliases: [],
description: "skips the current song",
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

if(!message.member.permission.has("manageGuild")) { 

let channel = bot.getChannel(connection.channelID)
let memberCount = Math.round(channel.voiceMembers.filter(d => !d.bot && d.id !== bot.user.id).length)

memberCount = memberCount < 1 ? 1 : memberCount

if(connection.votes.includes(message.author.id)) return bot.createMessage(message.channel.id , `> **لقد قمت بالتصويت بالفعل**`)
connection.votes.push(message.author.id)
if(connection.votes.length >= memberCount) {
connection.skip = true
await connection.stopPlaying();
return bot.createMessage(message.channel.id , `> 🎵 **تم التخطي وجاري تشغيل : ${connection.now.title}**`)
}

return bot.createMessage(message.channel.id , `> 🎵 **تم التصويت للتخطي : ${connection.votes.length++}/${memberCount}**`)
}else{
connection.skip = true
await connection.stopPlaying();
return bot.createMessage(message.channel.id , `> 🎵 **تم التخطي وجاري تشغيل : ${connection.now.title}**`)
} 

}else{
return bot.createMessage(message.channel.id , `> **لا يوجد موسيقي تعمل**`)
}


}}