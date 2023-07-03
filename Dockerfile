# Node 16.16 LTS, Alpine Linux is a small distribution image
FROM node:latest
EXPOSE 4200 49153
WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy all files to the work dir
COPY . .


CMD ["npm", "start"]
