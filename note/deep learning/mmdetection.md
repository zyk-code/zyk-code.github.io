# MMDetection 2的安装与训练

### 安装

condan环境

```shell
conda create -n openmmlab python=3.8
conda activate openmmlab
```

torch 安装

```shell
pip install torch==1.12.1+cu113 torchvision==0.13.1+cu113 torchaudio==0.12.1 --extra-index-url https://download.pytorch.org/whl/cu113
```

安装 mmengin 和 mmcv （这里有玄学的版本对应问题）

```shell
pip install -U openmim
mim install mmengine==0.7.0
mim install mmcv==2.0.1
```

本地安装mmdet，这种方式可以训练

```shell
git clone https://github.com/open-mmlab/mmdetection.git
cd mmdetection
pip install -v -e .
# "-v" 指详细说明，或更多的输出
# "-e" 表示在可编辑模式下安装项目，因此对代码所做的任何本地修改都会生效，从而无需重新安装。
```

### 训练

#### urpc自定义数据集训练

1、在 `mmdet/datasets` 下新建一个文件 `urpc.py` 在文件中创建自定义数据类。

```python
from mmdet.registry import DATASETS
from .coco import CocoDataset
import copy
import os.path as osp
from typing import List, Union
from mmengine.fileio import get_local_path
from mmdet.registry import DATASETS

@DATASETS.register_module()

class URPCDataset(CocoDataset):
    METAINFO = {
        'classes': ("holothurian", "echinus", "starfish", "scallop")}


    def load_data_list(self) -> List[dict]:
        """Load annotations from an annotation file named as ``self.ann_file``

        Returns:
            List[dict]: A list of annotation.
        """  # noqa: E501

        with get_local_path(
                self.ann_file, backend_args=self.backend_args) as local_path:
            self.coco = self.COCOAPI(local_path)

        # The order of returned `cat_ids` will not

        # change with the order of the `classes`

        self.cat_ids = self.coco.get_cat_ids(
            cat_names=self.metainfo['classes'])
        self.cat2label = {cat_id: i for i, cat_id in enumerate(self.cat_ids)}
        self.cat_img_map = copy.deepcopy(self.coco.cat_img_map)
        img_ids = self.coco.get_img_ids()
        data_list = []
        total_ann_ids = []

        for img_id in img_ids:
            raw_img_info = self.coco.load_imgs([img_id])[0]
            raw_img_info['img_id'] = img_id
            ann_ids = self.coco.get_ann_ids(img_ids=[img_id])
            raw_ann_info = self.coco.load_anns(ann_ids)
            total_ann_ids.extend(ann_ids)
            parsed_data_info = self.parse_data_info({
                'raw_ann_info':
                raw_ann_info,
                'raw_img_info':
                raw_img_info
            })

            data_list.append(parsed_data_info)

        if self.ANN_ID_UNIQUE:
            assert len(set(total_ann_ids)) == len(
                total_ann_ids
            ), f"Annotation ids in '{self.ann_file}' are not unique!"

        del self.coco

        return data_list


    def parse_data_info(self, raw_data_info: dict) -> Union[dict, List[dict]]:

        """Parse raw annotation to target format.

        Args:
            raw_data_info (dict): Raw data information load from ``ann_file``
        Returns:
            Union[dict, List[dict]]: Parsed annotation.

        """

        img_info = raw_data_info['raw_img_info']
        ann_info = raw_data_info['raw_ann_info']

        data_info = {}

        # TODO: need to change data_prefix['img'] to data_prefix['img_path']

        img_path = osp.join(self.data_prefix['img'], img_info['file_name'])

        if self.data_prefix.get('seg', None):
            seg_map_path = osp.join(
                self.data_prefix['seg'],
                img_info['file_name'].rsplit('.', 1)[0] + self.seg_map_suffix)

        else:
            seg_map_path = None

        data_info['img_path'] = img_path
        data_info['img_id'] = img_info['img_id']
        data_info['seg_map_path'] = seg_map_path
        data_info['height'] = img_info['height']
        data_info['width'] = img_info['width']

        if self.return_classes:
            data_info['text'] = self.metainfo['classes']
            data_info['custom_entities'] = True

        instances = []

        for i, ann in enumerate(ann_info):
            instance = {}
            if ann.get('ignore', False):
                continue

            x1, y1, w, h = ann['bbox']

            inter_w = max(0, min(x1 + w, img_info['width']) - max(x1, 0))
            inter_h = max(0, min(y1 + h, img_info['height']) - max(y1, 0))
            if inter_w * inter_h == 0:
                continue
            if ann['area'] <= 0 or w < 1 or h < 1:
                continue

            if ann['category_id'] not in self.cat_ids:
                continue

            bbox = [x1, y1, x1 + w, y1 + h]

            if ann.get('iscrowd', False):
                instance['ignore_flag'] = 1

            else:
                instance['ignore_flag'] = 0

            instance['bbox'] = bbox
            instance['bbox_label'] = self.cat2label[ann['category_id']]

            if ann.get('segmentation', None):
                instance['mask'] = ann['segmentation']

            instances.append(instance)

        data_info['instances'] = instances

        return data_info

    def filter_data(self) -> List[dict]:

        """Filter annotations according to filter_cfg.

        Returns:
            List[dict]: Filtered results.

        """

        if self.test_mode:
            return self.data_list

        if self.filter_cfg is None:
            return self.data_list

        filter_empty_gt = self.filter_cfg.get('filter_empty_gt', False)
        min_size = self.filter_cfg.get('min_size', 0)

        # obtain images that contain annotation

        ids_with_ann = set(data_info['img_id'] for data_info in self.data_list)

        # obtain images that contain annotations of the required categories

        ids_in_cat = set()

        for i, class_id in enumerate(self.cat_ids):
            ids_in_cat |= set(self.cat_img_map[class_id])

        # merge the image id sets of the two conditions and use the merged set

        # to filter out images if self.filter_empty_gt=True

        ids_in_cat &= ids_with_ann
        valid_data_infos = []

        for i, data_info in enumerate(self.data_list):

            img_id = data_info['img_id']
            width = data_info['width']
            height = data_info['height']

            if filter_empty_gt and img_id not in ids_in_cat:
                continue

            if min(width, height) >= min_size:
                valid_data_infos.append(data_info)

        return valid_data_infos
```

2、在 `configs/_base_/datasets` 目录下创建 `urpc_detection.py`

```python
dataset_type = 'URPCDataset'  # 新类名

data_root = '/root/Desktop/Detection/URPC2020/'  # 数据集位置（COCO格式）

img_norm_cfg = dict(

    mean=[123.675, 116.28, 103.53], std=[58.395, 57.12, 57.375], to_rgb=True)

img_scale = (1225, 954)  # 数据集中图片的输入大小

backend_args = None

classes = ("holothurian", "echinus", "starfish", "scallop")

train_pipeline = [

    dict(type='LoadImageFromFile', backend_args=backend_args),

    dict(type='LoadAnnotations', with_bbox=True),

    dict(type='Resize', scale=img_scale, keep_ratio=True),

    dict(type='RandomFlip', prob=0.5),

    dict(type='PackDetInputs')

]

test_pipeline = [

    dict(type='LoadImageFromFile', backend_args=backend_args),

    dict(type='Resize', scale=img_scale, keep_ratio=True),

    # If you don't have a gt annotation, delete the pipeline

    dict(type='LoadAnnotations', with_bbox=True),

    dict(

        type='PackDetInputs',

        meta_keys=('img_id', 'img_path', 'ori_shape', 'img_shape',

                   'scale_factor'))

]

train_dataloader = dict(

    batch_size=2,

    num_workers=2,

    persistent_workers=True,

    sampler=dict(type='DefaultSampler', shuffle=True),

    batch_sampler=dict(type='AspectRatioBatchSampler'),

    dataset=dict(

        metainfo=dict(classes=classes),

        type=dataset_type,

        data_root=data_root,

        ann_file='annotations/train.json',

        data_prefix=dict(img='train/'),

        filter_cfg=dict(filter_empty_gt=True, min_size=32),

        pipeline=train_pipeline,

        backend_args=backend_args))

val_dataloader = dict(

    batch_size=1,

    num_workers=2,

    persistent_workers=True,

    drop_last=False,

    sampler=dict(type='DefaultSampler', shuffle=False),

    dataset=dict(

        metainfo=dict(classes=classes),

        type=dataset_type,

        data_root=data_root,

        ann_file='annotations/val.json',

        data_prefix=dict(img='val/'),

        test_mode=True,

        pipeline=test_pipeline,

        backend_args=backend_args))

test_dataloader = val_dataloader

val_evaluator = dict(

    type='CocoMetric',

    ann_file=data_root + 'annotations/val.json',

    metric='bbox',

    format_only=False,

    backend_args=backend_args)

test_evaluator = val_evaluator

# inference on test dataset and

# format the output results for submission.

test_dataloader = dict(

    batch_size=1,

    num_workers=2,

    persistent_workers=True,

    drop_last=False,

    sampler=dict(type='DefaultSampler', shuffle=False),

    dataset=dict(

        metainfo=dict(classes=classes),

        type=dataset_type,

        data_root=data_root,

        ann_file=data_root + 'annotations/test.json',

        data_prefix=dict(img='test2017/'),

        test_mode=True,

        pipeline=test_pipeline))

test_evaluator = dict(

    type='CocoMetric',

    metric='bbox',

    format_only=True,

    ann_file=data_root + 'annotations/test.json',

    outfile_prefix='./work_dirs/coco_detection/test')
```

3、在工作目录下创建配置文件。这里使用了ssd模型，所以在 `configs/ssd` 目录下构建 `ssd_urpc.py`

```python

_base_ = [
    '../_base_/models/ssd300.py', '../_base_/datasets/urpc_detection.py',
    '../_base_/schedules/schedule_2x.py', '../_base_/default_runtime.py'
]

# dataset settings
input_size = 300
train_pipeline = [
    dict(type='LoadImageFromFile', backend_args={{_base_.backend_args}}),
    dict(type='LoadAnnotations', with_bbox=True),
    dict(
        type='Expand',
        mean={{_base_.model.data_preprocessor.mean}},
        to_rgb={{_base_.model.data_preprocessor.bgr_to_rgb}},
        ratio_range=(1, 4)),
    dict(
        type='MinIoURandomCrop',
        min_ious=(0.1, 0.3, 0.5, 0.7, 0.9),
        min_crop_size=0.3),
    dict(type='Resize', scale=(input_size, input_size), keep_ratio=False),
    dict(type='RandomFlip', prob=0.5),
    dict(
        type='PhotoMetricDistortion',
        brightness_delta=32,
        contrast_range=(0.5, 1.5),
        saturation_range=(0.5, 1.5),
        hue_delta=18),
    dict(type='PackDetInputs')
]
test_pipeline = [
    dict(type='LoadImageFromFile', backend_args={{_base_.backend_args}}),
    dict(type='Resize', scale=(input_size, input_size), keep_ratio=False),
    dict(type='LoadAnnotations', with_bbox=True),
    dict(
        type='PackDetInputs',
        meta_keys=('img_id', 'img_path', 'ori_shape', 'img_shape',
                   'scale_factor'))
]
train_dataloader = dict(
    batch_size=8,
    num_workers=2,
    batch_sampler=None,
    dataset=dict(
        _delete_=True,
        type='RepeatDataset',
        times=5,
        dataset=dict(
            type={{_base_.dataset_type}},
            data_root={{_base_.data_root}},
            ann_file='annotations/train.json',
            data_prefix=dict(img='train2017/'),
            filter_cfg=dict(filter_empty_gt=True, min_size=32),
            pipeline=train_pipeline,
            backend_args={{_base_.backend_args}})))
val_dataloader = dict(batch_size=8, dataset=dict(pipeline=test_pipeline))
test_dataloader = val_dataloader

# # optimizer
# optim_wrapper = dict(
#     type='OptimWrapper',
#     optimizer=dict(type='SGD', lr=2e-3, momentum=0.9, weight_decay=5e-4))

# custom_hooks = [
#     dict(type='NumClassCheckHook'),
#     dict(type='CheckInvalidLossHook', interval=50, priority='VERY_LOW')
# ]

# NOTE: `auto_scale_lr` is for automatically scaling LR,
# USER SHOULD NOT CHANGE ITS VALUES.
# base_batch_size = (8 GPUs) x (8 samples per GPU)
# auto_scale_lr = dict(base_batch_size=16)
data = dict(samples_per_gpu=2, workers_per_gpu=2)  # 显卡配置

evaluation = dict(interval=1, metric='bbox')

optimizer = dict(type='SGD', lr=0.01, momentum=0.9, weight_decay=0.0001)  # 学习率调整

# 训练策略

lr_config = dict(

    policy='step',

    warmup='linear',

    warmup_iters=500,

    warmup_ratio=0.001,

    step=[8, 10, 12])

runner = dict(type='EpochBasedRunner', max_epochs=12)  # 训练轮次

log_config = dict(interval=50, hooks=[dict(type='TextLoggerHook')])

# load_from = ''

# resume_from = ''

fp16 = dict(loss_scale='dynamic')  # 混合精度训练

work_dir = ''  # 模型、日志保存位置

```

4、训练

```shell
 python ./tools/train.py ./configs/ssd/ssd_urpc.py
```

#### 构建模型

需要在 `configs` 下创建一个工作目录或在原来的目录中添加，例如在 `atss` 中添加 `atss_r50_fpn_opixray.py` 用于构建模型。

```python
# model settings

# 需要修改的

# type='ATSS'

# num_classes

model = dict(

    type='ATSS', # 替换

    data_preprocessor=dict(

        type='DetDataPreprocessor',

        mean=[123.675, 116.28, 103.53],

        std=[58.395, 57.12, 57.375],

        bgr_to_rgb=True,

        pad_size_divisor=32),

    backbone=dict(

        type='ResNet',

        depth=50,

        num_stages=4,

        out_indices=(0, 1, 2, 3),

        frozen_stages=1,

        norm_cfg=dict(type='BN', requires_grad=True),

        norm_eval=True,

        style='pytorch',

        init_cfg=dict(type='Pretrained', checkpoint='torchvision://resnet50')),

    neck=dict(

        type='FPN',

        in_channels=[256, 512, 1024, 2048],

        out_channels=256,

        start_level=1,

        add_extra_convs='on_output',

        num_outs=5),

    bbox_head=dict(

        type='ATSSHead',

        num_classes=5,  # 类别数修改

        in_channels=256,

        stacked_convs=4,

        feat_channels=256,

        anchor_generator=dict(

            type='AnchorGenerator',

            ratios=[1.0],

            octave_base_scale=8,

            scales_per_octave=1,

            strides=[8, 16, 32, 64, 128]),

        bbox_coder=dict(

            type='DeltaXYWHBBoxCoder',

            target_means=[.0, .0, .0, .0],

            target_stds=[0.1, 0.1, 0.2, 0.2]),

        loss_cls=dict(

            type='FocalLoss',

            use_sigmoid=True,

            gamma=2.0,

            alpha=0.25,

            loss_weight=1.0),

        loss_bbox=dict(type='GIoULoss', loss_weight=2.0),

        loss_centerness=dict(

            type='CrossEntropyLoss', use_sigmoid=True, loss_weight=1.0)),

    # training and testing settings

    train_cfg=dict(

        assigner=dict(type='ATSSAssigner', topk=9),

        allowed_border=-1,

        pos_weight=-1,

        debug=False),

    test_cfg=dict(

        nms_pre=1000,

        min_bbox_size=0,

        score_thr=0.05,

        nms=dict(type='nms', iou_threshold=0.6),

        max_per_img=100))

# optimizer

optimizer = dict(type='SGD', lr=0.01, momentum=0.9, weight_decay=0.0001)
```

训练时，回到上面自定义数据集的第3步，修改配置。
