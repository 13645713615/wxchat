FROM node:latest

# 执行命令，创建文件夹
RUN mkdir -p /home/nodeNestjs

# 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的文件夹下
COPY ./nestjs /home/nodeNestjs

WORKDIR /home/nodeNestjs

# 安装项目依赖包
RUN npm install
RUN npm build

# 配置环境变量
ENV HOST 0.0.0.0
ENV PORT 3000

# 容器对外暴露的端口号
EXPOSE 3000

# 容器启动时执行的命令，类似npm run start
CMD ["node", "/home/nodeNestjs/dist/main.js"]