<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="cont">
          <div @click="$router.push('/register')">注册</div>
          <div @click="$router.push('/setting')">设置</div>
          <div @click="$router.push('/person')">个人主页</div>
          <div @click="$router.push('/about')">发微博</div>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push("/about");
    }
    console.log(process.env);
    console.log(process.env.VUE_APP_BASIC_API);
  }
};
</script>
<style lang="less">
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  // line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  // line-height: 160px;
  height: 100%;
}
.demo-form-inline {
  height: 50px;
}
</style>
