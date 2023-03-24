
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
EXPOSE 3000
CMD [ "node", "dist/app.js","--experimental-fetch" ]

#  docker build -t wxchat .
#  docker run -d -p 80:3000 --name="wxchat" wxchat:latest