const commands = require('../commands');

const doCommand = (command, message, database) => {
  if (commands[command.type]) {
    commands[command.type].do(command.args, message, database);
  } else if (command.type === 'help') {
    const types = Object.keys(commands);
    const helpSpam = types.map((type) => {
      const cmd = commands[type];
      return `\`${type}\`: ${cmd.help}`;
    });
    helpSpam.unshift('botto-kun is here to help! Check out these commands:');
    helpSpam.push('You can also @ me with any message and I will respond emotionally.');
    message.reply(helpSpam.join('\n'));
  } else {
    // you should never see this
    message.reply(`command ${command.type} is somehow valid and also not?`);
  }
};

module.exports = doCommand;
