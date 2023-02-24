<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- 在Home Search显示,在登录、注册隐藏 -->
    <!-- 使用路径判断 -->
    <!-- v-show="$route.path == '/home' || $route.path == '/search'" -->
    <!-- 使用路由元信息进行显示还是隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "components/header/Header.vue";
import Footer from "components/footer/Footer.vue";
export default {
  name: "App",
  components: { Header, Footer },
  created() {
    // dispach actions ,获取home异步数据，存储在仓库中
    this.$store.dispatch("getCategoryList");
    //
  },
};
</script>

<style lang="less" scoped>
</style>


