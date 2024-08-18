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

### 类

#### 成员的类型

公有（public）、私有(private)、保护(protect)，可以是数据，亦可以是函数（方法）。

`=delete` 在某些默认函数后追加会禁用该函数的功能，很好的隔离一些操作带了的影响。

`explict` 使得传入参数不能隐式转换。

匿名对象：`Name()` 如果是一个仿函数，则匿名函数对象 `Name()()` 匿名的特点就是执行完毕该段代码，该对象内存空间就会释放。

#### 成员函数

编译器会默认给一个类添加：构造函数、析构函数、拷贝构造、拷贝赋值运算符重载（=，编译器提供的是浅拷贝）、移动构造（&&）（c++11）、移动赋值运算符重新载（c++11）。

##### 构造函数

构造函数是一种特殊的成员函数，它的主要目的是在创建对象时初始化对象。当使用new操作符创建对象、使用变量声明对象（在**栈**上）或者通过返回对象的方式调用函数时，构造函数会被自动调用。例子：`complex(double r=0, double i=0):re(r), im(i){};`一般通过 `re(r), im(i)`的方式给成员变量赋值。

* 拷贝构造（复制构造）：深拷贝 `complex(const complex& c);`和浅拷贝 `complex(complex& c)`。编译器有默认的拷贝构造（按位赋值），然而带指针的类，比较特殊，需要我们动态分配内存，避免浅拷贝。
* 移动构造： `complex&&(complex p);` 。移动构造函数接受一个对其自身类型的右值引用。移动构造函数会被标记为noexcept，以表明它不会抛出异常。该函数内部的实现通常意味着交换指针、文件句柄等，而不是复制它们指向的内容

**注意**：没有为类定义任何构造函数，编译器会提供一个默认的构造函数，该构造函数不接受任何参数并且不进行任何初始化操作（对于内置类型成员变量，其值将是未定义的）。但是，一旦定义了任何构造函数（无论是自定义的还是编译器生成的默认构造函数被删除的情况），编译器就不会再自动生成默认构造函数。

##### 析构函数

析构函数是另一种特殊的成员函数，它在对象生命周期结束时被自动调用，用于执行清理工作，如释放分配的内存（free/delect）、关闭文件句柄等。析构函数的名称是在类名前加上波浪号（~）。例如：`~complex();`

**注意**：编译器同样给析构函数提供了默认的模板。

#### object 的生命周期

stack object 是会在作用域（scope）结束前调用清理（析构），所以也称auto。

static local object 是在离开当前作用域对象依然存在，会在程序结束时清理（析构）。

global object 是在main函数前就存在（构造），析构是在main函数执行后结束（析构）。

#### `new `和 `delete`

new 是在堆上申请内存空间，然后进行构造。delete 是先进行析构，然后回收堆上的内存空间。

`new[]`搭配 `delete[]`使用。如果不搭，会导致只调用一次析构，从而内存泄漏。因为 `new[]`申请的是连续的内存空间。

实例：

```cpp
class ob:{}
ob* q = new ob[3];
delete[] q;
```

#### 静态成员

##### 静态成员变量

* 该类的所有实例化对象共享该变量数据。
* 变量在编译阶段完成内存分配。（数据区）
* 在类内部定义，类外部必须初始化。

```cpp
class Name{
public:
    static int num;
};

// 类名访问，也是初始化方式
int Name::num = 10;

// 对象访问，当某一对象修改数据后，所有该类的实例化对象该数据都会变化。
Name n = new Name()
n.num = 11;

```

##### 静态成员函数

* 静态成员函数只能访问静态成员变量或调用静态成员函数。
* 类的所有实例化对象，共享该成员函数。

#### 对象模型与this指针

##### 对象模型

类的成员函数和成员变量是分开存储。只有非静态成员在类的实例化对象上。

```cpp
class Person
{
public:
    int a;
    static int b; 
    void func(){};
    static void func1(){};
};

Person p; // sizeof的结果是4
```

空对象占内存大小为1字节。这是编译器为了区分对象的内存位置。因此每一个空对象都会有一个这样的空间。

```cpp
class Person
{
};

Person p; // sizeof的结果是1个字节
```

##### this指针

非静态成员函数只会有产生一份（代码段），实例化对象通过this指针区分是调用该函数的对象。即**this指针指向被调用成员函数所属于的对象**。**this指针是隐含在成员函数中**。this指针是一个指针常量。

```cpp
class Name{
public:
    int m_num;
    Name(int num){
        // 区分同名
        this->m_num = num;
    }
    // 如果不是引用，每次调用都会重新构造（拷贝）一个对象。
    Name& add(int t){
        this->m_num += t;
        return *this;
    }
};

Name n(1);
n.add(10).add(10); // 链式调用

```

* 解决名称冲突。
* 返回调用该成员函数的当前对象。可以实现链式编程。

**注意** : 因为this指针的存在，空指针也是可以调用成员函数的，当该成员函数使用了成员属性时需要注意，因为空指针无法访问到该成员会报错。

**常函数**是在成员函数添加 `const`修饰 `void func() const {}` 不允许修改成员属性 ，限制了 `this`。在成员变量添加 `mutable` 修饰 `mutable int a;` 可以让 `a`成员在该函数内或常对象内可以修改。

**常对象**即在对象前加 `const`，特殊点在于该对象不可调用非常函数。因此常对象只能调用常函数。

#### 友元

友元目的是为了另外一个类访问当前类的私有属性。友元是一种特殊东西，**它不是类的成员函数**，但可**访问类的所有私有成员和保护成员**。这种访问权限是通过在类定义中显式声明该函数为友元来授予的。友元函数通常用于实现那些需要访问类的私有成员但又不适合作为类成员函数的情况，比如操作符重载函数或两个类之间的紧密协作。

实现方式：

* 全局函数做友元。
* 类做友元。
* 类的成员函数做友元。

**实例：**

```cpp
class Name{
// 全局函数做友元
    friend void func(Name& n);
// 类做友元
    friend class Friend;
// 类成员函数访问私有成员
    friend void Friend::func2();

public:
    int m_num;
  
private:
// 私有成员
    int m_p_num;
};

class Friend{
public:
    void func1();
    void func2();
    Name* n;
};

Friend::Friend(){
    n = new Name;
};
Friend::~Friend(){
    delete n;
}

void Friend::func1(){
    // 作为友元类访问到了私有属性
    this->n->m_p_num = 11;
}
void Friend::func2(){
    // 当类不做友元的时候该函数也能访问私有。
}

void func(Name& n){
// 全局函数可以访问私有属性
    n.m_p_num = 10;

}
```

### 特殊的类

#### 类像指针（仿指针/智能指针）

仿指针（也称为智能指针）的主要目的是自动管理动态分配的内存，以避免内存泄漏和悬挂指针等问题。智能指针通过封装裸指针（raw pointer）并提供自动的 内存管理功能（如自动释放内存）来实现这一目标。 `unique_ptr`风格的仿指针实现示例。

```cpp
#include <iostream>  
#include <algorithm> // 用于std::swap  
#include <cassert>   // 用于assert  
  
template<typename T>  
class UniquePtr {  
private:  
    T* ptr;  
  
    // 禁止拷贝构造函数和拷贝赋值运算符  
    UniquePtr(const UniquePtr<T>&) = delete;  
    UniquePtr<T>& operator=(const UniquePtr<T>&) = delete;  
  
public:  
    // 默认构造函数  
    UniquePtr() : ptr(nullptr) {}  
  
    // 构造函数，接受一个裸指针  
    explicit UniquePtr(T* p) : ptr(p) {}  
  
    // 移动构造函数  
    UniquePtr(UniquePtr<T>&& other) noexcept : ptr(other.ptr) {  
        other.ptr = nullptr;  
    }  
  
    // 移动赋值运算符  
    UniquePtr<T>& operator=(UniquePtr<T>&& other) noexcept {  
        if (this != &other) {  
            delete ptr;  
            ptr = other.ptr;  
            other.ptr = nullptr;  
        }  
        return *this;  
    }  
  
    // 析构函数  
    ~UniquePtr() {  
        delete ptr;  
    }  
  
    // 访问裸指针  
    T* get() const {  
        return ptr;  
    }  
  
    // 解引用  
    T& operator*() const {  
        assert(ptr != nullptr);  
        return *ptr;  
    }  
  
    // 成员访问  
    T* operator->() const {  
        assert(ptr != nullptr);  
        return ptr;  
    }  
  
    // 重置指针  
    void reset(T* p = nullptr) {  
        delete ptr;  
        ptr = p;  
    }  
  
    // 交换两个UniquePtr  
    void swap(UniquePtr<T>& other) noexcept {  
        std::swap(ptr, other.ptr);  
    }  
  
    // 友元函数，允许直接交换两个UniquePtr对象  
    friend void swap(UniquePtr<T>& lhs, UniquePtr<T>& rhs) noexcept {  
        lhs.swap(rhs);  
    }  
};  
  
// 使用示例  
int main() {  
    UniquePtr<int> ptr1(new int(10));  
    UniquePtr<int> ptr2 = std::move(ptr1); // 移动语义  
  
    std::cout << *ptr2 << std::endl; // 输出: 10  
  
    // 此时ptr1已经被置为nullptr，尝试访问会导致未定义行为  
    // std::cout << *ptr1 << std::endl; // 注释掉这行代码  
  
    return 0;  
}
```

##### 常见智能指针

###### 1. `std::unique_ptr`

`std::unique_ptr`是C++11引入的一种智能指针，它拥有其所指向的对象。这意味着 `std::unique_ptr`的实例对其管理的资源拥有唯一所有权，不能复制（copy），但可以移动（move）。这使得它在需要唯一所有权语义的场景中非常有用。

```cpp
#include <memory>  
  
int main() {  
    std::unique_ptr<int> ptr = std::make_unique<int>(10);  
    // ptr.reset(); // 手动释放内存  
    // std::unique_ptr<int> ptr2 = ptr; // 错误，不能复制  
    std::unique_ptr<int> ptr2 = std::move(ptr); // 正确，通过移动语义  
    // 此时ptr变为nullptr  
}
```

###### 2. `std::shared_ptr`

`std::shared_ptr`是另一种智能指针，它允许多个 `shared_ptr`实例共享对同一个对象的所有权。当最后一个拥有该对象的 `shared_ptr`被销毁或被重置时，该对象才会被删除。`std::shared_ptr`通过控制块（control block）来管理所有权，控制块中包含了一个指向对象的指针和一个计数器，该计数器记录了有多少个 `shared_ptr`实例指向该对象。

```cpp
#include <memory>  
  
int main() {  
    std::shared_ptr<int> ptr1 = std::make_shared<int>(10);  
    std::shared_ptr<int> ptr2 = ptr1; // 正确，ptr1和ptr2共享所有权  
    // 当ptr1和ptr2超出作用域时，所指向的int对象将被自动删除  
}
```

###### 3. `std::weak_ptr`

`std::weak_ptr`是用来解决 `std::shared_ptr`之间可能产生的循环引用问题的一种智能指针。`std::weak_ptr`不拥有其所管理的对象，因此不会导致对象的生命周期延长。它更像是一个对 `std::shared_ptr`所管理对象的非拥有性引用。

```cpp
#include <memory>  
  
class A;  
class B;  
  
class A {  
public:  
    std::shared_ptr<B> bPtr;  
    // ...  
};  
  
class B {  
public:  
    std::weak_ptr<A> aPtr; // 使用weak_ptr避免循环引用  
    // ...  
};  
  
int main() {  
    std::shared_ptr<A> a = std::make_shared<A>();  
    std::shared_ptr<B> b = std::make_shared<B>();  
    a->bPtr = b;  
    b->aPtr = a;  
    // 没有循环引用问题，因为b->aPtr是weak_ptr  
}
```

#### 类像函数（仿函数）

C++中的仿函数（Functor）是一种可以像函数一样被调用的对象。它通常是通过重载 `operator()`来实现的，这使得对象可以像函数一样被调用。

```cpp
#include <iostream>  
  
class Sum {  
public:  
    // 定义一个带有两个int参数的operator()  
    int operator()(int a, int b) const {  
        return a + b;  
    }  
};  
  
int main() {  
    Sum sum;  
    // 直接像函数一样调用对象  
    std::cout << "Sum(5, 3) = " << sum(5, 3) << std::endl;  
  
    return 0;  
}
```

### 多态

多态是泛型编程的一种思想，即同样的代码实现不同的功能。C++实现多态的方式有函数重载，运算符重载和虚函数等。前两者为静态多态，在编译时绑定函数的内存地址，后者为动态多态，在函数运行时绑定函数的内存地址。

#### 函数重载

函数重载的几个关键点：

1. **函数名相同** ：重载的函数必须具有相同的函数名。
2. **参数列表不同** ：这包括参数的类型、顺序或个数不同。仅返回类型不同不足以区分两个重载函数。
3. **作用域相同** ：重载函数必须在同一个作用域内（如同一个类、同一个命名空间等）。
4. **可以返回不同的类型** ：虽然函数重载允许函数返回不同的类型，但决定函数重载的是参数列表，而不是返回类型。

函数重载的优点包括：

* **提高了代码的可读性** ：通过为执行相似任务但参数不同的函数使用相同的名称，可以使代码更加清晰易读。
* **提高了代码的灵活性** ：通过重载函数，可以根据传入参数的不同自动选择执行相应的函数体，增加了代码的灵活性。

```cpp
#include <iostream>  
using namespace std;  
  
// 函数重载示例  
void print(int i) {  
    cout << "Printing int: " << i << endl;  
}  
  
void print(double f) {  
    cout << "Printing float: " << f << endl;  
}  
  
void print(const char* c) {  
    cout << "Printing character: " << c << endl;  
}  
  
int main() {  
    print(7);       // 调用 print(int)  
    print(7.7);     // 调用 print(double)  
    print("Hello"); // 调用 print(const char*)  
    return 0;  
}
```

#### 运算符重载

运算符重载可以是类的成员函数，亦可以是全局函数。

* **不能重载的运算符** ：并非所有运算符都可以被重载。例如，`.`（成员访问运算符）、`.*`（成员指针访问运算符）、`::`（作用域解析运算符）、`sizeof`（类型大小运算符）、`typeid`（类型识别运算符）、`?:`（条件运算符）、`#`（预处理符）等就不能被重载。
* **重载的运算符保持其原有的优先级和结合性** ：当你重载一个运算符时，你只是改变了它作用于你的类对象时的行为，而不是改变了它的优先级或结合性。
* **重载的运算符可以是成员函数或友元函数** ：大多数运算符都可以作为成员函数或友元函数来重载。但是，有一些运算符（如赋值运算符 `=`、下标运算符 `[]`等）通常作为成员函数重载，而流插入运算符 `<<`和流提取运算符 `>>`则通常作为友元函数重载。
* **运算符函数不能有默认参数** ：由于运算符函数的参数是隐式传递的，因此它们不能具有默认参数。

例如：

```cpp
#include <iostream>  
  
class Point {  
public:  
    int x, y;  
  
    // 构造函数  
    Point(int a = 0, int b = 0) : x(a), y(b) {}  
  
    // 重载加法运算符  
    Point operator+(const Point& p) {  
        Point temp;  
        temp.x = x + p.x;  
        temp.y = y + p.y;  
        return temp;  
    }  
};  
  
int main() {  
    Point p1(2, 3), p2(5, 6), p3;  
    p3 = p1 + p2; // 使用重载的加法运算符  
    std::cout << "The sum of points is: (" << p3.x << ", " << p3.y << ")" << std::endl;  
    return 0;  
}
```

**`<<`左移运算符重载、`++a` 和 `a++`的重载（前置自增、后置自增，这里后置自增需要利用函数占位参数）、赋值运算符重载（是为了避免浅拷贝出现的操作堆上内存的问题（析构），注意=的链式调用）**

#### 虚函数

多态的一种实现是可以通过虚函数， `vitual`关键字。纯虚函数的定义需要加入 `=0`如下。包含有虚函数的类称为**抽象类**。成员函数都是纯虚函数的类称为**接口类**。（发生继承和虚函数重写）。虚函数的多态是父类通过指针或引用指向子类的对象。

```cpp
class OB: {
    public:
        virtual void name() const = 0; // 纯虚函数
        virtual void name();     // 虚函数
        void name(); 
}
class Obs: public Ob{
    public:
        void name() // 子类重写
}
```

##### 虚函数表与虚函数表指针

虚函数表 `vfb`是一个指针数组，存放虚函数的函数指针。虚函数表指针 `vfptr`是当类初始化一个实例时，该实例带有的一个访问虚函数表的指针。存在虚函数的类或继承了有虚函数的类都会存有虚函数表。虚函数表与虚函数表指针的示意图，图中的是多重继承的方式 a->b->c。

* 当子类重写了父类的虚函数时，子类的虚函数表会将该函数的地址替换（父类也存在这样一个地址但不同）到虚函数表的对应位置。
* 当父类的指针或引用调用该子类对象的方法时（发生多态），就会从子类对象的虚函数表中寻找到上面替换的函数地址。

![alt text](/note/c++/vptable.png)

注意：在多继承时，该类的实例对象有多个虚表指针。

### 继承

继承是面向对象编程的特点之一。无论在哪种继承方式下，子类都**无法访问**父类中访问权限为 private 的成员，友元成员不会被继承。子类可以通过添加作用域 `父类类名::`访问或调用父类的属性和方法。

#### 继承方式

**公有(public)**：在父类中，访问权限为 public、protected 的属性，继承到子类后，**访问权限不变。**

**保护(protect)**：在父类中，访问权限为 public、protected 的属性，继承到子类后，**访问权限均为protected**，不能被派生类的对象直接访问，但是可以在派生类的内部和派生类的子类中进行访问。

**私有(private)**：在父类中，访问权限为 public、protected 的属性，继承到子类后，**访问权限均为private。**

#### 子类的构造与析构、覆盖

**构造的过程**：子类调用父类的构造，在进行子类的构造

**析构的过程**：子类先调用析构，在析构父类。一般的父类的析构函数是一个虚函数。

处理父类与子类的同名成员的方式是**覆盖**。数据同名：在类内部，子类覆盖父类。函数同名：子类覆盖父类，这没重载的关系。根据类名作用域区分。

#### 多继承和多层继承

多继承是同时拥有多个父类。在此有虚继承解决多继承访问不明确的问题，但是内存开销大。a->b,c b,c->d

多层继承是a->b->c，这种每层只有一个父类，但存在父类的父类的形式。

#### 协变

协变（covariant）是指派生类（子类）中的返回类型可以是基类（父类）中返回类型的子类型。是一种语法特性。

```cpp
class ob{
    public:
        virtual ob* name(int old, char* name){
            return new ob(*this);
        }; // 虚函数
}
class obs: public ob{
    public:
        obs* name(int old, char* name){
            return new obs(*this);
        } // 子类重写
}
```

#### 菱形继承

* 当两个父类拥有相同的属性时，需要通过添加作用域区分
* 导致数据存在两份，空间浪费，并产生二义性。

解决方案通过**虚继承**解决。在中间的两个基类继承前添加 `virtual`关键字，称为虚基类。原理：这两个类的虚基类指针 `vbptr`会记录指向同名数据的地址的偏移量，通过该指针的当前地址和偏移量即可访问到基类属性，该属性在内存中只存在一份，因此在访问时无需加入作用域。
