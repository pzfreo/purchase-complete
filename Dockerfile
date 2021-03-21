FROM node:15

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install typescript -g
RUN tsc

EXPOSE 8000

CMD ["npm", "run", "start"]