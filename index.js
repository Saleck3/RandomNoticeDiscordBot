const fs = require('fs');
const config = require('./appsettings.json');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();


//I import all JS files in the 'commands' folder
commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//I import all JS files in the 'internalCommands' folder
commandFiles = fs.readdirSync('./internalCommands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./internalCommands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag);

    //Example of command execution whithout the command list
    if(config.startNotice){
        client.commands.get('menssaje2channel').execute(client, config.channels.General, config.appName + ' is now on duty');
    }
    
});

client.on('message', msg => {

    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

    //I catch the command and make an array of args
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


    if (!command){
        msg.reply('\nThat command dosn\'t exist\nCheck !!help for a list of commands');
        return;
    } 

    if (command.name == 'help' && args[0]){
        getHelp = args[0].toLowerCase();
        getHelp = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
        command.execute(msg, args, getHelp.name);
    }else{
        try {
            command.execute(msg, args);
        } catch (error) {
            console.error(error);
            msg.reply('there was an error trying to execute that command!');
        }
    }

});


client.login(config.token);