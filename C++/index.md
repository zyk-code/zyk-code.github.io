# C++

### main 函数

```cpp
int main(int argc, char* argv[], char* envp[]){
    ...
    return 0;
}
```

c++程序的入口，不是唯一。

该函数默认拥有三个参数：argc、argv、envp。参数可以省略。

`argc`： 存放参数个数(`int`)，包含程序本身。

`argv`： 字符串数组(`char*`)，存放每个参数的值，包含程序本身。

`envp`： 字符串数组(`char*`)，存放环境变量，数组最后一个元素为空。

传参的方式：`demo aa bb` 会将 demo aa bb 作为参数传入main，demo是文件路径。

### 函数

#### 函数占位参数

```cpp
void func(int mun1, int){}	// int 即在调用时必须多一个INT类型的占位参数
func(10,10);
void func(int mun1, int=10){}	// 这也是占位符的一种方式，跟了默认的参数。
```

#### 函数重载

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