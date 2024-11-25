# C++

## main函数的前世今生

main函数是初学C++时，第一个函数。但是并不是所有程序的入口都必须是main函数。

### main 函数
```cpp
int main(int argc, char* argv[], char* envp[]){
    ...
    return 0;
}
```
该函数默认拥有三个参数：argc、argv、envp。参数可以省略。
`argc`： 存放参数个数(`int`)，包含程序本身。
`argv`： 字符串数组(`char*`)，存放每个参数的值，包含程序本身。
`envp`： 字符串数组(`char*`)，存放环境变量，数组最后一个元素为空。
### C++程序的执行
首先是syscall
最后退出时，_exit()确保的内存安全释放执行exit系统调用。
程序的主体流程：
``` mermaid
flowchart LR
  start --> main --> exit
```
### main的前后插入Handler

## 宏定义
常见的宏定义。
```cpp
#include <iostream>
#define PI 3.14
```

## 数据类型

### 变量

### 常量

## 控制分支

### 循环

### 条件

## 函数

### 函数占位参数

```cpp
void func(int mun1, int){}	// int 即在调用时必须多一个INT类型的占位参数
func(10,10);
void func(int mun1, int=10){}	// 这也是占位符的一种方式，跟了默认的参数。
```

### 函数重载

重载发生的一些条件。

* 函数命相同。
* 函数形参不同（可以是类型，个数或顺序）。
* 在同一个作用域中。

**注意**：

函数返回值不可作为函数重载的条件。

函数重载遇到引用。

```cpp
void func(int& a){}
int a = 10;
func(a);

// 函数对应的重载方式
void func(const int& a){}
func(10);
```

函数重载遇到默认参数。

```cpp
void func(int a){}
void func(int a, int b =10){}

// 当存一下调用方式时会出现二义性，编译器无法确定该调用哪个函数。
func(10);

// 是可以确定调用方式，可以发生重载
func(10, 11)
```

## 类型转换

1、静态类型转换`static_cast<type>(value)`(在move和完美转发的实现上都是调用了该转换方式)。实现了类型间安装的转换，是一种显示的类型转换操作符。

2、动态类型转换`dynamic_cast<type>(value)`。用于在多态类型之间进行安全的类型转换，例如在子类对象转换为父类对象指针或引用时使用。

3、类型转换函数`reinterpret_cast<type>(value)`。一种贴近的低层数据位的转换，存在很多的不安全因素需要考虑。

4、类型转换表达式`(type)value`。
