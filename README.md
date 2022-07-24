# admin-manager后台管理系统项目

## 项目介绍:

一个基于Vue2 + element-UI的后台管理系统，admin-manager后台管理系统项目

***

## 项目环境:

脚手架:  Vue  CLI  v5.0.8 

```json
"axios": "^0.27.2",
"core-js": "^3.8.3",
"element-ui": "^2.4.5",
"vue": "^2.6.14",
"vue-router": "^3.5.1",
"vuex": "^3.6.2"
```

***

## 项目安装依赖

```node
npm install
```

***

## 启动项目

```node
npm run serve
```

***

## 项目打包

```node
npm run build
```

***

## axios的封装(笔记)

```js
// 引入axios
import axios from 'axios'
// 引入多环境配置
import env from './env'
// 引入elementui设置提示信息
import { Message } from 'element-ui'
const instance = axios.create({
	// 设置基准地址
    baseURL: env.online.baseURL
    // 设置超时时间
    timeout: 1000,
})
// 设置请求拦截
instance.interceptors.request.use(
    (config) => {
        console.log(config.url)
        //应该先配置loading,token
    	//此处省略.....
    	//如果不是登录接口，需要配置请求头，添加token
        if (config.url !== '/login') {
            config.headers.Authorization = window.localStorage.getItem('token')
        }
        return config
    },
    (error) => {
        alert(error)
    }
)
// 设置相应拦截
instance.interceptors.response.use(
    (result) => {
    	// 将项目中可能成功返回的状态码保存为一个数组
        const success = [200, 201, 204]
        // 判断result返回的状态码是否在success中，如果在就提示成功，并返回结果
        if (success.includes(result.data.meta.status)) {
        	// 成功提示
            Message({
                message: result.data.meta.msg,
                type: 'success'
            })
             // 如果是登录成功，将登录返回的token保存到本地
            if (result.config.url == '/login') {
                localStorage.setItem('token', result.data.data.token)
            }
        } else {
            Message({
                message: result.data.meta.msg,
                type: 'error'
            })
        }
        //返回成功后的数据
        return result.data
    },
    // 失败提示
    (error) => {
        alert(error)
    }
)
export default instance
```

***

## Api封装(笔记　部分)

```js
// 引入封装好的axios
import api from './axios'
export function getLoginInfo(data) {
    return api({
        url: '/login',
        method: 'POST',
        data
    })
}
```

***

## 多环境变量的封装(笔记)

```js
export default {
    // 本地接口
    local: {
        baseURL: 'http://XXXXX',
    },
    // 测试接口
    testing: {
        baseURL:'http://XXXXX',
    },
    // 线上接口
    online: {
        baseURL:'http://XXXXX',
    },
}
```

***

## 防抖节流

- 搜索功能

    - 点击按钮搜索

    - 边输入边搜索

        - 通过@input实现边输入搜索

        - 在通过input事件实现搜索时，为了优化请求次数，通常通过防抖和节流实现请求次限制

            - 防抖：在固定时间（例如：3秒）内如果有触发事件，则再延长这个固定时间（再延长3秒）触发

                - 例如：电脑屏保，坐电梯

            - 节流：无论发生什么事件，只要在固定的时间，就会触发！！！！例如：上课，吃饭，等

            - 实现方案:

                - JS原生定时器或时间戳实现

                - 通过第三方工具库实现  lodash.js

                    ```js
                    npm i lodash
                    
                    引入lodash
                    import _ from 'lodash'
                    
                    使用lodash相关方法
                    
                    防抖：
                     searchCon: _.debounce(function () {
                          this.getUsers()
                    }, 3000),
                    
                    节流：
                     searchCon: _.throttle(function () {
                          this.getUsers()
                        }, 3000),
                    ```

***

## Vue2富文本的使用(quill)

1.  下载Vue-Quill-Editor  

   ```node
   npm install vue-quill-editor --save
   ```

2.  下载quill（Vue-Quill-Editor需要依赖） 

   ```node
   npm install quill --save
   ```

3.  使用(使用<quill-editor></quill-editor>标签)

   ```javascript
   <template>
       <div class="edit_container">
           <quill-editor 
               v-model="content" 
               ref="myQuillEditor" 
               :options="editorOption" 
               @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
               @change="onEditorChange($event)">
           </quill-editor>
       </div>
   </template>
   <script>
   
   import { quillEditor } from "vue-quill-editor"; //调用编辑器
   import 'quill/dist/quill.core.css';
   import 'quill/dist/quill.snow.css';
   import 'quill/dist/quill.bubble.css';
   
   export default {
       components: {
       
           quillEditor
           
       },
       data() {
           return {
               content: `<p></p><p><br></p><ol><li><strong><em>Or drag/paste an image here.</em></strong></li><li><strong><em>rerew</em></strong></li><li><strong><em>rtrete</em></strong></li><li><strong><em>tytrytr</em></strong></li><li><strong><em>uytu</em></strong></li></ol>`,
               editorOption: {}
           }
       },
       methods: {
           onEditorReady(editor) { // 准备编辑器
    
           },
           onEditorBlur(){}, // 失去焦点事件
           onEditorFocus(){}, // 获得焦点事件
           onEditorChange(){}, // 内容改变事件
       },
       computed: {
           editor() {
               return this.$refs.myQuillEditor.quill;
           },
       }
   }
   </script>
   ```

4. 全局引入 

   在main.js里引入

   ```javascript
   import VueQuillEditor from 'vue-quill-editor'
   import 'quill/dist/quill.core.css'
   import 'quill/dist/quill.snow.css'
   import 'quill/dist/quill.bubble.css'
   Vue.use(VueQuillEditor)
   ```

5.  自定义 toolbar 菜单

    ```8javascript
   editorOption: {
                 placeholder: "请在这里输入",
                 modules:{
                   toolbar:[
                             ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                             ['blockquote', 'code-block'],     //引用，代码块
                             [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
                             [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
                             [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
                             [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
                             [{ 'direction': 'rtl' }],             // 文本方向
                             [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                             [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
                             [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
                             [{ 'font': [] }],     //字体
                             [{ 'align': [] }],    //对齐方式
                             ['clean'],    //清除字体样式
                             ['image','video']    //上传图片、上传视频
                             ]
                         }
                   },
   ```

***

## 树形表格

Use npm:

```shell
npm i vue-table-with-tree-grid -S
```

Or use yarn:

```shell
yarn add vue-table-with-tree-grid
```

## Usage

```javascript
import Vue from 'vue'
import ZkTable from 'vue-table-with-tree-grid'

Vue.use(ZkTable)
```

Or

```javascript
import Vue from 'vue'
import ZkTable from 'vue-table-with-tree-grid'

Vue.component(ZkTable.name, ZkTable)
```

more information please see [example...](https://github.com/MisterTaki/vue-table-with-tree-gird/blob/master/example/Example.vue), or git clone this repository and open dev mode (I will give it a homepage later...).

## API

### Table Attributes

| 属性            | 说明                                                         | 类型             | 参数                               | 默认值     |
| --------------- | ------------------------------------------------------------ | ---------------- | ---------------------------------- | ---------- |
| data            | 表格各行的数据                                               | Array            | -                                  | []         |
| empty-text      | 表格数据为空时显示的文字                                     | String           | -                                  | '暂无数据' |
| columns         | 表格各列的配置（具体见下文：Columns Configs）                | Array            | -                                  | []         |
| show-header     | 是否显示表头                                                 | Boolean          | -                                  | true       |
| show-index      | 是否显示数据索引                                             | Boolean          | -                                  | false      |
| index-text      | 数据索引名称                                                 | String           | -                                  | '序号'     |
| show-summary    | 是否显示表尾合计行                                           | Boolean          | -                                  | false      |
| sum-text        | 表尾合计行首列名称                                           | String           | -                                  | '合计'     |
| summary-method  | 表尾合计行计算方法                                           | Function         | data, column, columnIndex          | -          |
| max-height      | 最大高度                                                     | [String, Number] | -                                  | 'auto'     |
| stripe          | 是否显示间隔斑马纹                                           | Boolean          | -                                  | false      |
| border          | 是否显示纵向边框                                             | Boolean          | -                                  | false      |
| show-row-hover  | 鼠标悬停时，是否高亮当前行                                   | Boolean          | -                                  | true       |
| tree-type       | 是否为树形表格                                               | Boolean          | -                                  | false      |
| children-prop   | 树形表格中遍历的属性名称                                     | String           | -                                  | 'children' |
| is-fold         | 树形表格中父级是否默认折叠                                   | Boolean          | -                                  | true       |
| expand-type     | 是否为展开行类型表格（为 True 时，需要添加名称为 '$expand' 的[作用域插槽](https://cn.vuejs.org/v2/guide/components.html#作用域插槽), 它可以获取到 row, rowIndex) | Boolean          | -                                  | false      |
| selection-type  | 是否为多选类型表格                                           | Boolean          | -                                  | false      |
| row-key         | 行数据的 Key，用来优化 Table 的渲染                          | Function         | row, rowIndex                      | rowIndex   |
| row-class-name  | 额外的表格行的类名                                           | String, Function | row, rowIndex                      | -          |
| cell-class-name | 额外的表格行的类名                                           | String, Function | row, rowIndex, column, columnIndex | -          |
| row-style       | 额外的表格行的样式                                           | Object, Function | row, rowIndex                      | -          |
| cell-style      | 额外的表格单元格的样式                                       | Object, Function | row, rowIndex, column, columnIndex | -          |

### Columns Configs

| 属性        | 说明                                                         | 类型             | 默认值 |
| ----------- | ------------------------------------------------------------ | ---------------- | ------ |
| label       | 列标题名称                                                   | String           | ''     |
| prop        | 对应列内容的属性名                                           | String           | ''     |
| align       | 对应列内容的对齐方式，可选值有 'center', 'right'             | String           | 'left' |
| headerAlign | 对应列标题的对齐方式，可选值有 'center', 'right'             | String           | 'left' |
| width       | 列宽度                                                       | [String, Number] | 'auto' |
| minWidth    | 列最小宽度                                                   | [String, Number] | '80px' |
| type        | 列类型，可选值有 'template'(自定义列模板)                    | String           | ''     |
| template    | 列类型为 'template'(自定义列模板) 时，对应的[作用域插槽](https://cn.vuejs.org/v2/guide/components.html#作用域插槽)（它可以获取到 row, rowIndex, column, columnIndex）名称 | String           | ''     |

### Table Events

| 事件名            | 说明                       | 参数                                       |
| ----------------- | -------------------------- | ------------------------------------------ |
| cell-click        | 单击某一单元格             | row, rowIndex, column, columnIndex, $event |
| cell-dblclick     | 双击某一单元格             | row, rowIndex, column, columnIndex, $event |
| cell-contextmenu  | 在某一单元格上点击鼠标右键 | row, rowIndex, column, columnIndex, $event |
| cell-mouseenter   | 鼠标滑入某一单元格         | row, rowIndex, column, columnIndex, $event |
| cell-mouseleave   | 鼠标滑出某一单元格         | row, rowIndex, column, columnIndex, $event |
| row-click         | 单击某一行                 | row, rowIndex, $event                      |
| row-dblclick      | 双击某一行                 | row, rowIndex, $event                      |
| row-contextmenu   | 在某一行上点击鼠标右键     | row, rowIndex, $event                      |
| row-mouseenter    | 鼠标滑入某一行             | row, rowIndex, $event                      |
| row-mouseleave    | 鼠标滑出某一行             | row, rowIndex, $event                      |
| checkbox-click    | 鼠标单击checkbox           | row, rowIndex, $event                      |
| tree-icon-click   | 鼠标单击树形icon           | row, rowIndex, $event                      |
| expand-cell-click | 鼠标单击展开单元格         | row, rowIndex, $event                      |

### Table Methods

| 方法名         | 说明                                                         | 参数 |
| -------------- | ------------------------------------------------------------ | ---- |
| getCheckedProp | 当表格为多选类型表格时，用于获取当前所选项的属性，返回一个数组；属性默认为'index'。 | prop |

代码:

````vue
<template>
    <div class="categories">
        <zk-table ref="table" class="tb-cate" index-text="#" show-index stripe border :data="tableData" :columns="columns" :expand-type="false" :selection-type="false">
            <template slot="valid" scope="scope">
                <i class="el-icon-success" v-if="!scope.row.cat_deleted" style="color: lightGreen"></i>
                <i class="el-icon-error" v-else style="color: red"></i>
            </template>
            <template slot="level" scope="scope">
                <el-tag type="primary" effect="plain" size="mini" v-show="scope.row.cat_level == 0">一级</el-tag>
                <el-tag type="success" effect="plain" size="mini" v-show="scope.row.cat_level == 1">二级</el-tag>
                <el-tag type="warning" effect="plain" size="mini" v-show="scope.row.cat_level == 2">三级</el-tag>
            </template>
            <template slot="operate" scope="scope">
                <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </zk-table>
    </div>
</template>
<script>
    import { getCategories } from '../../utils/api.js'
    export default {
        data() {
            return {
                columns: [
                    { label: "分类名称", prop: "cat_name" },
                    {
                        label: "是否有效",
                        prop: "cat_deleted",
                        type: "template",
                        template: "valid",
                    },
                    {
                        label: "分类等级",
                        prop: "cat_level",
                        type: "template",
                        template: "level"
                    },
                    {
                        label: '操作',
                        type: 'template',
                        template: 'operate'
                    }
                ],
                tableData: [],
            };
        },
        methods: {
            async render() {
                let res = await getCategories()
                console.log(res);
                this.tableData = res.data
            }
        },
        created() {
            this.render()
        }
    };
</script>
````

