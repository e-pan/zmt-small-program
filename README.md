# 微信小程序

## 主要功能有

* 用户的登录、注册；
* 登录密码、交易密码设置、重置；
* 银行卡通过第三方绑定；
* 集合账单分类、筛选；
* 消息通知、代办事项、系统公告；
* 代理贷款申请、生成申请之后的业务操作；
* 用户中心的实名认证、登出等。


## 使用过程中遇见的问题

* 在wxss里面引用图片作为背景，不能使用本地图片，只能使用网络图片。

* [wx.request()](https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html#wxrequestobject)  异步接口的请求
* 在使用POST方法提交数据到后台时，如果header格式为request payload但想使用form data格式，可以手动设置header。

  ```js
    header: {"content-type": "application/x-www-form-urlencoded"}
  ```

* [wx.for='{{ arrs }}'](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/list.htmlt)  列表渲染
* 在使用wx:for进行数据渲染时，如果控制台输出警告，Now you can provide attr "wx:key" for a "wx:for" to improve performance。 可在wx:for后面加上wx:key="key"清除，不清除不影响使用。在使用循环嵌套时，内部循环可再添加wx:for-item='xxx'进行嵌套循环。

  ```js
    <dl wx:for='{{ arrs }}' wx:key='key'>
      <dt>{{ item.aaa }}</dt>
      <dd wx:for='{{ item.bbb }}' wx:for-item='innerItem' wx:key='innerKey'>
        <text>{{ innerItem.ccc }}</text>
      </dd>
    </dl>
  ```
* [template](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/template.html)  WXML模板
* 公用模板引用：首先定义wxml文件，然后在<template name='nav' />标签上添加name属性和值，该值为模板名称。想使用该模板时，现将其引用进来<import src='nav.wxml' />，然后在需要位置插入模板<template is="nav" data="{{...item}}"/>,使用is属性，声明需要的使用的模板，然后将模板所需要的 data 传入。
  
  ```sh
    // 创建模板
    <template name='footer'></template>
    // 使用模板
    <import src='../../../templates/common/footer.wxml' />
    <template is='footer' data='{{ navs }}' />
  ```
  
* [picker](https://developers.weixin.qq.com/miniprogram/dev/component/picker.html)  选择器
* 在使用picker组件时，如果value的值为对象，显示器显示为[object]，可以使用range-key="{{'对象名'}}"来做为显示值。

  ```sh
    <picker mode='selector' value="{{ ...item }}" range="{{ ...item }}" range-key='{{ "value" }}'>
      {{ ...item }}
    </picker>
  ```
  
### 目录解析

  <pre>
    ├── images
    │   ├── icon ==>png图标
    │   └── pic ==>测试等大图
    │   └── svg ==>矢量图标
    ├── node_modules
    ├── pages
    │   ├── agreement
    │   ├── bank
    │   ├── bill
    │   └── index
    │   └── login
    │   └── message
    │   └── order
    │   └── password
    │   └── product
    │   └── reg
    │   └── user
    ├── templates
    │   ├── common   ==>公用模板
    ├── utils
    │   ├── status.js
    │   └── util.js  ==> 公用方法等如：异步请求
    ├── app.js ==> App() 函数用来注册一个小程序，全局变量存放在这
    ├── app.json ==>小程序进行全局配置
    ├── package.json  ==> npm包主要用于编译less
    ├── app.less ==> 基础样式
    ├── gulpfile.js ==> gulp运行文件
  </pre>

### 编译&运行

    $ git clone git@github.com:e-pan/zmt-small-program.git

    $ npm install

    $ gulp less:dev 

项目导入到微信开发者工具，编译...


### 小程序二维码
