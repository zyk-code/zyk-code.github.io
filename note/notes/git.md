# Git

git 一个常见的版本管理器。

## 常见操作

```shell
git init  # 初始化本地仓库

git fetch # 更新本地远程仓库

git status # 查看当前分支状态

git log # 查看当前HEAD分支，并且查看commit信息

git branch -a # 查看所有分支
git branch -vv # 查看当前分支的本地和对应的远程分支
git branch # 查看当前分支

git add . # 添加所有文件到暂存区

git commit -m "message" # 提交到本地仓库

git remote add origin git@github.com:username/repo.git # 添加远程仓库可以是gitHub/gitee

git push --set-upstream origin remote_branch_name # 在远程仓库创建remote_branch_name分支
git push -u origin master # 提交到远程仓库

git pull # 拉取远程仓库

git clone git@github.com:username/repo.git # 克隆远程仓库
```

## github

### github page

可以部署静态网页。

支持两种部署方式：分支部署 和 github action的自动化部署。可在当前项目的设置中 `page`选项中进行选择。

分支部署：本质还是一个github action。只不过仓库在部署分支push时进行更行。

### github action

[github action 教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

流水线式的工作流，它通过 `.github/workflows/**.yml`文件自动执行环境的配置、build和deploy操作

#### yml文件的编写

官方提供了很多操作和解析。可以利用该机制进行github和gitee仓库的同步。

```yml
name: sync docs
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Setup Node
```

## gitee

国内版本的github

### gitee page

### 从github仓库同步gitee
