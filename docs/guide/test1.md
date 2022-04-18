# 面试没答上的题目 3.26

关于Promise相关的问题

Promise中直接return，then能否获得其回调值？

不行。

Vue.js中在v-if新添加了元素之后，如何直接获取新增的dom元素？

使用nextTick API

参数{function callback}[callback]

用法：将回调延迟到下次DOM更新循环之后执行，再修改数据之后立即使用它，然后等待DOM更新。它跟全局方法Vue.nextTick一样，不同的是回调的this自动绑定在它的实例上。

如果没有提供回调且在支持Promise的环境中，则返回一个Promise。请注意Vue不自带Promise的polyfill，所以如果你的目标浏览器不是原生支持Promise，就只能自行polyfill。

```javascript
 methods:{
    btn_click0(){
      this.show0 = Boolean(1 - this.show0)    			//设置为真
      let p0 = document.getElementById('p0');			//此时由于没有进行DOM渲染，所以不能获取到DOM元素
      console.log(p0);
      this.$nextTick(()=>{
        let p0 = document.getElementById('p0');			//回调延迟到下一次DOM更新循环之后更新，此时能够获取到对应的DOM元素。
        console.log(p0);
      })
    },
  },
```



BFC的理解与使用

w3c规范中的BFC定义

浮动元素和绝对定位元素，非块级盒子的块状容器（例如：inline-blocks， table-cells，和table-captions），以及overflow值不为visiable的块级盒子，都会为他们的内容创建新的BFC（块状格式上下文）

在BFC中，盒子从顶端开始垂直地一个接一个地排列，两个盒子之间的垂直的间隙是由他们的margin 值所决定的。在一个BFC中，**两个相邻的块级盒子的垂直外边距会产生折叠**。

在BFC中，每一个盒子的左外边缘（margin-left）会触碰到容器的左边缘(border-left)（对于从右到左的格式来说，则触碰到右边缘）。

BFC的通俗理解：

BFC中元素的布局是不受外界的影响（我们往往利用这个特性来消除浮动元素对其非浮动的兄弟元素和其子元素带来的影响。）并且在一个BFC中块盒与行盒（行盒由一行中所有的内联元素所构成）都会垂直的沿着其父元素的边框排列。

BFC既块状格式上下文，它是页面中一块渲染区域，并且有一套属于自己的渲染规则

1. 内部盒子会在垂直方向上一个接一个的放置。
2. 对于同一个BFC的两个相邻的盒子的margin会发生重合，与方向无关。
3. 每个元素的左外边距回合包含块的左边界相接触，即使浮动元素也是如此。
4. BFC的区域不会和浮动元素区域重叠。
5. 计算BFC的高度时，浮动子元素也参与计算。
6. BFC就是页面上的一个隔离的独立容器，让内部的子元素不会影响到外面的元素，反之亦然。

BFC目的是形成一个相对于外界完全独立的空间，让内部的子元素不会影响到外部的元素。

触发BFC机制的条件：

1. 根元素，即HTML元素。
2. 浮动元素，float值为left、right
3. overflow值不为visible， 为auto、scroll、hidden
4. display的值为inline-block、table-cell、table-caption、table、inlin-table、flex、inline-flex、grid、inline-grid
5. position的值为absolute或者fixed



块级元素与行内元素

标签分为两种等级：1. 行内元素 2.块级元素

行内元素与块级元素的区别：

行内元素：

1. 与其他行内元素并排
2. 不能设置宽高，默认的宽度就是文字的宽度。

块级元素：

1. 霸占一行，不能与其他任何元素并列。
2. 能接受宽高，如果不设置宽度，那么宽度将默认变为父级的100%。



块级元素和行内元素的分类：

在HTML的角度来讲，标签分为：

1. 文本级标签：p，span，a，b，i，u，em
2. 容器级标签：div，h系列，li，dt，dd

p：里面只能放文字和图片和表单元素，p里面不能放h和ul，也不能放p。

从css的角度来讲，就p不同：

1. 行内元素：除了p以外，所有的文本级标签都是行内元素。p是一个文本级标签，但是是个块级元素。
2. 所有的容器级标签都是块级元素，以及p标签。



块级元素和行内元素的互相转换：

使用display属性将块级元素与行内元素进行相互转换。

display:inline；

那么这个标签将变成行内元素，即：

1. 此时这个div将不能设置宽度和高度了。
2. 此时这个div可以和行内其他行内元素并排了。

同样的到了我们也可以将行内元素（如span）转变成块级元素。

display:block;

那么这个span标签将变成块级标签，即：

1. 此时这个span能够设置宽度、高度。
2. 此时这个span必须独占一行，其他元素无法与之并排。
3. 如果不设置宽度，将占满父级。



display能够支持的值：

display:none									该元素不会被显示

display:block									此元素将显示为块级元素，此元素前后会带有换行符

display:inline									此元素将会被显示为行级元素，元素前后没有换行符

display:inline-block					 行内块元素。（CSS 2.1新增的值）

display:list-item							此元素将会作为列表显示

display:run-in								此元素会根据上下文作为块级元素或者行内元素显示

display:table									此元素将会作为块级表格来显示，表格前后带有换行符

display:inline-table					此元素会作为行内表格来显示，表格前后不带有换行符

display:row-group						此元素会作为一个或者多个行的分组来显示

display:header-group				此元素会作为一个或者多个行的分组来显示，

display:footer-group				此元素会作为一个或者多个行的分组来显示

display:table-row						此元素会作为一个表格行来显示

display:table-column-group	此元素会作为一个或者多个列的分组来显示

display:table-column					此元素会作为一个单元格列来显示

display:table-cell							此元素会作为一个表格单元格显示

display:table-caption					此元素会作为一个表格标题显示

display:inherit								规定应该从父元素继承display属性的值。



CSS中的overflow属性

overflow含义为溢出（容器）,当内容超出容器时只需要添加overflow属性值为hidden，就可以把超出容器的部分一藏起来；

如果内容超出容器却又不想将其隐藏时可以将其属性值设置为auto；

overflow：auto 属性如果超出就出现滚动条，如果没有超出就不出现滚动条。

滚动条也可以进行单独设置，例如overflow-x：hidden；overflow-y:auto;这样就只能看见垂直方向的滚动条了。如果单独定义x轴或者y轴的时候，两个属性都需要设置属性值。

overflow属性常见使用4个值

visible、hidden、auto和scroll

visible为overflow的默认值，为超出显示；

hidden为超出隐藏；

auto为自动，即超出会出现滚动条，不超出就没有滚动条；

scroll为内容会被裁剪，但是浏览器会显示滚动条以便查看其余内容。



CSS元素居中的方法

​	利用定位+margin：auto

​		相关代码

​

```html
<style>
    .father{
        width:500px;
        height:300px;
        border:1px solid #0a3b98;
        position: relative;
    }
    .son{
        width:100px;
        height:40px;
        background: #f0a238;
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

父级设置为相对定位，子级设置为绝对定位，并且四个定位属性的值都设置成了0，那么这个时候如果子级元素没有设置宽高，则会被拉开到和父级元素一样宽高。

这里子元素设置了宽高，所以宽高会按照设置来显示，但实际上子级的虚拟占位已经撑满了整个父元素，这个时候给他一个margin：auto就可以上下左右都居中了。



利用定位+margin:负值

绝大多数情况下，设置父元素为相对定位， 子元素移动自身50%实现水平垂直居中

```html
<style>
    .father {
        position: relative;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left:-50px;
        margin-top:-50px;
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

整个实现思路如下图所示：

[![img](https://camo.githubusercontent.com/e8cfaed8e92876561d9e4a00434fc7f9090e9155acbda48680ba74e0574280ae/68747470733a2f2f7374617469632e7675652d6a732e636f6d2f39323264633330302d393566392d313165622d616239302d6439616538313462323430642e706e67)](https://camo.githubusercontent.com/e8cfaed8e92876561d9e4a00434fc7f9090e9155acbda48680ba74e0574280ae/68747470733a2f2f7374617469632e7675652d6a732e636f6d2f39323264633330302d393566392d313165622d616239302d6439616538313462323430642e706e67)

- 初始位置为方块1的位置
- 当设置left、top为50%的时候，内部子元素为方块2的位置
- 设置margin为负数时，使内部子元素到方块3的位置，即中间位置

这种方案不要求父元素的高度，也就是即使父元素的高度变化了，仍然可以保持在父元素的垂直居中位置，水平方向上是一样的操作

但是该方案需要知道子元素自身的宽高，但是我们可以通过下面`transform`属性进行移动

利用定位+transform

实现代码如下：

```html
<style>
    .father {
        position: relative;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
  transform: translate(-50%,-50%);
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

`translate(-50%, -50%)`将会将元素位移自己宽度和高度的-50%

这种方法其实和最上面被否定掉的margin负值用法一样，可以说是`margin`负值的替代方案，并不需要知道自身元素的宽高

table布局

设置父元素为`display:table-cell`，子元素设置 `display: inline-block`。利用`vertical`和`text-align`可以让所有的行内块级元素水平垂直居中

```html
<style>
    .father {
        display: table-cell;
        width: 200px;
        height: 200px;
        background: skyblue;
        vertical-align: middle;
        text-align: center;
    }
    .son {
        display: inline-block;
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

flex弹性布局

还是看看实现的整体代码：

```html
<style>
    .father {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

`css3`中的`flex`布局，可以非常简单实现垂直水平居中

这里可以简单看看`flex`布局的关键属性作用：

- display: flex时，表示该容器内部的元素将按照flex进行布局
- align-items: center表示这些元素将相对于本容器水平居中
- justify-content: center也是同样的道理垂直居中

grid网格布局

```html
<style>
    .father {
            display: grid;
            align-items:center;
            justify-content: center;
            width: 200px;
            height: 200px;
            background: skyblue;

        }
        .son {
            width: 10px;
            height: 10px;
            border: 1px solid red
        }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

这里看到，`gird`网格布局和`flex`弹性布局都简单粗暴



总结：

根据元素标签的性质，可以分为：

- 内联元素居中布局
- 块级元素居中布局

内联元素居中布局

水平居中

- 行内元素可设置：text-align: center
- flex布局设置父元素：display: flex; justify-content: center

垂直居中

- 单行文本父元素确认高度：height === line-height
- 多行文本父元素确认高度：disaply: table-cell; vertical-align: middle

块级元素居中布局

水平居中

- 定宽: margin: 0 auto
- 绝对定位+left:50%+margin:负自身一半

垂直居中

- position: absolute设置left、top、margin-left、margin-top(定高)
- display: table-cell
- transform: translate(x, y)
- flex(不定高，不定宽)
- grid(不定高，不定宽)，兼容性相对比较差







2022年3月28日字节：

转换数字为三个数字一分隔的字符串；

方法1：

```javascript
//通过迭代原数字完成
function toString(num){
	let ans = "";
    let temp = "";
    while(num >= 1000){
        temp = String(num % 1000);
        let n = temp.length;
        for(let i = 0; i < 3 - n; ++ i){
            temp = "0" + temp;
        }
        ans = temp + ',' + ans;
        num = Math.floor(num / 1000);
    }
    if(num > 0){
        ans = String(num) + ',' + ans;
    }
    return ans.slice(0, ans.length - 1);
}
```

方法2：

```javascript
//操作字符串完成
function add_dot(s, pos){
    // 添加逗号的子函数
    return s.slice(0, pos) + ',' + s.slice(pos);
}
function toString(num){
    let ans = "";
    let num_to_str = String(num);
    let num_length = num_to_str.length - 3;
    // 从后往前，每隔三个字符，添加一个逗号。
    while(num_length > 0){
        num_to_str = add_dot(num_to_str, num_length);
        num_length = num_length - 3;
    }
    return num_to_str;
}
```

