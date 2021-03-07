<template>
  <div class="about">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item>
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          ref="upload"
          action="string"
          accept="image/jpeg, image/png, image/jpg"
          :before-upload="onBeforeUploadImage"
          :http-request="UploadImage"
        >
          <!-- <img v-if="image" :src="image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>

    <div @click="focus">关注</div>
    <div
      v-for="(e,idx) in blogList"
      :key="idx"
      @click="$router.push({path:'/person',query:{id:e.userId,userName:e.userName}})"
    >
      <p>
        {{e.content}}
        <img v-if="e.image" :src="'http://localhost:3000'+e.image" />
      </p>
      <p>
        <img v-if="e.user.picture" :src="'http://localhost:3000'+e.user.picture" class="avatar" />
        {{e.user.userName}}
      </p>
    </div>
    <div @click="getMore">加载更多</div>
  </div>
</template>
<script>
import { upload, createBlog, getSquareList } from "@/request/api";
export default {
  data() {
    return {
      form: {
        content: "",
        image: ""
      },
      image: "",
      params: {
        pageIndex: 0
      },
      blogList: []
    };
  },
  created() {
    this.getSquareList();
  },
  methods: {
    focus() {},
    getMore() {
      this.params.pageIndex++;
      this.getSquareList({ ...this.params });
    },
    getSquareList() {
      getSquareList(this.params).then(res => {
        console.log(res);

        this.blogList = this.blogList.concat(res.data.blogList);
      });
    },
    onSubmit() {
      createBlog(this.form).then(res => {
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
          this.image = "http://localhost:3000" + response.data.url;
          this.form.image = response.data.url;
          // this.userInfo.picture = response.data.url; // console.log("上传图片成功");
          // param.onSuccess(); // 上传成功的图片会显示绿色的对勾
          // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
        })
        .catch(response => {
          console.log("图片上传失败");
          param.onError();
        });
    }
  }
};
</script>
<style lang='less'>
// .userinfo {
//   display: flex;
.avatar {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
// }
.about {
  width: 500px;
}
.avatar-uploader .el-upload {
  // border: 1px dashed #d9d9d9;
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
  // width: 178px;
  // height: 178px;
  // line-height: 178px;
  text-align: center;
}
.avatar1 {
  width: 178px;
  height: 178px;
  display: block;
}
</style>