<template>
  <div class="login-wrap">

   <el-form  
   class="login-form"
   label-position="top" 
   label-width="80px" 
   :model="formdata">
   <h2>用户登录</h2>
  <el-form-item label="用户名">
    <el-input v-model="formdata.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formdata.password"></el-input>
  </el-form-item>
  <el-button class="login-btn" @click.prevent="login()" type="primary">登录</el-button>
</el-form>
  </div>
</template>

<script>
export default {
  data() {
      return {
          formdata:{
              username:"",
              password:""
          }
      }
  },
  methods: {
      login(){
          this.$http.get("login",this.formdata).then(res=>{
             
            const{username,password,stauts}=res.data
            console.log(username)
            console.log(password)
            //   登录成功跳转
              if(this.formdata.username==username && this.formdata.password==password){  
                    this.$router.push({name:"home"})
                this.$message.success('登录成功');
              
              }else{
                 this.$message.warning('登录失败');
              }
          }).catch(err=>{
               console.log("接口失败")
          })
      }
  },
}
</script>

<style>
.login-wrap{
    height: 100%;
    background-color: #324152;
    /*
    display: flex;  开启弹性布局
    justify-content: center; 用来在存在剩余空间时，设置为间距的方式  center为居中
    align-items: center  设置每个flex元素在交叉轴上的默认对齐方式 center 为居中

    */ 
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-wrap .login-form{
    /*
    高度被内容撑开
    border-radius: 5px; 圆角边框
    */ 
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
}
/*
    他的父元素设置了宽度400px 内容就是400px 不算padding30px
*/ 
.login-wrap .login-btn{
    width: 100%;
}




</style>
