
## 项目启动
* npm i   / yarn
* npm run dev / yarn dev
## 项目分支
* master为主分支,所有副分支代码均需要提交到主分支中
* 五位一体业务代码分支为main分支，main分支中只允许提交views和assets中内容
## Vue书写规范

### 1 Vue属性书写顺序

```javascript
export default {
  mixins,
  data,
  props,
  computed,
  created,
  ready,   // => 生命周期顺序不赘述
  watch,
  components,
  methods
}
```



### 2 组件

#### 2.1 命名
* 在单页面文件中，组件以小驼峰命名引入,在template中使用时候以为短横线连接使用
组件名应该始终由多个单词组成，除了根组件 App，以及 <transition>、<component> 之类的 Vue 内置组件。
组件名称应该倾向于完整的单词，而不是缩写。编辑器中的自动补全已经让书写长命名的代价非常之低了，而其带来的明确性却是非常宝贵的。不常用的缩写尤其应该避免。
```vue
<template>
  <my-components></my-components>
</template>
<script>
  import myComponents from './myComponents.vue'

  export default {
  components: {
  	  myComponents
    }
  }
</script>
```
* 组件在js/jsx 中应该使用大驼峰命名方式引入或者使用,而不是小驼峰或者短横线
```javascript
//good 
app.component('MyComponent', {
})
import MyComponent from './MyComponent.vue'
export default {
  name: 'MyComponent',
}
// bad
app.component('myComponent', {
})
import myComponent from './MyComponent.vue'
export default {
  name: 'myComponent',
}
export default {
  name: 'my-component',
}
```
* data 局部变量命名
代码中的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式
所需常量均使用大写或加下划线的方式
``` javascript
// good
let BASE_URL = '192.168.1.1:8080'
```
* Prop 命名
在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。
```javascript
// good
props: {
  greetingText: String
}
<WelcomeMessage greeting-text="hi"/>
// bad
props: {
  'greeting-text': String
}
<WelcomeMessage greetingText="hi"/>
```
* 多个 attribute 的元素
多个 attribute 的元素应该分多行撰写，每个 attribute 一行。
在 JavaScript 中，用多行分隔对象的多个 property 是很常见的最佳实践，因为这样更易读。模板和 JSX 都需要做同样的考量。
```javascript
// good
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
// bad
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
<MyComponent foo="a" bar="b" baz="c"/>
```

#### 2.2 Vue组件的书写顺序
建议：template script style 的顺序书写
```vue
<template></template>
<script></script>
<style></style>
```
#### 2.3 组件引用
组件引用规则
```javascript
  import myComponentsA from './myComponentsA.vue'  
  import myComponentsB from './myComponentsB.vue'
  import myComponentsC from './myComponentsC.vue'
  import myComponentsD from './myComponentsD.vue'
  export default {
    components: {
  	  myComponentsA,
      myComponentsB,
      myComponentsC,
      myComponentsD,
    }
  }
```
#### 2.4 全局组件
全局组件在components文件夹中创建均使用短横线连接
全局组件方法逻辑需要配上相对应的注释
#### 2.5 接口request命名规则
* requests文件分类
所有request分类按照实际页面的大模块划分，创建文件夹，文件夹中js文件也使用文件夹名称命名

* requests函数命名
列表接口 使用listAPI结尾
新增接口 使用createAPI结尾
删除接口 使用removeAPI结尾
修改接口 使用updateAPI结尾
统计接口 使用countAPI结尾
其他方法 均统一使用API结尾
避免一个同一个request方法在多个文件中重复书写
```javascript
// good
export const enterpriseListAPI = (params) => {
  return request({
    url: '/api/enterprise-list',
    method: 'get',
    params: params
  })
}
// bad
export const getEnterpriseAPI = (params) => {
  return request({
    url: '/api/enterprise',
    method: 'get',
    params: params
  })
}
```
#### 2.6 methods方法命名
所有methods方法命名均使用驼峰,命名需语义化，不允许使用汉拼、或者含有数字命名
```javascript
  // good
  export default {
    methods: {
      getTableData(){

      }
    },
  }
  // bad
  export default {
    methods: {
      get_table(){

      },
      shujvjiankong(){

      }
    },
  }
```
#### 2.7 style样式、标签
组件中style标签均需要加上scoped，组件中不允许使用全局样式
所有css类名均使用短横线连接方式
```html
<!-- good -->
<style scoped>
  .my-header{
    background:pink;
  }
</style>
<!-- bad -->
<style>
  .myHeader{
    background:pink;
  }
</style>
```
在 scoped 样式中，类选择器要比元素选择器更好，因为大量地使用元素选择器是很慢的。
所有标签均需要进行语义化申明,避免全局div降低项目可读性
#### 2.8 js工具函数方法、mixins
所有js工具函数、全局通用方法的参数、逻辑等都需要配合注释说明
所有混入方法mixins不推荐挂载全局组件，如需挂载全局需要进行注释说明

* mixins - common 
公共混入
* mixins - dict
字典混入

### 3 项目结构目录
* api
api文件夹存放所有项目中使用的request方法
* assets
assets中存放项目所有需要使用的静态资源文件，包括图片、svg、字体文件等
* directives
directives文件夹中存放一些全局指令
* mixins
mixins中存放全局混入文件
* page
page中存放非动态路由组件，例如登录页面、大数据页面、注册页面等文件
* router
router文件中存放，全局路由相关信息，包括路由配置表，动态路由方法等
* store
store为状态管理中心
* styles
styles中存放了一些全局样式文件，需要书写全局样式文件需要在styles中进行书写
* utils
utils为全局工具函数文件
* views
views文件为项目所有主要业务代码文件夹
* config
config文件夹为全局的一些配置文件
## 配置
### 1 配置页面
* 在系统自带菜单中使用系统管理的菜单管理添加对应的菜单，默认页面路由组件存放在src/views目录下，创建文件夹名称以为系统中添加的路由为准，文件名统一使用index.vue
* 在config目录下的pageConfig.js文件 存储一些页面公共的配置，按钮等
### 2 项目环境变量配置
* 项目环境变量文件存放在根目录下,命名规则为.env.xxx
* 对应环境变量的打包文件存放在src/config/config.js中，添加对应的环境配置变量需要写上对应的注释说明
### 3 插件代码格式化使用
* vscode统一安装vetur插件
## 其他详细配置请参考vue风格指南
https://v3.cn.vuejs.org/style-guide/
## 其他文档
https://xuliangzhan_admin.gitee.io/vxe-table/#/table/base/basic
https://www.iconfont.cn/manage/index


* 人员定位注意点
上传的平面图为正北图

* 人员定位开挖功能：
企业想要对3dtiles数据有要求，仅适用于无自带着色器的纹理格式模型。 （2）目前不支持所有3dtile数据，请替换url进行自测

张亚军本地：
VUE_APP_URL='http://192.168.1.109:18000'

季莉莉本地：
VUE_APP_URL='http://192.168.1.144:18012'




