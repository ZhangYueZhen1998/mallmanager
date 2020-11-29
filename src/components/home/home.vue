<template>

<el-container class="container">
  <el-header class="header">
    <el-row>
        <el-col :span="4">
        <img src="../../img/mei3.jpg" style="width:46px" alt="">
        </el-col>
        <el-col :span="18" class="middle"><h2>电商后台管理平台</h2></el-col>
        <el-col :span="2"><a href="#" @click.prevent="handleSingnout()" class="loginout">退出</a></el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside class="aside" width="200px">
    <!-- 1  
            :unique-opened="true" 为true时 所有的列表只展开一个

            index="1" index 就是router路由
            所以要开启路由模式 :router="true"
    
    
    -->
    <el-menu 
    :unique-opened="true"
    :router="true"
    >
        <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="users">
                    <i class="el-icon-circle-check"></i>
                    <span>用户列表</span>
                </el-menu-item>
      </el-submenu>   
       <!-- 2-->
        <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限管理</span>
                </template>
                 <el-menu-item index="2-1">
                    <i class="el-icon-location"></i>
                    <span>角色列表</span>
                </el-menu-item>
                 <el-menu-item index="2-2">
                    <i class="el-icon-location"></i>
                    <span>权限列表</span>
                </el-menu-item>
      </el-submenu>   
       <!-- 3-->
         <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商品管理</span>
                </template>
                 <el-menu-item index="3-1">
                    <i class="el-icon-location"></i>
                    <span>商品列表</span>
                </el-menu-item>
                 <el-menu-item index="3-2">
                    <i class="el-icon-location"></i>
                    <span>分类参数</span>
                </el-menu-item>
                 <el-menu-item index="3-3">
                    <i class="el-icon-location"></i>
                    <span>商品分类</span>
                </el-menu-item> 
      </el-submenu>
         <!-- 4-->
       <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>订单管理</span>
                </template>
                <el-menu-item index="4-1"> <i class="el-icon-circle-check"></i>选项1</el-menu-item>
                <el-menu-item index="4-2"> <i class="el-icon-circle-check"></i>选项2</el-menu-item>
      </el-submenu>   
        <!-- 5--> 
       <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>数据统计</span>
                </template>
                <el-menu-item index="5-1"> <i class="el-icon-circle-check"></i>选项1</el-menu-item>
                <el-menu-item index="5-2"> <i class="el-icon-circle-check"></i>选项2</el-menu-item>
      </el-submenu>   
    </el-menu>
   
  </el-aside>
    <el-main class="main">
        <!-- 这里显示选中的侧边栏的组件-->
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  

</template>

<script>
export default {
/*
    获取token 如果有token 就继续渲染组件
        没有就返回login页面

    beforeCreate  在Vue渲染之前触发   
*/  
beforeCreate() {
    const token=localStorage.getItem("token");
    if(!token){
        this.$router.push({name:"login"})
    }
},
methods: {
    // 点击退出的函数
    handleSingnout(){
        /*
            退回到login页面 然后 把localStorage本地储存删除
        */ 
        localStorage.clear()
        // 弹出退出成功
        this.$message.success('退出成功');
        this.$router.push({name:"login"})
    }
},




}
</script>

<style>
.container{
    height: 100%;
}
.header{
    background-color: #b3c0d1;
}
.aside{
     background-color: #d3dce6;
}
.main{
     background-color: #e9eef3;
     height: 100%;
}
.middle{
    text-align: center;
    color: pink;
    line-height:25px;
}
.loginout{
    line-height: 60px;
    text-decoration: none;
}
</style>
