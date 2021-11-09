<template>
  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="">
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--侧边栏菜单-->
        <el-menu
          background-color="#313743"
          text-color="#fff"
          active-text-color="#359BFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath">
          <!--一级菜单-->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!--一级菜单的模板区-->
            <template slot="title">
              <!--图标-->
              <i :class="iconsObj[item.id]"></i>
              <!--文本-->
              <span>{{ item.authName }}</span>
            </template>

            <!--二级菜单-->
            <el-menu-item :index=" '/home/'+ subItem.path"
                          v-for="subItem in item.children"
                          :key="subItem.id"
                          @click="saveNavState('/home/'+ subItem.path)">
              <template slot="title">
                <!--图标-->
                <i class="el-icon-menu"></i>
                <!--文本-->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>


          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧内容主题-->
      <el-main>
      <!--路由的占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      // 左侧菜单数据
      menuList:[],
      iconsObj:{
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 是否折叠侧栏菜单
      isCollapse:false,
      // 被激活的链接地址
      activePath:''
    }
  },
  methods:{
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    //获取所有的菜单
    async getMenuList(){
      const {data:res} =await this.$http.get('menus')
      if(res.meta.status !==200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log("获取所有的菜单",JSON.stringify(res))
      console.log("获取所有的菜单",res)

    },
    //点击按钮切换菜单的折叠与展开
    toggleCollapse(){
      this.isCollapse=!this.isCollapse
    },
    //保存链接的激活状态
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath =activePath
    }
  },
  created () {
    this.getMenuList()
    this.activePath=window.sessionStorage.getItem('activePath')
  }

}
</script>

<style lang="less"  scoped>
  .el-header{
    background-color: #373D41;
    display: flex;
    justify-content: space-between;
    padding-left: 0px;
    align-items: center;
    color: #ffffff;
    font-size: 20px;
    >div {
      display: flex;
      align-items: center;
      span{
        margin-left: 15px;
      }
    }
  }
  .el-aside{
    background-color: #313743;
    .el-menu{
      border-right: none;
    }
  }
  .el-main{
    background-color:#E9EDF1 ;
  }
  .home-container{
    height: 100%;
  }
  .toggle-button{
    background-color: #475163;
    color: #ffffff;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
