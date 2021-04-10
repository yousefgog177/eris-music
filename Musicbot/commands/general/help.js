module.exports = {
name: "help",
aliases: [],
description: "to get bot's help panel",
cooldown: 20,
admin: false,
run: async(message , args , bot) =>{

let cmds = {}
let helpString = ``

for(let cmd of bot.commands){
if(!cmds[cmd.dir]) { cmds[cmd.dir] = [] }
cmds[cmd.dir].push(cmd)
}

Object.keys(cmds).forEach(dir =>{
helpString += `\n> **${dir}**
${cmds[dir].map(v => `**${message.prefix}${v.name} ${v.aliases.length > 0 ? `( ${v.aliases.join(",")} ) ` : ""}** ${v.description}`).join("\n")}`
})

bot.createMessage(message.channel.id , helpString)
}}