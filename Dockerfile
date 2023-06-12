FROM node:18
RUN mkdir -p /var/app/cocostar-mysql
WORKDIR /var/app/cocostar-mysql
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["node", "dist/main.js"]
