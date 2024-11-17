import{_ as a,c as e,o,a5 as t}from"./chunks/framework.DZbTFPtB.js";const u=JSON.parse('{"title":"静态库和动态库","description":"","frontmatter":{},"headers":[],"relativePath":"C++/动态库与静态库.md","filePath":"C++/动态库与静态库.md","lastUpdated":1731859578000}'),r={name:"C++/动态库与静态库.md"},d=t('<h1 id="静态库和动态库" tabindex="-1">静态库和动态库 <a class="header-anchor" href="#静态库和动态库" aria-label="Permalink to &quot;静态库和动态库&quot;">​</a></h1><p>库的二进制库文件分为静态库和动态库。动态库和静态库同时存在时，编译器会优先使用动态库。</p><h2 id="静态库" tabindex="-1">静态库 <a class="header-anchor" href="#静态库" aria-label="Permalink to &quot;静态库&quot;">​</a></h2><p>静态链接，即在编译时将静态库文件链接到目标代码文件的方式。</p><h4 id="制作" tabindex="-1">制作 <a class="header-anchor" href="#制作" aria-label="Permalink to &quot;制作&quot;">​</a></h4><p><code>g++ -c -o lname.a name.cpp</code> 编译得到静态库文件</p><h4 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h4><p>1、可以将静态库和cpp文件一起编译，但是不规范。</p><p>2、<code>g++ -o demo demo.cpp -L/lpath -lname</code> 进行静态库使用。</p><h4 id="特点" tabindex="-1">特点 <a class="header-anchor" href="#特点" aria-label="Permalink to &quot;特点&quot;">​</a></h4><p>1、静态库的链接在编译时完成，执行时代码加载速度会快。</p><p>2、目标程序的可执行文件大、需要更大的空间。</p><p>3、程序更新和发布不方便。静态库代码更新，需要重新编译程序。</p><h2 id="动态库" tabindex="-1">动态库 <a class="header-anchor" href="#动态库" aria-label="Permalink to &quot;动态库&quot;">​</a></h2><p>在编译时，程序不会将动态库的二进制文件代码链接到目标程序，而在运行的时候才进行载入。如多个程序使用同一动态库的函数，那么在内存中占有的空间只有一份，避免了空间浪费的问题。</p><h4 id="制作-1" tabindex="-1">制作 <a class="header-anchor" href="#制作-1" aria-label="Permalink to &quot;制作&quot;">​</a></h4><p><code>g++ -fPIC -shared -o lname.so name.cpp</code> 编译为动态库。</p><h4 id="使用-1" tabindex="-1">使用 <a class="header-anchor" href="#使用-1" aria-label="Permalink to &quot;使用&quot;">​</a></h4><p>1、可以将动态库和cpp文件一起编译，但是不规范。</p><p>2、<code>g++ -o demo demo.cpp -L/path -lname</code> 注意，虽然命令跟静态库相同，但需将动态库的路径加入环境变量 <code>$LD_LIBRARY_PATH</code> ，在linux系统中通过命令 <code>export LD_LIBRARY_PATH=$LD_LIBRARY_PATH: /path</code> 加入，通过 <code>echo $LD_LIBRARY_PATH</code> 查看</p><h4 id="特点-1" tabindex="-1">特点 <a class="header-anchor" href="#特点-1" aria-label="Permalink to &quot;特点&quot;">​</a></h4><p>1、程序运行的过程中，需用到动态库的二进制代码时才将代码加载到内存。</p><p>2、可以在实现进程间的代码共享，因此动态库也成为共享库。</p><p>3、程序升级比较简单，不需要重现编译程序，只需更新动态库就行。（只需要重新制作动态库即可，程序不需编译）</p>',24),c=[d];function p(h,l,n,i,s,_){return o(),e("div",null,c)}const b=a(r,[["render",p]]);export{u as __pageData,b as default};
