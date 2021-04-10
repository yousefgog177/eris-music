const Eris = require("eris")

module.exports = class {

constructor(bot , name) {
this.ocooldown = {}
this.cooldowns = 120 * 1000
this.bot = bot
this.bot.on(name , (message) => this.run(message))
}

async run(message) {

if (message.author.bot || !message.guildID) return;

let prefix = this.bot.getPrefix(message.guilID)

if(!message.content.startsWith(prefix)) return;



	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = this.bot.commands.find(cmd => cmd.name === commandName || (cmd.aliases && cmd.aliases.includes(commandName)));

	if (!command) return;


if(command.admin && !this.bot.admins.includes(message.author.id)) return;



	let cooldownAmount = (command.cooldown || 0) * 1000;

    if(!this.bot.cooldowns[message.guildID]) { this.bot.cooldowns[message.guildID] = {} }
    if(!this.bot.cooldowns[message.guildID][command.name]) { this.bot.cooldowns[message.guildID][command.name] = {} }
    if(!this.bot.cooldowns[message.guildID][command.name][message.author.id] || this.bot.cooldowns[message.guildID][command.name][message.author.id] < Date.now()){
        this.bot.cooldowns[message.guildID][command.name][message.author.id] = Date.now() + cooldownAmount
    }else{
        const timeLeft = (this.bot.cooldowns[message.guildID][command.name][message.author.id] - Date.now()) / 1000; 
        return this.bot.createMessage(message.channel.id , `> **يجب عليك الانتظار ${timeLeft.toFixed(1)} ثانية للتمكن من اعادة المحاولة**`);
    }



	try {
    message.prefix = prefix
		command.run(message , args , this.bot);
	} catch (error) {
		console.log(error.message);
	}
}




}