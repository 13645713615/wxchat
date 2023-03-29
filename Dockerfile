FROM node:18-alpine AS build
WORKDIR /home/nodeapp
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:18-alpine As production
WORKDIR /home/nodeapp
COPY --from=build /home/nodeapp/dist .
COPY --from=build /home/nodeapp/pm2.json ./
COPY --from=build /home/nodeapp/node_modules ./node_modules
RUN npm install --only=dev pm2@5.3.0  -g
EXPOSE 80
CMD [ "pm2-runtime","start","pm2.json","--","--experimental-fetch"]

#  docker build -t wxchat .
#  docker run -itd --privileged=true -p 80:80 --name="wxchat" wxchat:latest
