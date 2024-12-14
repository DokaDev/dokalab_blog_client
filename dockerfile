FROM node:20.13.1
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]
