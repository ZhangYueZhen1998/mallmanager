<template>
  <div>
    <el-card class="box-card">
           <!--面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
           <!--搜索 -->
        <el-row>
            <el-col>
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入内容" v-model="query" class="inputsearch">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-button type="success">添加用户</el-button>
                </div>
            </el-col>
        </el-row>
        <!--表格 -->
         <el-table
            :data="userlist"
            style="width: 100%">
                    <el-table-column
                        label="#"
                        width="180"
                        type="index">
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮箱">
                    </el-table-column>
                     <el-table-column
                        prop="mobile"
                        label="电话">
                    </el-table-column>
                    
                     <el-table-column
                        prop="create_time"
                        label="创建日期">
                        <template slot-scope="userlist">
                            {{userlist.row.create_time | fmtdate}}
                        </template>
                    </el-table-column>


                     <el-table-column
                        prop="is_active"
                        label="用户状态">
                        <template slot-scope="userlist">
                            <el-switch
                                v-model="userlist.row.is_active"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                        </template>
                    </el-table-column>

                     <el-table-column
                        prop="address"
                        label="操作">
                        <template>
                            <el-button type="primary" icon="el-icon-edit" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle></el-button>
                            <el-button type="success" icon="el-icon-check" circle></el-button>
                        </template>
                    </el-table-column>
        </el-table>
           <!--分页 -->
    
    </el-card>
   
  </div>
</template>

<script>
export default {
 data() {
     return {
        //  绑定的输入框
        query:"",
        // 页码
        pagenum:1,
        // 每页显示的数据
        pagesize:1,
        // 总数
        total:-1,
        // 表格数据
        userlist: []
     }
 },
 created() {
    this.getUserList()
 },
 methods: {
    //  获取用户列表
    //  绑定的输入框
    // query:"",
    //  页码
    // pagenum:1,
    //  每页显示的数据
    // pagesize:1,
    async getUserList(){
        const res= await this.$http.get(`userlist?query${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
       
     
        console.log()
        const staut=res.status;
        // 当请求成功 就赋值
        if(staut==200){
            // 数组列表的值
            this.userlist=res.data.users;
            // 所有user列表的  总数值
            this.total=res.data.users.length;
            this.pagesize=res.data.pagenum;
            console.log( this.pagesize)
            this.$message.success('查询成功');
        }else{
            his.$message.success('查询失败');
        }


    }
 },
}
</script>

<style>
.box-card{
    height: 100%;
    width: 100%;  
}
.inputsearch{
    width: 300px;
}
</style>
