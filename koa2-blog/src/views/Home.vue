<template>
  <div class="home">
    <!-- <el-container>
      <el-header>
        <div class="cont">
          <div @click="$router.push('/register')">注册</div>
          <div @click="$router.push('/setting')">设置</div>
          <div @click="$router.push('/person')">个人主页</div>
          <div @click="$router.push('/about')">发微博</div>
        </div>
      </el-header>
    <el-main>-->
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
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
    <!-- </el-main> -->
    <!-- </el-container> -->
    <div class="yanse"></div>
    <div class="time">
      <div v-for="e in 12" :key="e" @click="changeyue(e)">{{e}}月</div>
    </div>
    <el-progress :percentage="percentage"></el-progress>
    <el-button-group>
      <el-button icon="el-icon-minus" @click="decrease"></el-button>
      <el-button icon="el-icon-plus" @click="increase"></el-button>
    </el-button-group>
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
      percentage: 8.4444,
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
    increase() {
      this.percentage += 8.4444;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    changeyue(e) {
      this.percentage = 8.4444 * (e - 1);
    },
    decrease() {
      this.percentage -= 8.4444;
      if (this.percentage < 0) {
        this.percentage = 0;
      }
    },
    onSubmit() {
      login(this.formInline).then(res => {
        console.log(res.data, "-----------");
        localStorage.setItem("token", res.data);
        if (res.errno == 0) {
          this.$router.push("/about");
        }
      });
    },
    idExit(userName) {
      if (userName === "") return false;
      isExit({ userName }).then(res => {
        console.log(res);
      });
    }
  },
  created() {
    const token = localStorage.getItem("token");
    // if (token) {
    //   this.$router.push("/about");
    // }
    console.log(process.env);
    console.log(process.env.VUE_APP_BASIC_API);
  }
};
</script>
<style lang='less'>
.time {
  width: 100%;
  display: flex;
  justify-content: space-between;
  div {
    width: 8.4444%;
    text-align: left;
  }
}
.el-progress-bar__inner {
  background: linear-gradient(to right, #595747 10%, #ffa800 80%) !important;
}
.el-progress-bar {
  padding-right: 0 !important;
  margin-right: 0 !important;
}
.el-progress__text {
  display: none !important;
}
.yanse {
  width: 300px;
  height: 8px;
  background: linear-gradient(to right, #595747, #ffa800);
}
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