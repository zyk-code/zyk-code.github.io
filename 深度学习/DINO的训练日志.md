## 环境配置

1、配环境和安装torch和torchvison(注意和CUDA版本对应)

2、编译 CUDA operators
```shell
cd models/dino/ops
# 或 sh make.sh
python setup.py build install
# unit test (should see all checking is True)
# 测试 会报内存溢出错误，正常
python test.py
cd ../../..
```
## 训练

1、先要配置`./config/DINO`下的文件中选择一个符合需求的文件进行配置，如`DINO_4scale.py`下的`dn_labelbook_size `和 `num_classes`配置为你数据集的类别数**+1**（因为会把背景当作另外的一个类）。

2、修改`models/dino.py`716行
```python
match_unstable_error = args.match_unstable_error
dn_labelbook_size = args.dn_labelbook_size
if dn_labelbook_size < num_classes:
    dn_labelbook_size = num_classes

```

3、通过命令行启动(可以更换不同的骨干网络)
-c 跟1中的配置文件
-coco_path 是数据集合的目录路径（相对路径可能会失效）
```shell
python main.py --output_dir ./logs/DINO/R50_IP102_finetune -c ./config/DINO/DINO_4scale.py --coco_path /root/桌面/Detection/DINO/URPC2020_old_coco --options dn_scalar=100 embed_init_tgt=TRUE dn_label_coef=1.0 dn_bbox_coef=1.0 use_ema=False dn_box_noise_scale=1.0
```
## 遇到的问题
1、编译不通过
原因：CUDA版本和Pytoch版本的关系。通常在pytoch官网会给出每个pytoch和cuda对应版本的安装，当本地cuda版本与之不对应时，不会影响无需经过cuda编译的模块。当需要使用cuda编译模块（可变形卷积、可变形注意力等）时，否则会报错导致编译不通过，本地安装失败无法运行后续代码。
解决方法：安装和CUDA版本对应的pytorch（可以直接安装whl包）

2、很多的包没有安装上
解决方法：`pip install 包名`
3、报错在`DINO/util/slconfig.py`317行
解决方法：修改成下面的代码。在社区里有issue提到，跟`yapf`的版本有关。

```python
# text, _ = FormatCode(text, style_config=yapf_style, verify=True)
text, _ = FormatCode(text, style_config=yapf_style) #, verify=True
```