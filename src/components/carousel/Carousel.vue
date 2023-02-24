<template>
  <!-- 轮播图 -->
  <div class="swiper-container" id="floor1Swiper" ref="caro">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carouselList, index) in list"
        :key="carouselList.id"
      >
        <img :src="carouselList.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>



<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],

  // 为了封装
  watch: {
    list: {
      //immediate: 确认是否以当前的初始值执行handler的函数 mmediate:true; 立即执行,当刷新页面时会立即执行一次handler函数
      // 为什么watch监听不到list:因为这个数据在父组件已经请求好，并且在父组件渲染完成后已经将数据初始化，由空数组赋值为请求的数据，放到store.中，这时候如果接下来不在修改仓库中的list数据，watch就监听不到数据变化，就不会有 handler() 回调，回调handler() {}里面的代码就不会执行，vue的compiler编译子组件的时候，数据是直接从仓库中获取的list，所以添加 immediate: true,
      immediate: true,
      handler(newValue, oldValue) {
        //只能监听到数据已经有了，但是v-for动态渲染的结构我们还没有办法确定，因此还是需要用到nextTick
        // console.log("我在监听Floor组件中的list数据");
        this.$nextTick(() => {
          let mySwiper = new Swiper(this.$refs.caro, {
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项

            autoplay: {
              delay: 3000,
              stopOnLastSlide: true,
              disableOnInteraction: false,
            },
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>



<style scoped>
</style>