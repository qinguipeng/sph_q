<template>
  <div>
    <header class="header">
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>商品会欢迎您</p>
            <p v-if="!userName">
              <span>请</span>
              <!-- 声明式使用路由组件 -->
              <router-link to="/login">登录 |</router-link>
              <router-link to="/rigister"> 免费注册</router-link>
            </p>
            <p v-else>
              <a href="javascript:;">{{ userName }} |</a>
              <a class="rigister" @click="logout"> 退出登录</a>
            </p>
          </div>
          <div class="typeList">     
            <router-link to="/center/myorder">我的订单</router-link> 
            <router-link to="/shopcart">我的购物车</router-link>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <div class="bottom">
        <h1 class="logoArea">
          <!-- 声明式使用路由组件 -->
          <router-link to="/home" class="logo" title="尚品汇">
            <img src="./images/logo.png" alt="" />
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
            />
            <!-- 路由组件的编程式使用 -->
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSearch"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>


<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    // 通过事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  computed: {
    // 用户名
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
  methods: {
    goSearch() {
      // 路由传参
      // 第一种：字符串 形式
      // this.$router.push(
      //   "/search/" + this.keyword + "?k=" + this.keyword.toUpperCase()
      // );
      // 第二种：模板字符串
      // this.$router.push(
      //   `/search/${this.keyword}?k=${this.keyword.toUpperCase()}`
      // );
      // 第三种：对象的写法（常用）
      // this.$router.push({
      //   name: "search",
      //   params: { keyword: this.keyword },
      //   query: { k: this.keyword.toUpperCase() },
      // });
      // ********************************************
      // 面试题1：路由传参（对象写法）path是否可以结合params参数一起使用？
      // 答 ：路由跳转传参时，对象写法可以是name,path形式，但是需要注意的是path的写法不能与params参数一起使用，会导致不能跳转
      // this.$router.pushe({
      //   path: "/search",
      //   params: { keyword: this.keyword },
      //   query: { k: this.keyword.toUpperCase() },
      // });
      // ********************************************
      // 面试题2：如何指定params参数可传可不传？
      // 答：如果路由要求传递params参数，但是你就是不传发现一件事，url会缺少给params占位的信息
      // 指定params参数可以传递，或者不传递，需要在配置路由的时候，在占位的后面加上一个问号？【params可传递或不传递,并保证url正确】
      // this.$router.push({
      //   name: "search",
      //   query: { k: this.keyword.toUpperCase() },
      // });
      // *******************************************
      // 面试题3：params参数可以传递亦可以不传递，但是如果传递是空字符串，如何解决?
      // 带答：使用 params: { keyword: "" || undefined }  解决：params参数，可传可不传，
      // 答：
      // this.$router.push({
      //   name: "search",
      //   params: { keyword: "" || undefined },
      //   query: { k: this.keyword.toUpperCase() },
      // });
      // *******************************************
      // 面试题4：路由组件能不能传递props数据？
      // 答：可以，有3种写法
      //
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }

      //  this.$router.push({
      //     name: "search",
      //     params: { keyword: this.keyword || undefined },
      //   });
    },
    // 退出登录
    async logout() {
      try {
        // 1. 发请求，退出登录
        // 2. 清除项目中的用户信息
        await this.$store.dispatch("userLogout");
        this.$router.push("/home");
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>


<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>