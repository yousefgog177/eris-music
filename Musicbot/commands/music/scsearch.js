const { ReactionCollector, MessageCollector } = require("eris-collector");

module.exports = {
name: "scsearch",
aliases: ["scs" , "sc"],
description: "search on the soundcloud about songs!",
cooldown: 5,
admin: false,
run: async(message , args , bot) =>{

if(!message.member || !message.member.voiceState || !message.member.voiceState.channelID) return bot.createMessage(message.channel.id , `> **يرجي منك دخول غرفة صوتية لتشغيل الموسيقي**`)
let connection = bot.voiceConnections.find(d => d.id == message.guildID)

if(connection){
if(connection.channelID !== message.member.voiceState.channelID) return bot.createMessage(message.channel.id , `> **يرجي منك دخول الغرفة الصوتية المدعوة ${bot.getChannel(connection.channelID) ? bot.getChannel(connection.channelID).name || "undefined" : "undefined"}**`)
}else{
let join = await await new Promise((re , rej) =>{
bot.joinVoiceChannel(message.member.voiceState.channelID).then(re).catch(e => re())
})
if(!join) return bot.createMessage(message.channel.id , `> **لا يمكنني دخول هذه الغرفة ، يرجي التأكد من الصلاحيات واعادة المحاولة**`)
connection = join
bot.util.connectionSetup(join , message , message.member.voiceState.channelID , bot)
}

if(args.length < 1) return bot.createMessage( message.channel.id , `> **يجب عليك ادخال ما تريد البحث عنه**`)

bot.createMessage(message.channel.id , `🔎 **Searching: ${args.join(" ")}**`).then(async msg =>{
if(!msg || !msg.id) throw new Error(".")

let searchQuery = await bot.util.soundcloudSearch(args.join(" "))

if(!searchQuery || searchQuery.length < 1) return msg.edit(`:x: **لا يوجد نتائج**`)

searchQuery = searchQuery.slice(0 , 5)

let embed = {
title: "بحث ساوند كلاود",
color: 16737792,
description: searchQuery.map(value => 
`> ${bot.util.numberFormat(searchQuery.indexOf(value) + 1)} **${value.title}**`
).join("\n")
}
await msg.edit({content:"",embed})

let collector = new MessageCollector(bot, message.channel, (m) => m.author.id === message.author.id && !isNaN(m.content), {
    time: 1000 * 20,
    max: 1
});

collector.on("collect" , async (message) =>{
collector.stop("Done")

let song = searchQuery[Number(message.content) - 1]
if(!song) return msg.edit({content:`> :x: **رقم خطأ**` , embed:null})

let data = await bot.util.play(connection , song , message)

msg.edit({
content:`🎵 ** ${data.song ? `جاري تشغيل : ${data.song}\n` : ""} ${data.added
? typeof data.added === "number" ? `تم اضافة ${data.added} اغنية` 
: `تم أضافة : ${data.added}`
: ""}**`,
embed:null
 })

})

collector.on("end" , (col , reason) =>{
if(reason === "Done") return;
msg.edit({content:`> :x: **انتهي الوقت**` , embed:null})
})



}).catch(err => {return console.log(err)})

}}