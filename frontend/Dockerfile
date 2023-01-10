FROM node

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
COPY tsconfig.json ./ 
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 5173
CMD ["yarn", "start"]
