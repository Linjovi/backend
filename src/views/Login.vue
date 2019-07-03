<template>
  <el-form :model="userForm" label-position="left" label-width="0px" class="login-container" :rules="rules" ref="loginForm">
    <h3 class="title">系统登录</h3>
    <el-form-item label="账号" prop="account" label-width="60px">
      <el-input type="text" auto-complete="off" placeholder="账号" v-model="userForm.account"></el-input>
    </el-form-item>
    <el-form-item prop="psw" label="密码" label-width="60px">
      <el-input type="password" auto-complete="off" placeholder="密码" v-model="userForm.psw"></el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="loginClick">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {requestLogin} from '../api/api.js'
export default {
  name: 'Login',
  data () {
    return {
        userForm:{
            account:"",
            psw:""
        },
        rules:{
            account:[{required:true,message:"account",trigger:"blur"}],
            psw:[{required:true,message:"password",trigger:"blur"}]
        }
    }
  },
  methods:{
      loginClick(){
          this.$refs.loginForm.validate((valid) => {
              if(valid){
                  let para = {username: this.userForm.account,password: this.userForm.psw};
                  requestLogin(para).then((res) => {
                      let {msg, code, user } = res;
                      if(code!=200){
                          this.$message({
                              message:msg,
                              type:'error'
                          });
                      }else{
                          this.$message({
                              message:msg,
                              type:"success"
                          });
                          sessionStorage.setItem('user',JSON.stringify(user));
                          this.$router.push({path:'/table'});
                      }
                  });
              }
          })

      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
</style>
