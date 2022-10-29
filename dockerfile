FROM node:16.18.0-alpine

WORKDIR /app

COPY ./package.json ./

RUN npm install --omit=dev

COPY . . 

RUN npx tsc -p ./tsconfig.json

CMD ["npm", "run", "start"]