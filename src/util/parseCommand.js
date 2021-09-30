// const cache = require('memory-cache');
const commands = require('../commands');

const isValidCommand = (command) => {
  const types = Object.keys(commands);
  types.push('help');
  return types.includes(command);
};

const parseCommand = (message, client) => {
  let command = null;
  const { content } = message;
  const botName = `<@!${client.user.id}>`;
  const botNameMobile = `<@${client.user.id}>`;
  const normalWhitespace = content.replace(String.fromCharCode(160), ' ');
  const args = normalWhitespace.split(' ');
  const [first, second] = args;

  if (first === botName || first === botNameMobile) {
    command = second;
  }

  if (isValidCommand(command)) {
    const commandArgs = args.slice(2);
    return {
      type: command,
      args: commandArgs,
    };
  }

  return null;
};

module.exports = parseCommand;
