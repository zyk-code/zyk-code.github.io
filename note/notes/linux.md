# Linux 基础知识

### 命令

1、重启 `init6 或 reboot`，关机 `hualt`

2、查看文件列表 `ls` 详细信息 `ls -l` d 是目录 -是文件。支持正则匹配。

4、查看地址 `ip addr`

5、拷贝 `cp` win 和 linux 通用 ctrl+inset 复制 shift+inset粘贴

6、查看当前工作目录路径 `pwd`

7、解压 `tar zxvf path.tgz` 在根目录下解压

8、删除 `rm -rf name` 无需确认删除。删除文件 `rm -f name` 。 删除文件夹 `rm -r name`

9、创建 `mkdir`

### 环境变量

程序的执行需要的允许环境。

系统环境变量和用户环境变量

永久环境变量：配置在config文件中

临时环境变量：只在当前使用的shell中生效。

#### 常见环境变量

PATH 可执行程序的搜索目录。

LANG 系统语言、字符集。

HOSTNAME 主机名。

SHELL 当前的shell解析器。

USER 当前用户。

HISTSIZE 保存历史命令的条目数。

LD_LIBRARY_PATH: 动态库。

CLASSPATH: java库文件搜索目录。

#### 相关命令

查看命令 `env` 查看具体的环境变量 `env | grep`  `echo $NAME`

设置环境变量 `export name=value` value中无空格可以不用''。退出后会失效，即设置为临时环境变量。

cofig中配置系统环境变量：

`vim /etc/profile` 中修改需要root用户，不生效且不推荐的方式。

推荐在 `/etc/profile.d` 中创建 `.sh` 脚本，执行导入环境变量。

`vim /etc/bashsrc` 在此文件夹中添加 `expor name=value` ，同样需要重载，不推荐。

### 字符集

为了编解码字符而产生的东西。编码和解码使用的方式相同才不会乱码。

AIIS GBK unicode(国际通用编码)

## Linux下的C++相关操作

### 目录操作

#### 获取当前目录

linux系统中目录的最大长度是255

在 `unistd`库中

```cpp

char*getcwd(char*buf, size_tsize);

char*get_current_dir_name(void);

```

注意第二个函数需要 `free`释放

#### 切换目录

在 `unistd`库中

切换成功返回1，其他则失败。

```cpp

intchdir(constchar*path);

```

#### 创建目录

在 `sys/stat.h`库中

```cpp

intmkdir(constchar&pathname, mode_tmode);

```

pathname: 目录名。

mode: 访问权限，如0775，0不可省。

成功返回1，其他则失败，可能为没有上层目录或权限。

#### 删除目录

在 `unistd`库中

```cpp

intrmdir(constchar*path);

```

path: 目录名。

#### 获取目录中文件列表

库函数存放在 `dirent.h`中。

#### 目录权限获取

accsse()

### 系统错误 erron

`erron.h` 库中存放的。在系统函数和库函数一般会设置 `erro` 的数值。

#### strerror函数

在 `string` 库中

`char* strerror(int index);`

#### perror 函数

### 进程操作

linux的进程是一个树状结构。有一下类型：

0号进程：系统进程，所有进程的祖先，会创建1和2号进程。

1号进程：负责内核初始化和系统配置

2号进程：负责所有内核线程的调度和管理。

#### 进程终止

终止进程的方式共8种。前面5种为正常的终止方式，后面3种为异常的终止方式

1、在main函数中return返回。

2、任意函数中调用exit(0)。

3、任意函数中调用_exit()或Exit() 。

4、最后一个线程从其启动例程（线程主函数）用return返回。

5、在最后一个线程中调用pthread_exit()返回。

6、调用abort函数终止。

7、接受信号，kill -9 id 内存泄漏。

8、最后一个线程对取消请求做出响应。

#### 进程ID

每个进程都会有非负的唯一整数ID，该ID是可以复用。

`getpid()` 获取进程ID `getppid()` 获取父进程ID

#### fork函数

该函数用于创建子进程。

`fork()` 将该函数后的代码执行作为子进程进行。调用一次会返回两次。可以利用父进程ID返回让子进程和父进程执行不同的操作。父子进程执行的顺序是不确定的。

该过程中子进程拥有父进程的数据空间、堆和栈的副本，。并不与父进程共享（多线程是共享的），这是在物理内存空间上的。在代码上，可以使用相同的指针操作内容，但修改内容并不会改变父进程中值，深拷贝。

在子进程中执行 `execl`函数，该函数会覆盖子进程。`system`函数的实现方式。

在该函数中父子进程共享文件偏移变量（相当于编辑时的鼠标指针）。父子进程同时对文件进行写入操作时，是同步的等于一个进程进行的工作，然而会出现数据乱序的问题。（通过进程同步解决）

##### vfork函数

创建一个进程。该子进程不复制父进程地址空间。因为使用了 `exec`函数

#### 僵尸进程

父进程先于子进程运行结束，该子进程的父进程编号改变，则变为僵尸进程。

危害：父进程没有处理子进程，子进程会占用进程编号，占用资源。

##### 处理方式

1、子进程退出时，内核向父进程发送 `SIGCHLD`信号。父进程用 `signal(SIGCHLD, SIG_IGN)`通知内核，表示对子进程的退出不感兴趣，子进程退出后会立即释放数据结构。

2、父进程通过 `wait()/waitpid()`等待子线程结束。在子进程结束前，父进程被阻塞。传入子进程编号。

3、通过 `sigal(fun)`

#### 信号

linux通过kill发送sig给指定的pid

1、信号大于1

## 文件
### 文件的种类

类型	说明
-	普通文件。
d	目录，字母d是dirtectory（目录）的缩写。
l	符号链接。请注意，一个目录或者说一个文件夹是一个特殊文件，这个特殊文件存放的是其他文件和文件夹的相关信息。
b	块设备文件。
c	字符设备文件。
p	管道文件
s	套接口文件

### 文件权限

1、文件权限：rwx 对应读/写/执行，通过000位表示，7=>111时表示rwx, 0=>000时表示---。
2、每个文件都有三个权限：所有者、用户组、其他。
3、通过`ls -l`或者`ll`命令查看文件权限。
4、通过chmod命令修改权限。
5、通过chown命令修改文件所有者。
6、通过chgrp命令修改文件用户组。

命令例子
```
# 设置文件权限为707：文件所有者和其他用户有读\写\执行权限，用户群组无权限
chmod 707 testfile
# 给文件file.txt的所有者（u）增加读取（+r）权限
chmod u+r file.txt
# 从文件file.txt的拥有者同组用户（g）中移除写入（-w）权限
chmod g-w file.txt
# 给目录directory的其他用户（o）增加执行（+x）权限
chmod o+x directory
# 给文件file.txt的所有用户（a）设置读取和写入权限
chmod a=rw file.txt
# 将file.txt文件所属用户修改为用户miniboy
chown miniboy file.txt
# 将file.txt文件的所属群组修改为newgroup
chgrp newgroup file.txt
```
