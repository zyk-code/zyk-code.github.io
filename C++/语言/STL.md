# STL

STL：容器、算法、迭代器、适配器、分配器（空间配置器）和函数对象（仿函数）。迭代器将容器和算法进行无缝链接。函数模板和类模板实现，标准模板库。容器和算法的桥梁时迭代器。这六大基本组件中，核心是算法和容器，分配器和适配器都服务与两者中的空间分配一些容器或算法类型的无缝切换，迭代器作为两者间的一个桥梁。

新版本C的使用`#include<cstdlib>`，`#include<cstring>`，`#include<cctype>`，无需添加`.h`后缀。

## 容器contine

序列式和关联式容器。

### string 

`string`与 `char*`的区别：前者是一个类，在类的内部维护了一个 `char*`。`string`实现了对 `char*`的内存管理，避免了内存越界（取值和赋值）。提供了很多的成员方法。

### vector

`begin`：是位于vector的第一元素上的迭代器，`end`: 为最后一个元素的下一位上。

### queue

### map与set

`map`和`set`都是关联式容器，区别在于：map是键值对，set是键值，map的键值对可以重复，set的键值不能重复。

`map`和`set`的底层实现是红黑树。`unordered_map`和`unordered_set`底层实现是哈希表。

find 和 count 都是查找，但是count返回的是个数，find会返回一个迭代器（当不存在key时，会返回map.end()）。在set中没有find方法。

## 适配器

## 迭代器

## 函数对象

1. 函数对象和普通函数类似，拥有参数和返回值。
2. 函数对象内部可以拥有自己的状态表示。
3. 函数对象可以作为参数传递（回调）。普通函数是要通过指针。

### 谓词

返回**布尔类型**的仿函数（函数对象）称为谓词。该仿函数**接收一个参数即一元谓词，接收两个参数即二元谓词。**

#### 一元谓词

```cpp
class One{
public:
    int thread = 5;

    bool operator() (int val){
        return this->thread > val;
    }
};
```

#### 二元谓词

```cpp
class Two{
public:
    bool operator() (int num_1, int num_2){
        return num_1 > num_2;
    }
};
```

### 内建的函数对象

`#include<functional>`

算术

关系

逻辑

## 算法

`#include<algorithm>`
