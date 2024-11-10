# Git

git 一个常见的版本管理器。

## 常见操作

### 分支查看和创建
```shell
git status # 查看当前分支中暂存区、非暂存区的内容

git log # 查看当前HEAD分支，并且查看commit信息

git branch -a # 查看所有分支

git branch -vv # 查看当前分支的本地和对应的远程分支

git branch branch_name # 创建分支branch_name，但不会进入

git push -u origin remote_branch_name # 在远程仓库创建或推送本地分支 -u可以替换--set-upstream（设置为上游分支）也可以不加参数
```

### 提交到远程仓库
```shell

git push -u origin master # 提交到远程仓库

git fetch # 更新本地远程仓库

git add . # 添加所有修改的文件从非暂存区移入暂存区

git commit -m "message" # 创建commit
git commit -a -m "message" # 合并了add操作

git pull # 拉取远程仓库

git clone git@github.com:username/repo.git # 克隆远程仓库
```

### 回退

硬回退和软回退。硬件回退是直接撤销所有的修改，软化回退是将所有的修改转入到非暂存区。
```shell
git reset --hard HEAD~1

git reset --soft HEAD~1
```

### 一般的开发流程

1. clone仓库

2. 创建特性分支(git branch/ git checkout -b)/切换分支(git checkout )

3. 开发

4. 提交到本地特性分支(git add .)(git commit -m "message")

5. 测试

6. 更新本地的main(git fetch origin main) **fecth类似于刷新本地的缓存，需要同步到远程最新状态，然后在将当前的分支同步为远程的最新版本。**

7. 将跟新的本地main分支合并到feat分支(git rebase main)

8. 提交到远程特性分支(git push origin feat)

9. 在代码管理不同平台提交RP

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
