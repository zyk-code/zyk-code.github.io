# Git

git 一个常见的版本管理器。

## 常见操作
```shell
git fetch # 更新本地远程仓库

git remote # 远程操作

git add  # 添加所有修改的文件从非暂存区移入暂存区

git commit # 创建commit

git clone  # 克隆远程仓库

git pull  # 拉取远程仓库
```


### 分支查看和创建
```shell
git status # 查看当前分支中暂存区、非暂存区的内容

git log # 查看当前HEAD分支，并且查看commit信息

git branch -a # 查看所有分支

git branch -vv # 查看当前分支的本地和对应的远程分支

git branch branch_name # 创建分支branch_name，但不会进入

git push -u origin remote_branch_name # 在远程仓库创建或推送本地分支 -u可以替换--set-upstream（设置为上游分支）也可以不加参数

git push origin --delete remote_branch_name # 删除远程分支

git push origin --delete remote_branch_name # 删除远程分支
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

4. 开发过程中提交commit的整体流程。（一下命令均可在feat分支下操作，也可切换到对应的分支操作）

  1. 更新本地的main(git checkout main && git fetch origin main && git pull origin) 或者使用( git pull --rebase origin main)直接完成1-2的内容，但可能发生预期外的事情。作用是更新一下本地的main分支，避免出现远程main与本地main不一致的情况，例如其他人开发的功能合并进入远程main。

  2. 将修改内容提交到本地feat分支(git checkout main && git add . && git commit -m "message") === (git commit -a -m "message")。

  3. 将更新的本地main分支合并到本地feat分支(git checkout feat && git checkout feat && git rebase main) 。

  4. 提交到远程特性分支(git push origin feat)。
  
5. 完成整体功能的开发在代码管理不同平台提交PR，注意多次的commit都可以，但如果存在PR未审核容易产生冲突。

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