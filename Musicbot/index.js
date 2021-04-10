const eris = require("eris")
const fs = require("fs")

module.exports = class extends eris {

constructor(token , options , MusicConfig) {
super(token , options);

this.MusicConfig = MusicConfig
this.util = require("./utils")

this.commands = []
this.cooldowns = {}

this.getPrefix = (guildID) => MusicConfig.prefix
this.admins = MusicConfig.admins || []

    fs.readdirSync(__dirname + "/commands/").forEach(dir => {
        const commands = fs.readdirSync(__dirname + `/commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let command = require(`./commands/${dir}/${file}`);
            if (command.name) {
                this.commands.push(Object.assign(command , {dir}));
            }
        }
    })
  
const events = fs.readdirSync(__dirname + `/events/`).filter(file => file.endsWith(".js"));
for (let file of events) {
let event = require(`./events/${file}`)
let eve = new event(this , file.split(".js").join(""))
}

this.connect();
}

}