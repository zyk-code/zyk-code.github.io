# Make

make是一个管理项目编译和链接的工具。makefile是make的编译规则文件，可以实现自动化编译。

它采用增量编译的方案，只会编译没有在目标目录的文件。

##### 使用

1、编写makefile文件。注意缩进是tab

```makefile
# 指定的编译文件列表
all: lname.a \
    lname.so

# 指定对应文件的编译程序，如指定程序发生变化（只要是内容变了都会编译），就会重新编译
lname.a: name.h name.cpp
    g++ -c -o lname.a name.cpp

lname.so: name.h name.cpp
    g++ -fPIC -shared -o lname.so name.cpp

# 清空编译文件列表
clean:
    rm -f lname.a lname.so
```

当编译指令中出现比较多的文件路径时可以通过定义变量使用。

```makefile
INB= -l/path1 -l/path2
LIB=-L/path1 -L/path2

all: demo1 demo2

demo1: demo1.cpp
    g++ -o demo1 demo1.cpp $(LIB) $(INB) -lname1 -lname2 
demo2: demo2.cpp
    g++ -o demo1 demo1.cpp $(LIB) $(INB) -lname1 -lname2 
clean:
    rm -f demo1 demo2
```

2、在目录下使用make `make` 即可得到编译文件，`make clean`可以清楚所有的编译。