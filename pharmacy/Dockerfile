FROM node:19-bullseye
WORKDIR /pharmacy
COPY package.json start.js /pharmacy/
RUN npm install
RUN npm i -g nodemon
CMD [ "npm", "run", "dev" ]