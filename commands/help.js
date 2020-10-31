const fs = require('fs');
const { connected } = require('process');

module.exports = {
    name: 'help',
    aliases: ['h', '?'],
    description: 'Display help messages',
    execute(message, args, getHelp) {

        if (!args[0]) {
            
            reply = 'This is the help and here is a command list: \n';
            const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                reply += command.name + '\n';
            }

            reply += 'type !!help <command> to get help about that command';
            message.reply(reply);
        } else {
            try {
                comm = '';
                if(getHelp){
                    comm = require('./' + getHelp + '.js');
                }else{
                    comm = require('./' + args[0] + '.js');
                }
                
                reply = '\nCommand: ' + comm.name;
                reply += '\nDescription: ' + comm.description;
                if(comm.aliases){
                    reply += '\nAliases: ' + comm.aliases;
                }

                message.reply(reply);
            } catch (error) {
                message.reply('There was an error, probably, that command dosn\'t exist, tipe !!help for a list of commands');
                console.log(error);
            }
        }
    },
};