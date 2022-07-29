import axios from 'axios'
import env from './env'
import { Message } from 'element-ui'
import router from '../router/index'
const instance = axios.create({
    baseURL: env.online.baseURL,
    timeout: 30000,
})
instance.interceptors.request.use(
    (config) => {
        if (config.url !== '/login') {
            config.headers.Authorization = window.localStorage.getItem('token')
        }
        return config
    },
    (error) => {
        alert(error)
    }
)
instance.interceptors.response.use(
    (result) => {
        const success = [200, 201, 204]
        if (success.includes(result.data.meta.status)) {
            Message({
                message: result.data.meta.msg,
                type: 'success',
                duration: 500,
            })
            if (result.config.url == '/login') {
                localStorage.setItem('token', result.data.data.token)
            }
        } else {
            Message({
                message: result.data.meta.msg,
                type: 'error',
                duration: 500,
            })
        }
        if(result.data.meta.msg == '无效token'){
            router.replace('/LoginPage')
            localStorage.removeItem('token')
        }
        return result.data
    },
    (error) => {
        alert(error)
    }
)
export default instance
