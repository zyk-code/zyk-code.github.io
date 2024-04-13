import{_ as a,c as e,o,a5 as t}from"./chunks/framework.CoTJ3bXK.js";const _=JSON.parse('{"title":"R-CNN系列目标检测算法","description":"","frontmatter":{},"headers":[],"relativePath":"note/deep learning/RCNN系列.md","filePath":"note/deep learning/RCNN系列.md","lastUpdated":1713021612000}'),r={name:"note/deep learning/RCNN系列.md"},l=t('<h1 id="r-cnn系列目标检测算法" tabindex="-1">R-CNN系列目标检测算法 <a class="header-anchor" href="#r-cnn系列目标检测算法" aria-label="Permalink to &quot;R-CNN系列目标检测算法&quot;">​</a></h1><h3 id="r-cnn" tabindex="-1">R-CNN <a class="header-anchor" href="#r-cnn" aria-label="Permalink to &quot;R-CNN&quot;">​</a></h3><p>算法步骤：</p><ol><li><p>在图像上利用Selective Seach方法通过图像分割的方式，1-2k个候选框。</p></li><li><p>对每一个候选区域使用深度网络（分类网络）提取特征。一般是2k个，输入出的就是2k*4096特征矩阵（这个4096就是分类网络展开的那个向量的大小）。</p></li><li><p>将特征送入到每一个类的SVM分类器中，进行判别。显然这里分类器是二分类的，对20个类别进行分类，需要k个分类器。因此权值矩阵为4096*m的大小，最后输出的2k×20的矩阵，这里代表的是每个候选区域对应的类别，在进行NMS（非极大值抑制，IoU）就可以剔除重复的建议框。</p></li></ol><p>IoU： 找到得分最高的目标--计算IoU--删除IoU小于设定阈值的建议框</p><ol start="4"><li>使用回归给器精细修正候选框位置。使用20个回归器对20个类比中经过NMS的建议框进行回归，得到修正后得分最高的框.</li></ol><p>存在问题：</p><ol><li><p>测试速度慢。因为SS算法生成候选框耗时，候选框存在重复导致特征提取操作冗余。</p></li><li><p>训练速度慢，过程复杂。SVM分类器需要训练</p></li><li><p>训练需要的空间大。SVM和bbox的回归训练需要通过vgg等网络提取特征</p></li></ol><h3 id="fast-r-cnn" tabindex="-1">Fast-R-CNN <a class="header-anchor" href="#fast-r-cnn" aria-label="Permalink to &quot;Fast-R-CNN&quot;">​</a></h3><p>算法步骤：</p><ol><li>在图像利用Selective Search方法通过图像分割的方式，1-2k个候选区域。</li><li>将图片输入到深度网络中得到相应的特征图，将SS算法的候选框投影到特征图上获得相应的特征矩阵。（参考sppnet）。这里的候选区域也是经过NMS处理。</li><li>将每一个特征矩阵通过ROI（region of interest 感兴趣区域） pooling层缩放到7×7大小的特征图。</li><li>将特征图经过两个全连接展开放入到全连接层进行边界框回归和分类预测（softmax）。注意分类器是N+1的类别概率，加1是因为有个背景概率。边界框回归是在N+1个类别中每个类别对应的（x，y， w， h）回归参数。</li></ol><h3 id="faster-r-cnn" tabindex="-1">Faster-R-CNN <a class="header-anchor" href="#faster-r-cnn" aria-label="Permalink to &quot;Faster-R-CNN&quot;">​</a></h3><p>算法步骤：</p><ol><li>将图像输入特征提取网络得到特征图。</li><li>使用RPN（region proposal network）结构生成候选框，将RPN生成的候选框投影到特征图上获得相应的特征矩阵。</li><li>将每一个特征矩阵通过ROI（region of interest 感兴趣区域） pooling层缩放到7×7大小的特征图。</li><li>将特征图经过两个全连接展开放入到全连接层进行边界框回归和分类预测。</li></ol><p>RPN（region proposal network）：</p><p>在特征图上使用滑动窗口，每滑动一个位置上生成一个向量（一维）。该向量的长度有backbone决定，在zf中是256。然后经过全连接回归出，得到anchor是前背景的概率（跟之前分类不同，该概率是两个一组对应一个anchor）和anchor_box的回归参数，其中anchor数是k（9个，三种尺寸(128,256,512)和三个比例(0.5,1,2)。将anchor调整到候选区中，通过NMS去除冗余的anchor。</p><p>RPN损失函数：</p><p>Faster-R-CNN的损失与Fast-R-CNN是一样的</p><p>训练：</p><p>将RPN+Faster-R-CNN的损失联合训练。</p><p>原论文是分开训练的。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>从R-CNN到Faster-R-CNN，是一个不断将各个模块工作整合的过程。R-CNN是SS算法选出候选区域，对区域进行特征提取，使用svm和回归器进行分类和边框回归。Fast-R-CNN在R-CNN的基础上，将候选区域与特征图相投达到减少重复提取特征的操作，通过全连接层替换svm和边框回归舍去了svm的训练和减少空间开销。Fast-R-CNN还是在SS算法的基础上提供候区域，所以Faster-R-CNN是将SS算法舍弃，使用RPN结构进行候选区域的选取。其实RPN也是网络，这个过程的做法跟单阶段有点像，但是并不是回归出预测框，而是为后一个阶段提供候选区域（个人理解）。</p>',23),i=[l];function n(N,p,s,c,h,d){return o(),e("div",null,i)}const S=a(r,[["render",n]]);export{_ as __pageData,S as default};
