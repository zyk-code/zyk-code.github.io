import{_ as a,c as e,o as i,a5 as s}from"./chunks/framework.CAsUj2FB.js";const b=JSON.parse('{"title":"Linux 基础知识","description":"","frontmatter":{},"headers":[],"relativePath":"note/notes/linux.md","filePath":"note/notes/linux.md","lastUpdated":1713087399000}'),n={name:"note/notes/linux.md"},p=s(`<h1 id="linux-基础知识" tabindex="-1">Linux 基础知识 <a class="header-anchor" href="#linux-基础知识" aria-label="Permalink to &quot;Linux 基础知识&quot;">​</a></h1><h3 id="命令" tabindex="-1">命令 <a class="header-anchor" href="#命令" aria-label="Permalink to &quot;命令&quot;">​</a></h3><p>1、重启 <code>init6 或 reboot</code>，关机 <code>hualt</code></p><p>2、查看文件列表 <code>ls</code> 详细信息 <code>ls -l</code> d 是目录 -是文件。支持正则匹配。</p><p>4、查看地址 <code>ip addr</code></p><p>5、拷贝 <code>cp</code> win 和 linux 通用 ctrl+inset 复制 shift+inset粘贴</p><p>6、查看当前工作目录路径 <code>pwd</code></p><p>7、解压 <code>tar zxvf path.tgz</code> 在根目录下解压</p><p>8、删除 <code>rm -rf name</code> 无需确认删除。删除文件 <code>rm -f name</code> 。 删除文件夹 <code>rm -r name</code></p><p>9、创建 <code>mkdir</code></p><h3 id="环境变量" tabindex="-1">环境变量 <a class="header-anchor" href="#环境变量" aria-label="Permalink to &quot;环境变量&quot;">​</a></h3><p>程序的执行需要的允许环境。</p><p>系统环境变量和用户环境变量</p><p>永久环境变量：配置在config文件中</p><p>临时环境变量：只在当前使用的shell中生效。</p><h4 id="常见环境变量" tabindex="-1">常见环境变量 <a class="header-anchor" href="#常见环境变量" aria-label="Permalink to &quot;常见环境变量&quot;">​</a></h4><p>PATH 可执行程序的搜索目录。</p><p>LANG 系统语言、字符集。</p><p>HOSTNAME 主机名。</p><p>SHELL 当前的shell解析器。</p><p>USER 当前用户。</p><p>HISTSIZE 保存历史命令的条目数。</p><p>LD_LIBRARY_PATH: 动态库。</p><p>CLASSPATH: java库文件搜索目录。</p><h4 id="相关命令" tabindex="-1">相关命令 <a class="header-anchor" href="#相关命令" aria-label="Permalink to &quot;相关命令&quot;">​</a></h4><p>查看命令 <code>env</code> 查看具体的环境变量 <code>env | grep</code> <code>echo $NAME</code></p><p>设置环境变量 <code>export name=value</code> value中无空格可以不用&#39;&#39;。退出后会失效，即设置为临时环境变量。</p><p>cofig中配置系统环境变量：</p><p><code>vim /etc/profile</code> 中修改需要root用户，不生效且不推荐的方式。</p><p>推荐在 <code>/etc/profile.d</code> 中创建 <code>.sh</code> 脚本，执行导入环境变量。</p><p><code>vim /etc/bashsrc</code> 在此文件夹中添加 <code>expor name=value</code> ，同样需要重载，不推荐。</p><h3 id="字符集" tabindex="-1">字符集 <a class="header-anchor" href="#字符集" aria-label="Permalink to &quot;字符集&quot;">​</a></h3><p>为了编解码字符而产生的东西。编码和解码使用的方式相同才不会乱码。</p><p>AIIS GBK unicode(国际通用编码)</p><h2 id="linux下的c-相关操作" tabindex="-1">Linux下的C++相关操作 <a class="header-anchor" href="#linux下的c-相关操作" aria-label="Permalink to &quot;Linux下的C++相关操作&quot;">​</a></h2><h3 id="目录操作" tabindex="-1">目录操作 <a class="header-anchor" href="#目录操作" aria-label="Permalink to &quot;目录操作&quot;">​</a></h3><h4 id="获取当前目录" tabindex="-1">获取当前目录 <a class="header-anchor" href="#获取当前目录" aria-label="Permalink to &quot;获取当前目录&quot;">​</a></h4><p>linux系统中目录的最大长度是255</p><p>在 <code>unistd</code>库中</p><div class="language-cpp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">char*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getcwd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">char*</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">buf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">size_tsize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">char*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get_current_dir_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>注意第二个函数需要 <code>free</code>释放</p><h4 id="切换目录" tabindex="-1">切换目录 <a class="header-anchor" href="#切换目录" aria-label="Permalink to &quot;切换目录&quot;">​</a></h4><p>在 <code>unistd</code>库中</p><p>切换成功返回1，其他则失败。</p><div class="language-cpp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">intchdir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(constchar</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">path);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="创建目录" tabindex="-1">创建目录 <a class="header-anchor" href="#创建目录" aria-label="Permalink to &quot;创建目录&quot;">​</a></h4><p>在 <code>sys/stat.h</code>库中</p><div class="language-cpp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">intmkdir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(constchar</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pathname, mode_tmode);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>pathname: 目录名。</p><p>mode: 访问权限，如0775，0不可省。</p><p>成功返回1，其他则失败，可能为没有上层目录或权限。</p><h4 id="删除目录" tabindex="-1">删除目录 <a class="header-anchor" href="#删除目录" aria-label="Permalink to &quot;删除目录&quot;">​</a></h4><p>在 <code>unistd</code>库中</p><div class="language-cpp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">intrmdir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(constchar</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">path);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>path: 目录名。</p><h4 id="获取目录中文件列表" tabindex="-1">获取目录中文件列表 <a class="header-anchor" href="#获取目录中文件列表" aria-label="Permalink to &quot;获取目录中文件列表&quot;">​</a></h4><p>库函数存放在 <code>dirent.h</code>中。</p><h4 id="目录权限获取" tabindex="-1">目录权限获取 <a class="header-anchor" href="#目录权限获取" aria-label="Permalink to &quot;目录权限获取&quot;">​</a></h4><p>accsse()</p><h3 id="系统错误-erron" tabindex="-1">系统错误 erron <a class="header-anchor" href="#系统错误-erron" aria-label="Permalink to &quot;系统错误 erron&quot;">​</a></h3><p><code>erron.h</code> 库中存放的。在系统函数和库函数一般会设置 <code>erro</code> 的数值。</p><h4 id="strerror函数" tabindex="-1">strerror函数 <a class="header-anchor" href="#strerror函数" aria-label="Permalink to &quot;strerror函数&quot;">​</a></h4><p>在 <code>string</code> 库中</p><p><code>char* strerror(int index);</code></p><h4 id="perror-函数" tabindex="-1">perror 函数 <a class="header-anchor" href="#perror-函数" aria-label="Permalink to &quot;perror 函数&quot;">​</a></h4><h3 id="进程操作" tabindex="-1">进程操作 <a class="header-anchor" href="#进程操作" aria-label="Permalink to &quot;进程操作&quot;">​</a></h3><p>linux的进程是一个树状结构。有一下类型：</p><p>0号进程：系统进程，所有进程的祖先，会创建1和2号进程。</p><p>1号进程：负责内核初始化和系统配置</p><p>2号进程：负责所有内核线程的调度和管理。</p><h4 id="进程终止" tabindex="-1">进程终止 <a class="header-anchor" href="#进程终止" aria-label="Permalink to &quot;进程终止&quot;">​</a></h4><p>终止进程的方式共8种。前面5种为正常的终止方式，后面3种为异常的终止方式</p><p>1、在main函数中return返回。</p><p>2、任意函数中调用exit(0)。</p><p>3、任意函数中调用_exit()或Exit() 。</p><p>4、最后一个线程从其启动例程（线程主函数）用return返回。</p><p>5、在最后一个线程中调用pthread_exit()返回。</p><p>6、调用abort函数终止。</p><p>7、接受信号，kill -9 id 内存泄漏。</p><p>8、最后一个线程对取消请求做出响应。</p><h4 id="进程id" tabindex="-1">进程ID <a class="header-anchor" href="#进程id" aria-label="Permalink to &quot;进程ID&quot;">​</a></h4><p>每个进程都会有非负的唯一整数ID，该ID是可以复用。</p><p><code>getpid()</code> 获取进程ID <code>getppid()</code> 获取父进程ID</p><h4 id="fork函数" tabindex="-1">fork函数 <a class="header-anchor" href="#fork函数" aria-label="Permalink to &quot;fork函数&quot;">​</a></h4><p>该函数用于创建子进程。</p><p><code>fork()</code> 将该函数后的代码执行作为子进程进行。调用一次会返回两次。可以利用父进程ID返回让子进程和父进程执行不同的操作。父子进程执行的顺序是不确定的。</p><p>该过程中子进程拥有父进程的数据空间、堆和栈的副本，。并不与父进程共享（多线程是共享的），这是在物理内存空间上的。在代码上，可以使用相同的指针操作内容，但修改内容并不会改变父进程中值，深拷贝。</p><p>在子进程中执行 <code>execl</code>函数，该函数会覆盖子进程。<code>system</code>函数的实现方式。</p><p>在该函数中父子进程共享文件偏移变量（相当于编辑时的鼠标指针）。父子进程同时对文件进行写入操作时，是同步的等于一个进程进行的工作，然而会出现数据乱序的问题。（通过进程同步解决）</p><h5 id="vfork函数" tabindex="-1">vfork函数 <a class="header-anchor" href="#vfork函数" aria-label="Permalink to &quot;vfork函数&quot;">​</a></h5><p>创建一个进程。该子进程不复制父进程地址空间。因为使用了 <code>exec</code>函数</p><h4 id="僵尸进程" tabindex="-1">僵尸进程 <a class="header-anchor" href="#僵尸进程" aria-label="Permalink to &quot;僵尸进程&quot;">​</a></h4><p>父进程先于子进程运行结束，该子进程的父进程编号改变，则变为僵尸进程。</p><p>危害：父进程没有处理子进程，子进程会占用进程编号，占用资源。</p><h5 id="处理方式" tabindex="-1">处理方式 <a class="header-anchor" href="#处理方式" aria-label="Permalink to &quot;处理方式&quot;">​</a></h5><p>1、子进程退出时，内核向父进程发送 <code>SIGCHLD</code>信号。父进程用 <code>signal(SIGCHLD, SIG_IGN)</code>通知内核，表示对子进程的退出不感兴趣，子进程退出后会立即释放数据结构。</p><p>2、父进程通过 <code>wait()/waitpid()</code>等待子线程结束。在子进程结束前，父进程被阻塞。传入子进程编号。</p><p>3、通过 <code>sigal(fun)</code></p><h4 id="信号" tabindex="-1">信号 <a class="header-anchor" href="#信号" aria-label="Permalink to &quot;信号&quot;">​</a></h4><p>linux通过kill发送sig给指定的pid</p><p>1、信号大于1</p><h4 id="多进程" tabindex="-1">多进程 <a class="header-anchor" href="#多进程" aria-label="Permalink to &quot;多进程&quot;">​</a></h4><h4 id="共享内存" tabindex="-1">共享内存 <a class="header-anchor" href="#共享内存" aria-label="Permalink to &quot;共享内存&quot;">​</a></h4><p>共享内存的不支持stl容器。</p><h3 id="线程操作" tabindex="-1">线程操作 <a class="header-anchor" href="#线程操作" aria-label="Permalink to &quot;线程操作&quot;">​</a></h3>`,105),r=[p];function t(o,l,d,h,c,u){return i(),e("div",null,r)}const m=a(n,[["render",t]]);export{b as __pageData,m as default};