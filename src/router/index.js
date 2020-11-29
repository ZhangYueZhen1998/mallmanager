import Vue from 'vue'
import Router from 'vue-router'
//  @  就是src
import Login from "@/components/login/login.vue"
import home from "@/components/home/home.vue"
import users from "@/components/users/user.vue"
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/login',
        // 这个name 对应的是   this.$router.push({name:"login"}) 这个name
        name: "login",
        component: Login
    }, {
        path: '/',
        name: "home",
        component: home,
        //  在home里面要显示的子组件路由 就卸载children里面  配置子路由使用children
        children: [
            // 用户列表的路由
            {
                path: "/users",
                name: "users",
                component: users
            }
        ]
    }]
})