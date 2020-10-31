function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
module.exports = {
	name: 'rand',
	description: 'Send a message with a number between 1 and 5',
	execute(message, args) {
		var number = getRandomInt(1, 5);
        message.reply('Hey! your random number is: ' + number);
	},
};

