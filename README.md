## 项目中避免重复渲染优化流程

现在项目中的react 并没有做判断数据是否改变做渲染的处理，造成部分的性能问题。现在针对上述问题做部分处理。

1.针对model 的处理。现在在页面跟store 连接上 mapStateToProps 中，返回都是model 的namespace  也就是整个model 数据。
避免如下这种：

```
const mapStateToProps = ({user}) => {
  return {
    user,
  }
}
```

改为：

```
const mapStateToProps = ({user}) => {
  const { user_name } = user
  return {
    user_name,
  }
}
```

2.应用  Immutable.js。在处理model  中的对象以及数组时，应用 Immutable.js

3.shouldComponentUpdate 中用 Immutable.js  的is 函数判断 组件中的state 和 props 是否改变(可考虑写成公共函数)