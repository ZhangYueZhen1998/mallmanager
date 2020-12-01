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
                        <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-button plain type="success" @click="dialogFormVisibleadd = true" >添加用户</el-button>
                </div>
            </el-col>
        </el-row>
        <!--表格 -->
         <el-table
            :data="userlist"

            style="width: 100%;">
                    <el-table-column
                        label="ID"
                        width="180">
                        <template slot-scope="userlist">
                            {{userlist.row.id }}
                        </template>
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
                        <template slot-scope="userlist" @click="qiehuan()">
                            <el-switch 
                             @change="changeMgState(userlist.row)"
                                v-model="userlist.row.is_active"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                        </template>
                    </el-table-column>

                     <el-table-column
                        prop="address"
                        label="操作">
                        <template slot-scope="userlist">
                        <!--编辑按钮 -->
                            <el-button type="primary" @click="dialogFormVisibleUpd(userlist.row)" plain icon="el-icon-edit" circle></el-button>
                            <el-button type="success" plain icon="el-icon-check" circle></el-button>
                             <!--删除按钮 -->
                            <el-button type="danger" @click="showDeleteMsgBox(userlist.row.id)" plain icon="el-icon-delete" circle></el-button>
                        </template>
                    </el-table-column>
        </el-table>
           <!--分页 -->
        <el-pagination
           
            :current-page="pagenum"
            :page-sizes="[10]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    
    <!--添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleadd">
        <el-form :model="from">
            <el-form-item label="用户 名称" label-width="100px">
            <el-input v-model="from.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密 码" label-width="100px">
            <el-input v-model="from.mobile" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮 箱" label-width="100px">
            <el-input v-model="from.email" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="quxiaoduihuak()">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisibleaddsss() ">确 定</el-button>
        </div>
    </el-dialog>

    <!--编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleUpds">
        <el-form :model="fromUdp">
            <el-form-item label="用户 ID" label-width="100px">
            <el-input disabled v-model="fromUdp.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户 名称" label-width="100px">
            <el-input disabled v-model="fromUdp.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电 话" label-width="100px">
            <el-input v-model="fromUdp.mobile"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮 箱" label-width="100px">
            <el-input v-model="fromUdp.email" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleUpdsFails(fromUdp)">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisibleUpdAci(fromUdp) ">确 定</el-button>
        </div>
    </el-dialog>

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
        pagenum:2,
        // 每页显示的数据
        pagesize:1,
        // 总数
        total:1,
        // 表格数据
        userlist: [],
        // 添加用户对话框的显示和影藏
        dialogFormVisibleadd:false,
        // 修改用户对话框
        dialogFormVisibleUpds:false,
        // 添加用户对话框的用户的表单数据
        from:{
                "username": "",
                "mobile": "", 
                "email": "",
                "create_time": new Date(),
                "is_delete": false,
                "is_active": true
        },
        // 接收修改的用户数据
        fromUdp:{
                "username": "",
                "mobile": "", 
                "email": "",
                "create_time": new Date(),
                "is_delete": false,
                "is_active": true
        },
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
        const res= await this.$http.get(`users`)
        const staut=res.status;
        // 当请求成功 就赋值
        if(staut==200){
            // 数组列表的值
            this.userlist=res.data;
        }else{
            this.$message.success('查询失败');
        }
    },
    qiehuan(){
          console.log( "点击了")
    },
    
    //  搜索用户
    searchUser(){
        var arrs=[]
        this.userlist= this.userlist.filter((res)=>{
            return res.username===this.query;
        })
        if(this.userlist.length==0){
            this.$message.warning('无此用户');
            this.getUserList()
        }else{
             this.$message.success('查询成功');
        }
    },
    // 添加用户的   弹出框
   async dialogFormVisibleaddsss(){
        this.dialogFormVisibleadd=true;
        const res= await this.$http.post("users",this.from)
        console.log("res"+res)
        this.$message.success('添加成功');  
        this.dialogFormVisibleadd=false;
        this.getUserList();
    },
    // 取消对话框
    quxiaoduihuak(){
        // this.from.username="";
        // this.from.mobile="";
        // this.from.email="";
        for(let arr in this.from){
            this.from[arr]="";
        }
        this.dialogFormVisibleadd=false;
        
    },
    // 操作的删除按钮
   showDeleteMsgBox(id) {
       console.log("传过来的id"+id)
         this.$confirm('删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
            await this.$http.delete(`users/${id}`);
                this.getUserList();
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 编辑用户弹出框的信息
    dialogFormVisibleUpd(user){
        this.dialogFormVisibleUpds=true;
        console.log(user.id)
        this.fromUdp=user;
    },
    // 编辑用户弹出框的确定按钮
   async dialogFormVisibleUpdAci(user){
       
      
       await this.$http.put(`users/${user.id}`,user)
       this.$message.success('修改成功'); 
       this.dialogFormVisibleUpds=false; 
        this.getUserList();
    },
    // 编辑用户的取消按钮
    dialogFormVisibleUpdsFails(user){
        
        this.dialogFormVisibleUpds=false;
        this.getUserList();
    },
    // 修改用户状态
   async changeMgState(user){
        !user.is_active;
        await this.$http.put(`users/${user.id}`,user)
        this.$message.success('修改成功'); 
        this.getUserList();
    }

 }









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
