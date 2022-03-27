FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json yarn*.lock /usr/src/app/

RUN yarn
COPY . .

CMD [ "yarn", "start" ]