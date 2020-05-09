const { createLogger, format, transports } = require('winston');

const { combine, printf } = format;

const prettyFormat = printf(({
  level, message, timestamp, stackTrace,
}) => {
  const baseLog = `${timestamp} ${level}: ${message.trim()}`;

  if (stackTrace) {
    return `${baseLog}\r\n${stackTrace.split(/\n/).join('\r\n')}`;
  }

  return baseLog;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    prettyFormat,
  ),
  defaultMeta: { service: 'user-service' },
  transports: [new transports.Console()],
});

module.exports = logger;
