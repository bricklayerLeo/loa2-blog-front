<template>
  <div class="setting">
    <el-upload
      class="upload-demo"
      ref="upload"
      action="string"
      accept="image/jpeg, image/png, image/jpg"
      list-type="picture-card"
      :before-upload="onBeforeUploadImage"
      :http-request="UploadImage"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
import { setting, upload } from "@/request/api";
export default {
  data() {
    return {
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ],
      logo: ""
    };
  },
  methods: {
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
          // console.log("上传图片成功");
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
    setting({}).then(res => {
      console.log(res);
    });
  }
};
</script>

<style lang='less' scoped>
.setting {
}
</style>