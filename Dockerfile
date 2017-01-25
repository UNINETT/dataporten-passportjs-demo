FROM node:boron

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
RUN npm install

COPY etc ./etc
COPY server.js ./

EXPOSE 8080
CMD ["npm", "start"]
