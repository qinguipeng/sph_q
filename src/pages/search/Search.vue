<template>
  <div>
    <TypeNav></TypeNav>
    <h1>我是search</h1>
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