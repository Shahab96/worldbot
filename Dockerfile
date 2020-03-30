FROM node:12.14

COPY ./dist .
COPY ./package.json .
RUN npm install

CMD node ./bot.js