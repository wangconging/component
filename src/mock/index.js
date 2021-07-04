import Mock from 'mockjs'
import { getUserInfo } from './response/user'
const Random = Mock.Random
Mock.mock('http://localhost:3000/getUserInfo', 'get',  getUserInfo)
// Mock.mock('/\/getUserInfo/', 'get',  getUserInfo)
Mock.setup({
    timeout: 100-300
})

// 自定义方法库
Random.extend({
    frult () {
        const frult  = ['apple', 'peach', 'lemon']
        return this.pick(frult)
    }
})

export default Mock