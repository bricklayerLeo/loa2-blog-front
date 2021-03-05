<template>
  <div class="setting">
    <el-form :label-position="'left'" label-width="80px" :model="userInfo">
      <el-form-item label="昵称">
        <el-input v-model="userInfo.nickName"></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="userInfo.city"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          accept="image/jpeg, image/png, image/jpg"
          :before-upload="onBeforeUploadImage"
          :http-request="UploadImage"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="当前密码">
        <el-input v-model="userInfo1.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="userInfo1.newPassword"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="changeUserInfo">提交</el-button>
    <el-button type="primary" @click="changePassword">修改密码</el-button>
    <el-button type="primary" @click="logout">退出</el-button>
  </div>
</template>
<script>
import {
  setting,
  upload,
  changePassword,
  changeInfo,
  logout
} from "@/request/api";
export default {
  data() {
    return {
      // fileList: [],
      logo: "",
      imageUrl: "",
      userInfo: {
        nickName: "",
        // newPassword: "",
        // password: "",
        picture: "",
        city: ""
      },
      img: "",
      userInfo1: {
        newPassword: "",
        password: ""
      }
    };
  },
  methods: {
    logout() {
      logout().then(res => {
        localStorage.removeItem("token");
        this.$router.replace({
          path: "/"
        });
        console.log(res);
      });
    },
    changePassword() {
      changePassword(this.userInfo1).then(res => {
        console.log(res);
      });
    },
    changeUserInfo() {
      if (!this.userInfo.picture) {
        this.userInfo.picture = this.img;
      }
      changeInfo(this.userInfo).then(res => {
        console.log(res);
      });
    },
    onBeforeUploadImage(file) {
      const isIMAGE = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 1MB!");
      }
      return isIMAGE && isLt1M;
    },
    UploadImage(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      upload(formData)
        .then(response => {
          this.imageUrl = "http://localhost:3000" + response.data.url;

          this.userInfo.picture = response.data.url; // console.log("上传图片成功");
          // param.onSuccess(); // 上传成功的图片会显示绿色的对勾
          // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
        })
        .catch(response => {
          console.log("图片上传失败");
          param.onError();
        });
    }
  },
  created() {
    setting({}).then(({ data }) => {
      const { nickName, userName, picture, city } = data;
      this.userInfo.nickName = nickName;
      // this.userInfo.picture = picture;
      this.imageUrl = "http://localhost:3000" + picture;
      this.userInfo.city = city;
      this.img = picture;
      // this.fileList.push({ url: picture });
    });
  }
};
</script>

<style lang='less'>
.setting {
  width: 500px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>