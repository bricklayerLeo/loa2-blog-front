<template>
  <div class="person">
    <div v-for="(e,idx) in blogList" :key="idx">
      <p>
        <img v-if="e.image" :src="'http://localhost:3000'+e.image" class="avatar" />
        {{e.content}}
      </p>

      <p>{{e.user.userName}} {{e.user.picture}}</p>
    </div>
    <div @click="getMore">加载更多</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { getProfileList, setting } from "@/request/api";

export default {
  name: "Home",
  data() {
    return {
      blogList: [],
      params: {
        userName: "",
        pageIndex: 0
      }
    };
  },
  components: {
    HelloWorld
  },
  methods: {
    getMore() {
      this.params.pageIndex++;
      this.getList({ ...this.params });
    },
    getList(params) {
      getProfileList(params).then(res => {
        this.blogList = this.blogList.concat(res.data.blogList);
      });
    }
  },
  created() {
    setting({}).then(({ data }) => {
      const { nickName, userName, picture, city } = data;
      //   this.userInfo.nickName = nickName;
      //   // this.userInfo.picture = picture;
      //   this.imageUrl = "http://localhost:3000" + picture;
      //   this.userInfo.city = city;
      //   this.img = picture;
      this.params.userName = userName;
      this.getList({ ...this.params });
      // this.fileList.push({ url: picture });
    });
  }
};
</script>
<style lang='less'>
</style>