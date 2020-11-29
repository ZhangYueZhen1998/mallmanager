// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入elment-ul
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共css文件  @ 是src的意思   所有的组件都生效
import "@/assets/reset.css"

// import axios from "axios"
// 引入我们自己的js的axios插件
import MyHttpServer from "@/plugins/http.js"

Vue.config.productionTip = false

// 注册elment-ul
Vue.use(ElementUI)
Vue.use(MyHttpServer)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})