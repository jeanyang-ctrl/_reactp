import axios from 'axios'
import { BASE_URL } from './url.js'

console.log('api',BASE_URL)
// 创建axios的配置文件，里面配置baseURL路径
const config = {
    baseURL: BASE_URL
    // baseURL: 'http://localhost:8080'
}
console.log('api2',BASE_URL)

// 根据create 方法来构建axios对象
const API = axios.create(config)

export { API }