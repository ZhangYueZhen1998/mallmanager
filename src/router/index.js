import Vue from 'vue'
import Router from 'vue-router'
//  @  就是src
import Login from "@/components/login/login"
import home from "../components/home/home"

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/login',
        component: Login
    }, {
        path: '/',
        name: "home",
        component: home
    }]
})