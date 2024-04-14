import{_ as s,c as a,o as n,a5 as i,a6 as p}from"./chunks/framework.aB0BMhN4.js";const E=JSON.parse('{"title":"面向对象","description":"","frontmatter":{},"headers":[],"relativePath":"note/c++/面向对象.md","filePath":"note/c++/面向对象.md","lastUpdated":1713087399000}'),e={name:"note/c++/面向对象.md"},l=i(`<h1 id="面向对象" tabindex="-1">面向对象 <a class="header-anchor" href="#面向对象" aria-label="Permalink to &quot;面向对象&quot;">​</a></h1><h3 id="类" tabindex="-1">类 <a class="header-anchor" href="#类" aria-label="Permalink to &quot;类&quot;">​</a></h3><h4 id="成员类型" tabindex="-1">成员类型 <a class="header-anchor" href="#成员类型" aria-label="Permalink to &quot;成员类型&quot;">​</a></h4><p>公有（public）、私有(private)、保护(protect)，可以是数据，亦可以是函数</p><h4 id="友元函数" tabindex="-1">友元函数 <a class="header-anchor" href="#友元函数" aria-label="Permalink to &quot;友元函数&quot;">​</a></h4><p><code>friend</code> 关键字，允许类外部成员访问成员</p><p>例如：</p><div class="language-cpp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    friendcomplex</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">__doapl</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">complex</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">constcomplex</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>可以直接访问传入类的私有属性，比通过函数取会高效。同一个类的各个实例其实是互为友元的。</p><h5 id="拷贝赋值" tabindex="-1">拷贝赋值 <a class="header-anchor" href="#拷贝赋值" aria-label="Permalink to &quot;拷贝赋值&quot;">​</a></h5><p>拷贝赋值：本质是一种运算符重载（=），然而因为指针的存在变得特殊。需要将本身存有的数据（指针）清理掉，在进行赋值。（检测自我赋值）。</p><h4 id="构造函数" tabindex="-1">构造函数 <a class="header-anchor" href="#构造函数" aria-label="Permalink to &quot;构造函数&quot;">​</a></h4><p>例子：</p><div class="language-cpp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    complex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">double</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> r</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">double</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">re</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(r), </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">im</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(i){}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h6 id="拷贝构造-复制构造" tabindex="-1">拷贝构造（复制构造） <a class="header-anchor" href="#拷贝构造-复制构造" aria-label="Permalink to &quot;拷贝构造（复制构造）&quot;">​</a></h6><p>例如：</p><div class="language-cpp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 深拷贝</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    complex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> complex</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> c):</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 浅拷贝</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    complex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(complex</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> c):</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>拷贝构造：编译器有默认的拷贝构造（按位赋值），然而带指针的类，比较特殊，需要我们动态分配内存，避免浅拷贝。在拷贝构造过程中需要进行有效的操作。</p><h5 id="移动构造-c-11" tabindex="-1">移动构造 c++11 <a class="header-anchor" href="#移动构造-c-11" aria-label="Permalink to &quot;移动构造 c++11&quot;">​</a></h5><div class="language-cpp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    complex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(complex</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> c):</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="析构函数" tabindex="-1">析构函数 <a class="header-anchor" href="#析构函数" aria-label="Permalink to &quot;析构函数&quot;">​</a></h4><p>对象消亡的时候调用，通常在带有指针的对象需要重构，将分配的内存回收（delect）。</p><h4 id="堆stack、栈heap" tabindex="-1">堆stack、栈heap <a class="header-anchor" href="#堆stack、栈heap" aria-label="Permalink to &quot;堆stack、栈heap&quot;">​</a></h4><p>stack 存放某一个作用域的内的内存空间。调用函数、类，就会形成一个栈。</p><p>heap 操作系统提供的全局的内存空间。通过new关键字动态获取，注意使用时候需要释放delete。</p><h4 id="object-的生命周期" tabindex="-1">object 的生命周期 <a class="header-anchor" href="#object-的生命周期" aria-label="Permalink to &quot;object 的生命周期&quot;">​</a></h4><p>stack object 是会在作用域（scope）结束前调用清理（析构），所以也称auto。</p><p>static local object 是在离开当前作用域对象依然存在，会在程序结束时清理（析构）。</p><p>global object 是在main函数前就存在（构造），析构是在main函数执行后结束（析构）。</p><h4 id="new-和-delete" tabindex="-1">new 和 delete <a class="header-anchor" href="#new-和-delete" aria-label="Permalink to &quot;new 和 delete&quot;">​</a></h4><p>new 是先分配内存空间（malloc），在调用构造函数。</p><p>1、重构new关键字，内部通过malloc和内存分配内存空间</p><p>2、转型</p><p>3、构造</p><p>delete 是先调用析构函数，在清理内存。</p><p>1、调用析构</p><p>2、重构delete，内部通过free清理内存空间。</p><p>array new 配 array delet。如果不搭，会导致只调用一次析构，从而内存泄漏。</p><p>实例：</p><div class="language-cpp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">classob:{}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ob</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> q </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">newob[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    delete[]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> q;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="static-静态" tabindex="-1">static 静态 <a class="header-anchor" href="#static-静态" aria-label="Permalink to &quot;static 静态&quot;">​</a></h4><p>1、静态成员。修饰成员变量。可以通过 <code>类名：：</code>访问。</p><p>2、静态函数。static关键字修饰的成员函数。静态函数，只能访问静态成员。同样通过 <code>类名：：</code>调用。</p><h3 id="类与类之间的关系" tabindex="-1">类与类之间的关系 <a class="header-anchor" href="#类与类之间的关系" aria-label="Permalink to &quot;类与类之间的关系&quot;">​</a></h3><h4 id="复合与委托" tabindex="-1">复合与委托 <a class="header-anchor" href="#复合与委托" aria-label="Permalink to &quot;复合与委托&quot;">​</a></h4><p>复合：类内部属性的类型是其他的类。构造的过程是从内向外，是类内的其他类型先构造。析构的过程是从外向内，是类先析构</p><p>委托：就是在类内部有一个指针指向被委托的类，借用指针调用需要的方法。和复合不同的是，在构造的时候并不是同时构造的。</p><h4 id="继承" tabindex="-1">继承 <a class="header-anchor" href="#继承" aria-label="Permalink to &quot;继承&quot;">​</a></h4><p>无论在哪种继承方式下，子类都<strong>无法访问</strong>父类中访问权限为 private 的成员，友元成员不会被继承。</p><h5 id="继承方式" tabindex="-1">继承方式 <a class="header-anchor" href="#继承方式" aria-label="Permalink to &quot;继承方式&quot;">​</a></h5><p>公有（public）：在父类中，访问权限为 public、protected 的属性，继承到子类后，<strong>访问权限不变。</strong></p><p>保护（protect）：在父类中，访问权限为 public、protected 的属性，继承到子类后，<strong>访问权限均为protected</strong>，不能被派生类的对象直接访问，但是可以在派生类的内部和派生类的子类中进行访问。</p><p>私有（private）：在父类中，访问权限为 public、protected 的属性，继承到子类后，<strong>访问权限均为private。</strong></p><h5 id="子类的构造与析构" tabindex="-1">子类的构造与析构 <a class="header-anchor" href="#子类的构造与析构" aria-label="Permalink to &quot;子类的构造与析构&quot;">​</a></h5><p>构造的过程：子类调用父类的构造，在进行子类的构造</p><p>析构的过程：子类先调用析构，在析构父类。一般的父类的析构函数是一个虚函数。</p><h5 id="覆盖" tabindex="-1">覆盖 <a class="header-anchor" href="#覆盖" aria-label="Permalink to &quot;覆盖&quot;">​</a></h5><p>这是处理父类与子类的同名成员的方式。</p><p>数据同名：在类内部，子类覆盖父类。在类外部，根据类名作用域区分（::）。</p><p>函数同名：子类覆盖父类，这没重载的关系。根据类名作用域区分（::）。</p><h5 id="多继承和多层继承" tabindex="-1">多继承和多层继承 <a class="header-anchor" href="#多继承和多层继承" aria-label="Permalink to &quot;多继承和多层继承&quot;">​</a></h5><p>多继承是同时拥有多个父类。在此有虚继承解决多继承访问不明确的问题，但是内存开销大。a-&gt;b,c b,c-&gt;d</p><p>多层继承是a-&gt;b-&gt;c，这种每层只有一个父类，但存在父类的父类的形式。</p><h4 id="多态" tabindex="-1">多态 <a class="header-anchor" href="#多态" aria-label="Permalink to &quot;多态&quot;">​</a></h4><p>多态是泛型编程的一种思想，即同样的代码实现不同的功能。父类的指针具有多种执行状态，所以这是一种运行时的产生的。</p><p>多态的实现是可以通过虚函数， <code>vitual</code>关键字。</p><h5 id="虚函数的种类" tabindex="-1">虚函数的种类 <a class="header-anchor" href="#虚函数的种类" aria-label="Permalink to &quot;虚函数的种类&quot;">​</a></h5><p>非虚函数：子类不需要重写该函数。</p><p>虚函数：子类可以重写该函数。</p><p>纯虚函数： 子类必须重写该函数。</p><p>实例：</p><div class="language-cpp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">classob{</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        virtualvoidname</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 纯虚函数</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        virtualvoidname</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     // 虚函数</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        voidname</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">classobs: publicob{</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        voidname</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 子类重写</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h5 id="抽象类与接口类" tabindex="-1">抽象类与接口类 <a class="header-anchor" href="#抽象类与接口类" aria-label="Permalink to &quot;抽象类与接口类&quot;">​</a></h5><p>抽象类：包含有虚函数的类。</p><p>接口类：成员函数都是纯虚函数的类。</p><h5 id="虚表" tabindex="-1">虚表 <a class="header-anchor" href="#虚表" aria-label="Permalink to &quot;虚表&quot;">​</a></h5><p>虚表是一个指针数组，存放虚函数的函数指针。</p><p>存在虚函数的类或继承的类都会存有虚表，类的实例化对象会有虚表指针指向这个列表。</p><p>虚表的作用和虚表指针的示意图，多重继承的方式 a-&gt;b-&gt;c。</p><p><img src="`+p+`" alt="alt text" loading="lazy"></p><p>注意：在多继承时，该类的实例对象有多个虚表指针。</p><h5 id="协变" tabindex="-1">协变 <a class="header-anchor" href="#协变" aria-label="Permalink to &quot;协变&quot;">​</a></h5><p>协变（covariant）是指派生类（子类）中的返回类型可以是基类（父类）中返回类型的子类型。是一种语法特性。</p><div class="language-cpp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">classob{</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        virtualob</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(intold, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">char*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">name){</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> newob</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        };</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 虚函数</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">classobs: publicob{</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        obs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(intold, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">char*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">name){</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> newobs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 子类重写</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h4 id="联编" tabindex="-1">联编 <a class="header-anchor" href="#联编" aria-label="Permalink to &quot;联编&quot;">​</a></h4><p>动态联编：即虚函数的方式。在指在运行时根据对象的类型确定方法调用的具体实现。</p><p>静态联编：指在编译阶段就将函数实现和函数调用关联起来。例如：函数重写、模板、类型强转。</p>`,87),t=[l];function h(r,k,c,d,o,b){return n(),a("div",null,t)}const g=s(e,[["render",h]]);export{E as __pageData,g as default};
