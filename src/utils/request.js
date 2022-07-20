import Axios from 'axios'
import envConfig from './env'
import { Message } from 'element-ui'
const service = Axios.create({
    baseURL: envConfig.prod.baseURL,
    timeout: 5000
})
service.interceptors.request.use(
    (config) => {
        if (config.url !== '/login') {
            const token = sessionStorage.getItem('token')
            token && (config.headers.Authorization = token)
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    (res) => {
        console.log('响应拦截器返回的数据：', res)
        const {
            meta: { msg, status: code },
            data: result
        } = res.data
        const successArr = [200, 201, 204]
        if (successArr.includes(code)) {
            Message({
                message: msg,
                type: 'success'
            })
            if (res.config.url === '/login') {
                sessionStorage.setItem('token', result.token)
            }
            return result
        }
        Message({
            message: msg,
            type: 'error'
        })
        return Promise.reject(msg)
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default service