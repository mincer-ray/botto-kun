# botto-kun
![Node.js CI](https://github.com/mincer-ray/botto-kun/workflows/Node.js%20CI/badge.svg)

## running locally
1. ask me for the auth token i will give
2. have node v12
3. `npm install`
4. `npm start` or `node index.js`
5. dont be alarmed when you see 2 respond, the live one is still running


## adding operations
botto-kun operations can be a `command` or a `phrase`

### commands
commands are single word operations that take a set of arguments

a good example of this is `botto-kun` `say` `some text`


### phrases
phrases are any string that includes one or many keywords

a good example of this is `botto-kun` `some` `steven` `text` `day`

## logging
in any file require `util/logger`

logger syntax:
```
logger.info('message');
logger.warn('message);
logger.error('message');
```