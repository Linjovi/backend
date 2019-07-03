<template>
  <el-container>
    <el-header>
      <el-col :span="10" class="logo" :class="isCollapse?'logoIsCollapse':'logoNotCollapse'">logo</el-col>
      <el-col :span="10" class="tools">
        <el-radio-group v-model="isCollapse" size="small">
          <el-radio-button :label="false" >open</el-radio-button>
          <el-radio-button :label="true">close</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="4" class="userInfo">
        <el-dropdown >
          <span>
            {{userName}}<img :src="this.userIcon"><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="messageClick">message</el-dropdown-item>
            <el-dropdown-item @click.native="settingClick">setting</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'65px':'230px'">
      <el-menu :default-active="defaultSelect()" @select="menuSelected" :collapse="isCollapse" :collapse-transition="false">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">MAIN</span>
          </template>
            <el-menu-item index="1-1">Table</el-menu-item>
            <el-menu-item index="1-2">Form</el-menu-item>
            <el-menu-item index="1-3">Translate</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" disabled>
          <i class="el-icon-menu"></i>
          <span slot="title">STH</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">MESSAGE</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">SETTING</span>
        </el-menu-item>
      </el-menu>
      </el-aside>
      <el-main>
        <el-col :span="24" class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
              {{item.name}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="24" class="main">
          <router-view></router-view>
          <!-- <div>main</div> -->
        </el-col>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isCollapse: false,
      userName:"",
      userIcon:""
    };
  },
  methods:{
    menuSelected(index,indexPath){
      // console.log(this.$route);
      if(index=="1-1"){
        this.$router.push("table");
      }else if(index == "1-2"){
        this.$router.push("form");
      }else if(index == "1-3"){
        this.$router.push("translate");
      }else if(index == "3"){
        this.$router.push("message");
      }else if(index == "4"){
        this.$router.push("setting");
      }
    },
    logout(){
      this.$confirm("confirm","logout",{}).then(() =>{
        sessionStorage.removeItem('user');
        this.$router.push("/login");
      }).catch(() => {
        
      });

    },
    defaultSelect(){
      var routeName = this.$route.name;
      if(routeName == "Table"){
        return "1-1";
      }else if(routeName == "Form"){
        return "1-2";
      }else if(routeName == "Message"){
        return "3";
      }else if(routeName == "Setting"){
        return "4"
      }
      return "0";
      
    },
    messageClick(){
      this.$router.push("/message");
    },
    settingClick(){
      this.$router.push("/setting");
    }
  },
  mounted(){
    
    var user = sessionStorage.getItem("user");
    if(user){
      user = JSON.parse(user);
      this.userName = user.name;
      this.userIcon = user.icon;
    }
  },
  // watch:{
  //   '$route':function(){
  //     console.log("change");
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-container {
    padding: 0;
    margin: 0;

     .el-header {
      background-color: #B3C0D1;
      text-align: center;
      line-height: 60px;
      padding: 0;

      .logo {
        // width: 230px;
        border-right: 1px solid gray;
      }
      .logoIsCollapse {
        width:65px;
      }
      .logoNotCollapse {
        width: 230px;
      }
      .tools {
        width:160px;
      }
      .userInfo {
        float: right;

        img {			
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px;
          float: right;
        }

      }
    }


    .el-menu:not(.el-menu--collapse) {
      width: 229px;
    }

    
    .breadcrumb  {
      background-color: white;
    }

    .el-main {

      text-align: center;
      // overflow-y: scroll;
      padding: 10px;
      // height: 500px;

    }
    
    
  }

</style>