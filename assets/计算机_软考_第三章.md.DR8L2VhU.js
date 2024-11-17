import{_ as s,c as a,l as t,a as n,a5 as e,o}from"./chunks/framework.DZbTFPtB.js";const A=JSON.parse('{"title":"第三章数据结构","description":"","frontmatter":{},"headers":[],"relativePath":"计算机/软考/第三章.md","filePath":"计算机/软考/第三章.md","lastUpdated":1731859578000}'),l={name:"计算机/软考/第三章.md"},T=e('<h1 id="第三章数据结构" tabindex="-1">第三章数据结构 <a class="header-anchor" href="#第三章数据结构" aria-label="Permalink to &quot;第三章数据结构&quot;">​</a></h1><h2 id="线性结构" tabindex="-1">线性结构 <a class="header-anchor" href="#线性结构" aria-label="Permalink to &quot;线性结构&quot;">​</a></h2><p>1、链表和线性表的优缺点对比。</p><p>2、链表的插删。</p><p>3、栈的进出顺序，后缀表达式的栈计算。</p><p>4、循环队列的空和满 判。</p><p>![]*(./note/test/three/queue.png)</p><p>5、串，kmp算法（求next数组）。</p><p>![]*(./note/test/three/kmp.png) <em>找k的技巧是找到左右对称的分界点，左边的串长度+1作为next数组的值，如无则为1</em></p><p>6、数组与矩阵的下标计算。可以通过特殊值代入法进行计算。稀疏矩阵存储；<strong>十字链表</strong>和<strong>三元组</strong></p><p>![]*(./note/test/three/matx.png)</p><p>![]*(./note/test/three/tmatx.png)</p><p>7、广义表。左括号的个数就是广义表的重数。<strong>除了第一元素外，其他元素都是一个表</strong>。</p><h2 id="树与图" tabindex="-1">树与图 <a class="header-anchor" href="#树与图" aria-label="Permalink to &quot;树与图&quot;">​</a></h2><p>1、![]*(./note/test/three/tree.png)</p><p>2、满二叉树：都具有左右孩子。完全二叉树：在满二叉树的情况下，缺少顺序末尾的结点。</p>',16),r={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},Q={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"0"},xmlns:"http://www.w3.org/2000/svg",width:"3.915ex",height:"1.887ex",role:"img",focusable:"false",viewBox:"0 -833.9 1730.6 833.9","aria-hidden":"true"},p=e('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="msup"><g data-mml-node="mn"><path data-c="32" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z" style="stroke-width:3;"></path></g><g data-mml-node="TeXAtom" transform="translate(533,363) scale(0.707)" data-mjx-texclass="ORD"><g data-mml-node="mi"><path data-c="1D456" d="M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(345,0)"><path data-c="2212" d="M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(1123,0)"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" style="stroke-width:3;"></path></g></g></g></g></g>',1),d=[p],i=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("msup",null,[t("mn",null,"2"),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"i"),t("mo",null,"−"),t("mn",null,"1")])])])],-1),m={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},h={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.186ex"},xmlns:"http://www.w3.org/2000/svg",width:"6.049ex",height:"2.117ex",role:"img",focusable:"false",viewBox:"0 -853.7 2673.8 935.7","aria-hidden":"true"},c=e('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="msup"><g data-mml-node="mn"><path data-c="32" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(533,363) scale(0.707)"><path data-c="1D458" d="M121 647Q121 657 125 670T137 683Q138 683 209 688T282 694Q294 694 294 686Q294 679 244 477Q194 279 194 272Q213 282 223 291Q247 309 292 354T362 415Q402 442 438 442Q468 442 485 423T503 369Q503 344 496 327T477 302T456 291T438 288Q418 288 406 299T394 328Q394 353 410 369T442 390L458 393Q446 405 434 405H430Q398 402 367 380T294 316T228 255Q230 254 243 252T267 246T293 238T320 224T342 206T359 180T365 147Q365 130 360 106T354 66Q354 26 381 26Q429 26 459 145Q461 153 479 153H483Q499 153 499 144Q499 139 496 130Q455 -11 378 -11Q333 -11 305 15T277 90Q277 108 280 121T283 145Q283 167 269 183T234 206T200 217T182 220H180Q168 178 159 139T145 81T136 44T129 20T122 7T111 -2Q98 -11 83 -11Q66 -11 57 -1T48 16Q48 26 85 176T158 471L195 616Q196 629 188 632T149 637H144Q134 637 131 637T124 640T121 647Z" style="stroke-width:3;"></path></g></g><g data-mml-node="mo" transform="translate(1173.6,0)"><path data-c="2212" d="M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(2173.8,0)"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" style="stroke-width:3;"></path></g></g></g>',1),g=[c],_=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("msup",null,[t("mn",null,"2"),t("mi",null,"k")]),t("mo",null,"−"),t("mn",null,"1")])],-1),u={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},x={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.375ex"},xmlns:"http://www.w3.org/2000/svg",width:"11.604ex",height:"1.881ex",role:"img",focusable:"false",viewBox:"0 -666 5129.1 831.6","aria-hidden":"true"},w=e('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="msub"><g data-mml-node="mi"><path data-c="1D45B" d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(633,-150) scale(0.707)"><path data-c="30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z" style="stroke-width:3;"></path></g></g><g data-mml-node="mo" transform="translate(1314.3,0)"><path data-c="3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z" style="stroke-width:3;"></path></g><g data-mml-node="msub" transform="translate(2370.1,0)"><g data-mml-node="mi"><path data-c="1D45B" d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(633,-150) scale(0.707)"><path data-c="32" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z" style="stroke-width:3;"></path></g></g><g data-mml-node="mo" transform="translate(3628.9,0)"><path data-c="2B" d="M56 237T56 250T70 270H369V420L370 570Q380 583 389 583Q402 583 409 568V270H707Q722 262 722 250T707 230H409V-68Q401 -82 391 -82H389H387Q375 -82 369 -68V230H70Q56 237 56 250Z" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(4629.1,0)"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" style="stroke-width:3;"></path></g></g></g>',1),V=[w],H=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("msub",null,[t("mi",null,"n"),t("mn",null,"0")]),t("mo",null,"="),t("msub",null,[t("mi",null,"n"),t("mn",null,"2")]),t("mo",null,"+"),t("mn",null,"1")])],-1),f=e('<p>3、线索二叉树</p><p>![]*(./note/test/three/tree1.png)</p><p>4、最优二叉树（哈夫曼树）</p><p>![]*(./note/test/three/tree2.png)</p><p>哈夫曼树构建。左小右大。哈夫曼编码是左边为0，右边为1。</p><p>![]*(./note/test/three/hafu.png)</p><p>2、图使用<strong>邻接矩阵</strong>和<strong>邻接表</strong>存储。深度和广度遍历，使用邻接矩阵的辅助度为<strong>O(n^2)</strong> 邻接表是<strong>O(n+e)</strong>。</p><p>3、最小生成树。<strong>普利姆算法</strong> （O(n^2)）适合稠密图（边多的）和 <strong>克鲁斯卡尔算法</strong> (O(elog2e)) 适合稀疏图（边少的）</p><p>4、拓扑排序：选择入度为0的任意一节点，删除其相关的边（弧）形成新图，重复上述直至仅剩一个结点。</p><p>5、AOE网。关键路径：最长的路径。</p><p>6、最短路径。迪杰斯特拉（贪心）和佛洛依德（动态规划）</p><h2 id="查找和排序" tabindex="-1">查找和排序 <a class="header-anchor" href="#查找和排序" aria-label="Permalink to &quot;查找和排序&quot;">​</a></h2><p>1、顺序查找。</p><p>2、折半查找。有序的。(O(log2n))</p><p>3、分块查找。需要分块，建立索引表（存放开始下标，和局部最大值），块内部无需有序。效率在1，2之间</p><p>4、哈希。主要是记得解决冲突的方式。注意平均查找长度的计算。</p><p>1、插入排序</p><p>2、希尔排序，不稳定</p><p>3、冒泡排序</p><p>4、快速排序。O(nlog2n)（分治）</p><p>5、简单选择排序。不稳定</p><p>6、堆排序。O(nlog2n) O(n)</p><p>7、归并排序（分治）O(nlog2n) O(n)</p><p>8、基数排序 稳定的</p><p>![]*(./note/test/three/sort.png)</p>',25);function k(b,y,M,v,L,S){return o(),a("div",null,[T,t("p",null,[n("二叉树第i层最多个"),t("mjx-container",r,[(o(),a("svg",Q,d)),i]),n("结点。深度为k的二叉树最大有"),t("mjx-container",m,[(o(),a("svg",h,g)),_]),n("结点。度为2的结点个数n_2，叶子结点的个数n_0，则"),t("mjx-container",u,[(o(),a("svg",x,V)),H]),n("。总节点数等于分支总数+1。")]),f])}const C=s(l,[["render",k]]);export{A as __pageData,C as default};
