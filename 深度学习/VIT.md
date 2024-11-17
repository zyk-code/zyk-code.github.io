# Vision Transformer

### Transformer

来源于谷歌的《attention is all you need》。解决RNN和LSTM的记忆长度短，无法并行化的问题。它在结构分为两个部分：encode 和 decode。它的灵魂是self attention 和 multiple header attention 。

**self attention**

将一个输入的矩阵a(经过位置编码：通过公式或可训练的位置编码（视觉多用）)，通过linner映射为Q K V，这里对应三个参数W，是需要学习的。将得到映射的

**Multiple attention** 

```python
class Attention(nn.Module):
    """
    多头注意力机制
    """
    def __init__(self,
                 dim,  # 输入的token的dim
                 num_headers=8,
                 qkv_bias=False,
                 qk_scale=None,
                 attn_drop_ratio=0.,
                 proj_drop_ratio=0.
                 ):
        super(Attention, self).__init__()
        self.num_headers = num_headers
        header_dim = dim // num_headers
        # 就是根号dk
        self.scale = qk_scale or header_dim ** - 0.5
        # 分别使用3个线性层 和 使用一个是差不多的效果
        # 这里就qkv的参数
        self.qkv = nn.Linear(dim, dim * 3, bias=qkv_bias)
        self.attn_drop = nn.Dropout(attn_drop_ratio)
        # concat的wo
        self.proj = nn.Linear(dim, dim)
        self.proj_drop = nn.Dropout(proj_drop_ratio)

    def forward(self, x):
        # [B, num_patch+1, token_dim ] +1是因为开始token
        B, N, C = x.shape
        # qkv: -->[B, N+1, 3*dim]  -->[B, N+1, 3, num_header, embed_dim_header]
        # permute: ->[3, B, num_header, N+1 ,embed_dim_header]
        qkv = self.qkv(x).reshape(B, N, 3, self.num_headers, C // self.num_headers).permute(2, 0, 3, 1, 4)
        Q, K, V = qkv[0], qkv[1], qkv[2]
        attn = (Q @ K.transpose(-2, -1)) * self.scale
        attn = attn.softmax(dim=-1)
        attn = self.attn_drop(attn)
        # 通过reshape完成concat
        x = (attn @ V).transpose(1, 2).reshape(B, N, C)
        x = self.proj(x)
        x = self.proj_drop(x)
        return x
```



### VIT

  将12个encode进行堆叠，但这之前需要经过一定给的处理。通过一个超级大卷积核将图片分为patch

**PatchEmbedding**

将一张224*224的图片通过卷积（卷积核大小16, 步长是16）得到 C×14×14的特征图，将每个通道到的特征图展开为向量，将这个进行reshape为14×14 × C。这里我的理解是将每个通道的第一个位置组合在一起看作第一块图片的向量表示。这样将原始图像切分成14个部分并通过一个dim为c的token表示。

```python
class PatchEmbed(nn.Module):
    """
    2D Image to patch embedding
    """

    def __init__(self, img_size=224, patch_size=16, in_channels=3, embed_dim=768, norm_layer=None):
        super(PatchEmbed, self).__init__()
        self.img_size = (img_size, img_size)
        self.patch_size = (patch_size, patch_size)
        self.grid_size = (self.img_size[0] // self.patch_size[0], self.img_size[1] // self.patch_size[1])
        self.num_patches = self.grid_size[0] * self.grid_size[1]

        self.proj = nn.Conv2d(in_channels, embed_dim, kernel_size=patch_size, stride=patch_size)
        self.norm = norm_layer(embed_dim) if norm_layer else nn.Identity()

    def forward(self, x):
        B, C, H, W = x.shape
        assert H == self.img_size[0] and W == self.img_size[1], \
            f"模型输入的图片大小不符合"
        # [B, C, H, W] ==> [B, C, HW] ==> [B, HW, C]
        x = self.proj(x).flatten(2).transpose(1, 2)
        x = self.norm(x)
        return x
```

### Swin Transformer

#### Patch Merging



#### W-MSA

像是对patch分组，在组内进行多头注意力。

优点是少参数量，而且窗口大小随着下采样会变化

缺点是窗口间没有信息交互

#### SW-MSA

为了完成窗口间信息交互

shifted window是将4--9个window。这里有一个很有意思的地方，像扭魔方一样，将9个不规则的窗口变换整齐。

#### Relative position bias

相对位置偏移编码

将特征图中每个格子作为关键起点与其他格子的相对行列坐标关系矩阵，把矩阵展开拼接在一个大矩阵中，通过于窗口大小相关的运算将大矩阵中的二元坐标准换为一元坐标，在到biaslist里寻找对应的bias
