FROM node:12.14

COPY ./dist .
COPY ./node_modules .

CMD node ./bot.js