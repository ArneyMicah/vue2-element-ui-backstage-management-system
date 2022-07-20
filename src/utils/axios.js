import axios from 'axios';
import { Message } from 'element-ui';
const instance = axios.create({
    baseURL: 'http://www.ysqorz.top:8888/api/private/v1',
})
instance.interceptors.request.use(
    (config) => {
        console.log(config.url);
        if (config.url !== '/login') {
            config.headers.Authorization = window.localStorage.getItem('token')
        }
        return config;
    },
    (error) => {
        alert(error);
    }
)
instance.interceptors.response.use(
    (result) => {
        let success = [200, 201, 204];
        if (success.includes(result.data.meta.status)) {
            Message({
                message: result.data.meta.msg,
                type: 'success'
            })
            if (result.config.url == '/login') {
                localStorage.setItem('token', result.data.data.token);
            }
        } else {
            Message({
                message: result.data.meta.msg,
                type: 'error'
            })
        }
        return result.data;
    },
    (error) => {
        alert(error);
    }
)
export default instance;