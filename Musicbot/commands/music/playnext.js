module.exports = {
name: "playnext",
aliases: [],
description: "play a music from youtube search (query - url) or from soundcloud by the link after the current song",
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

if((connection.songs.length > 0 || connection.now || connection.playing) && !connection.paused){}else{
return bot.createMessage(message.channel.id , `> **لا يوجد موسيقي تعمل**`)
}

if(args.length < 1) return bot.createMessage( message.channel.id , `> **تشغيل الاغاني**
**${message.prefix}play** رابط اليوتيوب
**${message.prefix}play** رابط الساوند كلاود
**${message.prefix}play** بحث اليوتيوب 
`)

bot.createMessage(message.channel.id , `🔎 **Searching: ${args.join(" ")}**`).then(async msg =>{
if(!msg || !msg.id) throw new Error(".")

let searchQuery = await bot.util.search(args.join(" "))

if(!searchQuery) return msg.edit(`:x: **لا يوجد نتائج**`)

let data = await bot.util.play(connection , searchQuery , message , true)

msg.edit(`🎵 ** ${data.song ? `جاري تشغيل : ${data.song}` : ""} \n${data.added
? typeof data.added === "number" ? `تم اضافة ${data.added} اغنية` 
: `تم أضافة : ${data.added}`
: ""}**`)

}).catch(err => {return console.log(err)})

}}