FROM node:8.12.0-jessie
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000


ENTRYPOINT npm run server