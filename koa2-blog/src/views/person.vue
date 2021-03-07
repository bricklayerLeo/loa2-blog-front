<template>
  <div class="person">
    <div class="content">
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
    <div class="focus" @click="focus">
      <p>{{this.$route.query.userName?this.$route.query.userName:params.userName}}</p>
      <p>{{isFocus?'取消关注':"关注"}}</p>
      <p>粉丝列表</p>
      <p v-for="(e,idx) in fansList" :key="idx">{{e.userName}}</p>
      <p>关注人列表</p>
      <p v-for="(e,idx) in focus" :key="idx">{{e.userName}}</p>
    </div>
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
      focus: "",
      blogList: [],
      fansList: [],
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
    },
    getMore() {
      this.params.pageIndex++;
      this.getList({ ...this.params });
    },
    getList(params) {
      getProfileList(params).then(res => {
        this.fansList = res.data.fans.fanList;
        this.isFocus = res.data.Ishas;
        this.focus = res.data.focusList.focusList;
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
.person {
  display: flex;
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .focus {
    width: 500px;
    background-color: skyblue;
  }
}
</style>