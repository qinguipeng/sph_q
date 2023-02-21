<template>
  <div>
    <h1>我是搜索</h1>

    <h1>params参数----{{ $route.params.keyword }}======{{ keyword }}</h1>
    <h1>query参数----{{ $route.query.k }}</h1>
    <h1>query参数----{{ $route.query.k }}</h1>
  </div>
</template>


<script>
export default {
  name: "Search",
  components: {},
  // 面试题4：路由组件能不能传递props数据？
  // 1.Boolean写法： props: ["keyword"],接收params参数,
  // props: ["keyword"],

  //
  //
  props: ["keyword", "a", "b"],
};
</script>

<style lang="less" scoped>
</style>