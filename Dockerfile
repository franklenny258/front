FROM node:lts

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4173

CMD ["yarn", "preview"]