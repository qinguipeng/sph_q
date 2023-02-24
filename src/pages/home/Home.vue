<template>
  <div>
    <!-- 三级联动全局组件：已经注册为全局组件，因此不需要再引入 -->
    <TypeNav />
    <list-container />
    <recommend />
    <rank />
    <Like />
    <floor
      v-for="(floorListItem, index) in floorLIst"
      :key="floorListItem.id"
      :list="floorListItem"
    />
    <!-- <floor /> -->
    <brand />
  </div>
</template>


<script>
import TypeNav from "components/typeNav/TypeNav";
import ListContainer from "pages/home/listContainer/ListContainer.vue";
import Recommend from "pages/home/recommend/Recommend.vue";
import Rank from "pages/home/rank/Rank.vue";
import Like from "pages/home/like/Like.vue";
import Floor from "pages/home/floor/Floor.vue";
import Brand from "pages/home/brand/Brand.vue";

// 使用vuex上的 辅助函数 mapState 映射为组件身上的computed属性
import { mapState } from "vuex";

export default {
  name: "Home",
  components: { TypeNav, ListContainer, Recommend, Rank, Like, Floor, Brand },
  // 这里不用watch+$nextStick()是因为数据请求是在父组件Home发的，数据已经准备好了
  created() {
    //Home路由组件， dispatch actions 获取其子组件的异步数据
    this.$store.dispatch("getFloorList");
  },

  computed: {
    ...mapState({
      // vuex bindings
      floorLIst: (state) => {
        return state.home.floorLIst;
      },
    }), //可以再vueDevtoll查看
  },
  methods: {},
};
</script>

<style lang="less" scoped>
</style>