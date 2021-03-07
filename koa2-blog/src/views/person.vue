<template>
  <div class="person">
    <div @click="focus">{{isFocus?'取消关注':"关注"}}</div>
    <div class="userinfo" v-for="(e,idx) in blogList" :key="idx">
      <p>
        <img v-if="e.image" :src="'http://localhost:3000'+e.image" class="avatar" />
        {{e.content}}
      </p>

      <p>
        <span>{{e.user.userName}}</span>
        <img v-if="e.user.picture" :src="'http://localhost:3000'+e.user.picture" class="avatar" />
      </p>
    </div>
    <div @click="getMore">加载更多</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { getProfileList, setting, toFollow, unfollow } from "@/request/api";

export default {
  name: "Home",
  data() {
    return {
      isFocus: false,
      blogList: [],
      params: {
        userName: "",
        id: "",
        pageIndex: 0
      }
    };
  },
  components: {
    HelloWorld
  },
  methods: {
    focus() {
      if (!this.isFocus) {
        toFollow({ userId: this.$route.query.id }).then(res => {
          console.log(res);
        });
      } else {
        unfollow({ userId: this.$route.query.id }).then(res => {
          console.log(res);
        });
      }
    },
    getMore() {
      this.params.pageIndex++;
      this.getList({ ...this.params });
    },
    getList(params) {
      getProfileList(params).then(res => {
        this.isFocus = res.data.Ishas;
        this.blogList = this.blogList.concat(res.data.blogList);
      });
    }
  },
  created() {
    const { id, userName } = this.$route.query;
    if (id && userName) {
      this.params.userName = userName;
      this.params.id = id;
      this.getList({ ...this.params });
    } else {
      setting({}).then(({ data }) => {
        const { nickName, userName, picture, city, id } = data;
        this.params.userName = userName;
        this.params.id = id;
        this.getList({ ...this.params });
      });
    }
  }
};
</script>
<style lang='less'>
.avatar {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>