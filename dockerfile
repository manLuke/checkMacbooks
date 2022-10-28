FROM node:16.18.0-alpine

WORKDIR /app

COPY ./package.json ./

RUN npm install --production

COPY . . 

RUN npx tsc -p ./tsconfig.json

CMD ["npm", "run", "start"]