
module.exports = {
    name: 'menssaje2channel',
    description: 'Sends a mensage to a channel (not a reply)',
    args: 'client(from main), channel id, menssage',
    execute(client,channel, msn){
        client.channels.cache.get(channel).send(msn);
    }
};
