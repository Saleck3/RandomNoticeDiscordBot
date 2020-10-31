function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
	name: 'randomnotice',
    description: 'Send a mensaje in a random moment (default between 1 and 5 minutes)',
    aliases: ['rn'],
	execute(message, args) {
        if(!args[0]){
            var miliseconds = getRandomInt(1, 5);
            message.reply('Hey! your random number is: ' + miliseconds);
            setTimeout(() => {
                message.reply('Time\'s up!');
            }, miliseconds * 1000 * 60);
        }
        else if(!args[1] || isNaN(args[0]) || isNaN(args[1])){
            message.reply('I need two numbers! (in minutes)');
        }else{
            var miliseconds = getRandomInt(args[0], args[1]);
            message.reply('Reminder has been set between' + args[0] + ' and ' + args[1] + 'minutes');
            setTimeout(() => {
                message.reply('Time\'s up!');
            }, miliseconds * 1000 * 60 );
        }
	},
};
