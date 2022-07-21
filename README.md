# admin-manager后台管理系统项目

### 项目介绍:

一个基于Vue2 + element-UI的后台管理系统，admin-manager后台管理系统项目

### 项目环境:

脚手架:  Vue  CLI  v5.0.8 

```json
"axios": "^0.27.2",
"core-js": "^3.8.3",
"element-ui": "^2.4.5",
"vue": "^2.6.14",
"vue-router": "^3.5.1",
"vuex": "^3.6.2"
```

## 项目安装依赖
```node
npm install
```

## 启动项目
```node
npm run serve
```

## 项目打包
```node
npm run build
```

### axios的封装(笔记)

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

### Api封装(笔记　部分)

```
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

### 多环境变量的封装(笔记)

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

