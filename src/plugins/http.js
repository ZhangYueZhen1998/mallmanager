import axios from "axios"
const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
        // 设置axios的接口基准地址
        axios.defaults.baseURL = "http://localhost:3000/"
            // 4. 给vue添加原型的函数  这样就可以$http 代替axios 使用时就是this.$http.get = axios.get
        Vue.prototype.$http = axios;
    }
    // 导出对象
export default MyHttpServer