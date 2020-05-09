const inputCleaner = (message) => {
  const cleanMessage = message.replace(/[^a-zA-Z0-9 ]/g, '');

  return cleanMessage.toLowerCase();
}

const argParser = (message) => {
  const args = message.slice(config.prefix.length).trim().split(/ +/g);
  
  const command = args[0].toLowerCase();
}

module.exports = {
  inputCleaner,
  argParser,
};