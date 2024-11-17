# Docker

[docker教程](https://docker.easydoc.net)

## 简介
Docker 是一个应用打包、分发、部署的工具。

你也可以把它理解为一个轻量的虚拟机，它只虚拟部署软件所需的运行环境。

| 特性        |      普通虚拟机      |  Docker |
| ------------- | :-----------: | ----: |
| 跨平台 | 通常只能在桌面级系统运行 | 支持的系统非常多|
| 性能   | 性能损耗大，内存占用高 | 性能好，只虚拟软件所需运行环境，最大化减少没用的配置 |
| 自动化 | 需要手动安装所有东西 | 运行一次命令就可以自动部署好所需环境 |
| 稳定性 | 稳定性不高，不同系统差异大 | 稳定性好，不同系统都一样部署方式 |		

### Dorker的内容

**容器**：软件安装后的状态，每个软件运行环境都是独立的、隔离的，称之为容器。

**镜像**：可以理解为软件安装包，可以方便的进行传播和安装。可以包含多个容器。更像一个操作系统，然而它只是提供软件所需的东西。

**Dorkerfile**；一个自动化脚本，用于自动化创建镜像。

### Dorker的作用

**打包**：就是把你软件运行所需的依赖、第三方库、软件打包到一起，变成一个安装包。

**分发**：你可以把你打包好的“安装包”上传到一个镜像仓库，其他人可以非常方便的获取和安装。

**部署**：拿着“安装包”就可以一个命令运行起来你的应用，自动模拟出一摸一样的运行环境，不管是在。

## 安装

[桌面版](https://www.docker.com/products/docker-desktop)

[服务器版](https://docs.docker.com/engine/install/#server)

### 镜像源

|镜像加速器	     | 镜像加速器地址 |
| ------------- | :-----------: |
|Docker 中国官方镜像 | https://registry.docker-cn.com |
|DaoCloud 镜像站 | http://f1361db2.m.daocloud.io |
|Azure 中国镜像 | https://dockerhub.azk8s.cn |
|科大镜像站 |	https://docker.mirrors.ustc.edu.cn |
| 阿里云 | https://ud6340vz.mirror.aliyuncs.com |
| 网易云 | https://hub-mirror.c.163.com |
| 腾讯云 | https://mirror.ccs.tencentyun.com |


## Dorker基本命令 与 Dorkerfile

### 基本命令

`docker build -t my-image .` 创建镜像

`docker run -p 80:5000 -d my-image` 启动容器 -p：将本地端口80映射为容器端口5000, -d：容器在后台运行

`docker ps `查看当前运行中的容器

`docker images` 查看镜像列表

`docker rm container-id` 删除指定 id 的容器

`docker stop/start/restart container-id` 停止/启动指定 id 的容器

`docker rmi image-id` 删除指定 id 的镜像

`docker volume ls` 查看 volume 列表

`docker network ls` 查看网络列表

### Dorkerfile

```yaml
# 使用的镜像
FORM python:3.8-slim-buster
# 工作目录，可以理解为进入的目录，如果目录不存在会自动创建
WORK /app
# 将本地目录的文件拷贝到dorker镜像中的目录
COPY . .
# shell 命令
RUN pip install # 创建镜像时使用，更像是在系统中配置一些环境包的操作
CMD ["python3", "app.py"]# 使用容器时使用，更像是运行代码的操作。
```

## 目录挂载

1、dorker容器启动需要build和run,代码更新时需要重新执行。

2、dorker容器删除后，文件也会直接清楚。例如：日志文件、数据库等。

为了解决上面的问题，可以通过目录挂载解决。

### 挂载方式

**bind mount**：直接把宿主机目录映射到容器内，适合挂代码目录和配置文件。可挂到多个容器上。

**volume**； 由容器创建和管理，创建在宿主机，所以删除容器不会丢失，官方推荐，更高效，Linux 文件系统，适合存储数据库数据。可挂到多个容器上。启动容器命令中追加`-v my-image-data: path` my-image-data表示的是**volume**的名字。

**tmpfs mount**： 适合存储临时文件，存宿主机内存中。不可多容器共享。

![示意图](/note/notes/dorker1.png)

## Dorker-compose

可以将数据库和代码分离在不同的容器中。Dorker-compose是将这些容器启动的自动化。

## 容器间通信

项目运行时，需要多个容器的数据库、缓存等进行。

容器间需要通信。通过将容器载入到同一个网络的方式进行容器间的通信。

## Dorker 与 Kubernetes

Dorker 更像是一台主机上运行。

Kubernetes 更像是在多台主机的集群上运行的。

它们都是为了方便程序员的部署和对包文件的管理。