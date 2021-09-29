const logger = require('../util/logger');

const doCommand = async (command, args, message) => {
  logger.info(`DO COMMAND: ${command} | ARGS: ${JSON.stringify(args)}`);

  if (command === 'ping') {
    const pingInit = await message.channel.send('Ping?');
    pingInit.edit(`Pong! Latency is ${pingInit.createdTimestamp - message.createdTimestamp}ms.`);
    return true;
  }

  if (command === 'say') {
    const sayMessage = args.join(' ');
    message.delete().catch(() => {});
    message.channel.send(sayMessage);
    return true;
  }

  return false;
};

module.exports = doCommand;
