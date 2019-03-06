FROM node:8.11.1

RUN mkdir /www

COPY . /www

WORKDIR /www

RUN npm i supervisor -g

RUN npm i

CMD ["npm", "run", "prod"]