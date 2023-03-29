FROM node:18-alpine AS build
WORKDIR /home/nodeapp
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:18-alpine As production
WORKDIR /home/nodeapp
COPY --from=build /home/nodeapp/dist ./dist
COPY --from=build /home/nodeapp/node_modules ./node_modules
RUN npm install pm2 -g
EXPOSE 80
CMD [ "pm2-runtime","start","dist/app.js","--","--experimental-fetch"]

#  docker build -t wxchat .
#  docker run -itd --privileged=true -p 80:80 --name="wxchat" wxchat:latest