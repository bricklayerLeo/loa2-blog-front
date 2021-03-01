<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="cont">
          <div @click="$router.push('/register')">注册</div>
          <div @click="$router.push('/setting')">设置</div>
        </div>
      </el-header>
      <el-main>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input
              @blur="idExit(formInline.userName)"
              v-model="formInline.userName"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formInline.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { isExit, login, jsona } from "@/request/api";

export default {
  name: "Home",
  data() {
    return {
      formInline: {
        userName: "",
        password: ""
      }
    };
  },
  components: {
    HelloWorld
  },
  methods: {
    onSubmit() {
      login(this.formInline).then(res => {
        console.log(res.data, "-----------");
        localStorage.setItem("token", res.data);
        this.getJson();
      });
    },
    getJson() {
      jsona().then(res => {
        console.log(res);
      });
    },
    idExit(userName) {
      isExit({ userName }).then(res => {
        console.log(res);
      });
    },
    test() {
      isExit({}).then(res => {
        console.log(res);
      });
    }
  },
  created() {
    this.test();
    console.log(process.env);
    console.log(process.env.VUE_APP_BASIC_API);
    this.getJson();
  }
};
</script>
<style lang='less'>
.cont {
  display: flex;
  flex-direction: row;
  div + div {
    margin-left: 100px;
  }
}
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
// body > .el-container {
//   margin-bottom: 40px;
// }

// .el-container:nth-child(5) .el-aside,
// .el-container:nth-child(6) .el-aside {
//   line-height: 260px;
// }

// .el-container:nth-child(7) .el-aside {
//   line-height: 320px;
// }
</style>