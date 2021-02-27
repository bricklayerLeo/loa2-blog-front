<template>
  <div class="register">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.userName" @blur="idExit(formLabelAlign.userName)"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="formLabelAlign.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
          <el-radio :label="3">保密</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="register">注册</el-button>
  </div>
</template>

<script>
import { register, isExit } from "../request/api";
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        userName: "",
        password: "",
        gender: 1
      }
    };
  },
  methods: {
    register() {
      register(this.formLabelAlign).then(({ errno, message }) => {
        console.log(typeof this.formLabelAlign.gender);
        if (errno == 0) {
          this.$message.success("注册成功");
        } else {
          this.$message.error(message);
        }
      });
    },
    idExit(userName) {
      isExit({ userName }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>



<style lang="less" scoped>
.register {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style> 