function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
	name: 'notice',
    description: 'Send a mensaje in set time (default set for 5 minutes)',
    aliases: ['n'],
	execute(message, args) {
        if(!args[0]){
            message.reply('Ok! I will warn you in 5 minutes!');
            setTimeout(() => {
                message.reply('Time\'s up!');
            }, 5 * 1000 * 60);
        }
        else if(isNaN(args[0])){
            message.reply('I need a number! (in minutes)');
        }else{
            var miliseconds = args[0];
            message.reply('Reminder has been set for ' + args[0] + ' minutes');
            setTimeout(() => {
                message.reply('Time\'s up!');
            }, miliseconds * 1000 * 60 );
        }
	},
};
