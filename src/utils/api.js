import axios from 'axios'
import { BASE_URL } from './url.js'

// 创建axios的配置文件，里面配置baseURL路径
const config = {
    // baseURL: BASE_URL
    baseURL: 'http://localhost:8080'
}

// 根据create 方法来构建axios对象
const API = axios.create(config)

export { API }