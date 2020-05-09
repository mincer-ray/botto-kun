const doCommand = async (command, args, message) => {
  console.log(`DO COMMAND: ${command} | ARGS: ${JSON.stringify(args)}`);

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
