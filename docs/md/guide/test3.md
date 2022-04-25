# 面试没答上的题目 4.1

session

vue组件之间传值

props

父组件在子组件标签中传入值，子组件通过props获取。

emit

子组件emit事件，第二个参数可以是传的值，父组件监听事件，获得子组件传的值

ref

父组件为子组件设置ref值，通过ref可以调用子组件的方法和属性。

EventBus

适用于兄弟组件之间传值，创建一个中央事件总线，兄弟组件通过emit触发自定义事件，另一个兄弟组件通过on监听自定义事件

$parent或者$root进行桥接

通过共同祖辈进行桥接。使用emit与on进行监听。 适用于兄弟组件传值。

$attr与$listeners

使用场景:祖先传递数据给子孙。

设置批量向下传属性$attr与$listeners包含了父级作用域中不作为prop

provide与inject

适用于祖先传递数据给子孙组件

祖先组件定义provide属性，返回传递的值。

在后代组件通过inject接收组件传递过来的值

vuex

使用场景，都咋关系的组件数据传递，vuex作用相当于一个用来存储变量的容器。





为什么说vue是渐进式框架？

Vue主张少，不强势，可以在核心基础上任意选用其他的组件，不一定要全部整合在一起。vue只是提供了视图层，至于底层的实现，有很多其他的选择。

```javascript
let a = (resolve, reject) => {
        resolve(Math.random());
    // 返回随机数
};
let b = []
for(let i = 0; i < 3; i++){
    b.push(new Promise(a));
}
//生成Promise数组
function c(p_arr){
    let ans = []
    for(let i = 0; i< p_arr.length; ++ i){
        //获得数组对象中的所有Promise对象
        p_arr[i].then((res=>{
        	ans.push(res);
        }))
        //通过then方法调用
    }
    return ans
}
console.log(c(b));
```



