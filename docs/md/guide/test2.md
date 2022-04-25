# 面试没答上的题目 3.28

## JS进行URL解析

```javascript
let string = "https://www.baidu.com/s?wd=sdfasdfasdf&rsv_spt=1&rsv_iqid=0xfd6ff4bf0002ff30&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&rsv_sug3=12&rsv_sug1=2&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&inputT=1523&rsv_sug4=1758&rsv_jmp=fail"

function analyse(s){
    let obj = {}
    obj['type'] = s.split(':')[0];
    let s_new = s.split(':')[1].slice(2,)
    obj['host'] = s_new.slice(0, s_new.indexOf('/'));
    if(obj['host'].indexOf(':') > 0){
        obj['port'] = obj['host'].slice(obj['host'].indexOf(':')+1, );
        obj['host'] = obj['host'].slice(0, obj['host'].indexOf(':'));
    }
    else{
        if(obj['type'] === 'https'){
            obj['port'] = 443;
        }else{
            obj['port'] = 80;
        }
    }
    s_new = s_new.slice(s_new.indexOf('/')+1, );
    obj['source_method'] = s_new.split('?')[0];
    s_new = s_new.split('?')[1];
    let data_split = s_new.split('&');
    data_item = {}
    for (let i = 0; i < data_split.length; i++){
        let item = data_split[i].split('=');
        data_item[item[0]] = item[1];
    }
    obj['data'] = data_item;
    console.log(obj);
}


```

执行上下文

简单来说，执行上下文是一种对JavaScript代码执行环境得抽象概念，也就是说，只要有JavaScript代码运行，那么它就一定是执行在执行上下文中。

执行上下文的类型主要有两种：

全局执行上下文：只有一个，浏览器中的全局对象就是window对象，this指向这个全局对象。

函数执行上下文：存在无数个，只有函数被调用的时候才会被创建，每次调用函数都会创建一个新的执行上下文。

可以有任意多个函数上下文，每次调用函数创建一个新的上下文会创建一个私有作用域，函数内部声明的任何变量都不会再当前函数作用域外部直接访问。

函数生命周期

创建上下文的生命周期包含三个阶段：创建阶段，执行阶段，回收阶段

创建阶段做了三件事：

确定this的值，this binding

词法环境组件被创建

变量环境被创建

This Binding

确定`this`的值我们前面讲到，`this`的值是在执行的时候才能确认，定义的时候不能确认

词法环境

词法环境有两个部分：

全局环境：是一个没有外部环境的词法环境，其外部环境引用为null，有一个全局对象，this的值指向这个全局对象。

函数环境：用户在函数中定义的变量被存储在环境记录中，包含了arguments对象，外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境。

变量环境

变量环境也是一个词法环境，因此它具有上面定义的词法环境的所有属性

在ES6中，词法环境和变量环境的区别在于前者用于存储函数声明和变量（let 跟 const）绑定，后者仅用于存储变量（var）绑定。



`let`和`const`定义的变量`a`和`b`在创建阶段没有被赋值，但`var`声明的变量从在创建阶段被赋值为`undefined`

这是因为，创建阶段，会在代码中扫描变量和函数声明，然后将函数声明存储在环境中

但变量会被初始化为`undefined`(`var`声明的情况下)和保持`uninitialized`(未初始化状态)(使用`let`和`const`声明的情况下)

这就是变量提升的实际原因。

执行阶段

在这个阶段执行变量赋值，代码执行，如果JavaScript引擎在源代码中生命的实际位置找不到变量的值，那么将为其分配undefined值。

回收阶段

执行上下文出栈，等待虚拟机回收执行上下文。



执行栈

执行栈也叫调用栈，具有LIFO（后进先出）结构，用户存储在代码执行期间所有的执行上下文，当JS引擎开始执行第一行js脚本代码时，他就会创建一个全局执行上下文然后将它压到执行栈中

引擎会执行位于执行栈栈顶的执行上下文（一般是函数执行上下文）。当函数执行结束后，对应的执行上下文就会被弹出，然后控制流程到达执行栈的下一个执行上下文。



```javascript
let a = 'Hello World!';
function first() {
  console.log('Inside first function');
  second();
  console.log('Again inside first function');
}
function second() {
  console.log('Inside second function');
}
first();
console.log('Inside Global Execution Context');
// 简单分析一下流程：

//创建全局上下文请压入执行栈
//first函数被调用，创建函数执行上下文并压入栈
//执行first函数过程遇到second函数，再创建一个函数执行上下文并压入栈
//second函数执行完毕，对应的函数执行上下文被推出执行栈，执行下一个执行上下文first函数
//first函数执行完毕，对应的函数执行上下文也被推出栈中，然后执行全局上下文
//所有代码执行完毕，全局上下文也会被推出栈中，程序结束
```



JavaScript静态方法与静态属性

静态方法是使用static关键字修饰的方法，又叫做类方法，属于类，但并不属于对象，在实例化对象之前就可以使用类名.方法名调用静态方法。静态方法不能在对象上调用，只能在类中调用。

```javascript
//静态属性与静态方法(ES6明确规定，Class内部只有静态方法，没有静态属性 )
            
//1.不会被类实例所拥有的属性与方法,只是类自身拥有
//2.只能通过类调用
            
//通过static关键字声明一个静态方法

class Test{
    constructor(name){
        this.name = name;
    }
    static hello(){
        return "hello";
    }
    hello(){
        return "hello" + this.name;
    }
    
}
Test.name = "test_name";
//静态成员函数只能通过类名调用，不能通过对象实例访问，但是，对象中的静态方法能够跟实例方法名字相同。
//能够在函数外直接添加属性的方式为变量添加属性,以此来完成函数的解耦。
```



模块化编程

模块，是能够单独命名并独立完成一定功能的程序语句的集合（及程序代码和数据结构的集合体）

两个基本特征：

外部特征与内部特征

外部特征是指模块跟外部环境联系的接口，（即其他模块或程序调用该模块的方式，包括有输入输出参数、引用的全局变量）和模块的功能。

内部特征是指模块的内部环境具有的特点（即该模块的局部数据和程序代码）

为什么需要模块化

- 代码抽象
- 代码封装
- 代码复用
- 依赖管理

如果没有模块化，我们代码会怎样？

- 变量和方法不容易维护，容易污染全局作用域
- 加载资源的方式通过script标签从上到下。
- 依赖的环境主观逻辑偏重，代码较多就会比较复杂。
- 大型项目资源难以维护，特别是多人合作的情况下，资源的引入会让人奔溃

因此，需要一种将`JavaScript`程序模块化的机制，如

- CommonJs (典型代表：node.js早期)
- AMD (典型代表：require.js)
- CMD (典型代表：sea.js)

ES6在语言标准的层面上实现了Module，即模块功能，完全可以取代CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。

```javascript
//ES6规定的新语法
import {stat, exits, readFile} from 'fs';
// CommonJS模块
let { stat, exists, readfile } = require('fs');
// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

ES6模块内部采用了严格模式。

模块功能主要由两个命令构成：

export： 用于规定模块的对外接口。

import：用于输入其他模块提供的功能。

export

```javascript
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

或 
// 建议使用下面写法，这样能瞬间确定输出了哪些变量
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };

// 输出函数或者类
export function multiply(x, y) {
  return x * y;
};
// 通过as可以进行输出变量的重命名
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

import

使用了export命令定义了模块的对外接口后，其他JS文件就可以通过import命令加载这个模块。

```javascript
//main.js
import {firstName, lastName, year} from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}

// 可以通过as给输入变量取别名
import {lastName as surname} from './profile.js';

//当加载整个模块的时候，需要使用星号
import * as circle from './circle';
console.log(circle)   // {area:area,circumference:circumference}

```

模块输出的变量都是只读的，不允许修改，但是如果是对象，允许修改属性。`import`后面我们常接着`from`关键字，`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径。在编译阶段，import会提升到整个模块的头部，首先执行。

多次重复执行同样的导入，只会执行一次。

上面的情况，用户在导入模块的时候，需要知道加载的变量名和函数，否则就无法加载，如果不知道变量名或者函数就完成加载，则要用到*export default*命令，为模块指定默认输出。

```javascript
export default function(){
    console.log('foo');
}

import customName from './XXX.js';
customName(); //'foo';
```

动态加载：

允许用户仅在需要时动态加载模块，而不必预先加载所有模块。这存在明显的性能优势，这个功能，允许使用import()作为函数调用，并且返回一个promise对象。在promise对象的then中，可以访问该模块的内容。

```javascript
import('/modules/myModule.mjs').then((module)=>{
    //Do something with the module;
})
```

复合写法

如果在一个模块中，先输入后输出同一个模块，import语法可以与export语句写在一起。

```javascript
export {foo, bar} from "my_module";
//基本等效于下面的
import {foo, bar} from "my_module";
export {foo, bar};
```

Mac地址

Mac地址用来定义网络设备的位置，由48比特长、12位的16进制数字组成，从左到右开始，1到24bit是厂商向IETF等机构申请用来标识IETF等机构申请用来标识厂商的代码，25-48比特位由厂商自行分配，是各个厂商制造的所有网卡的一个唯一编号。



JS编程，同一个代码段中，对于函数，可以后定义先使用

