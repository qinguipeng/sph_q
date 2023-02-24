<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ list.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li
              class="active"
              v-for="(navList, index) in list.navList"
              :key="index"
            >
              <a :href="navList.url" data-toggle="tab">{{ navList.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keywords, index) in list.keywords" :key="index">
                  {{ keywords }}
                </li>
              </ul>
              <img :src="list.imgUrl" />
            </div>
            <div class="floorBanner">
              <!-- 轮播图 抽取公共组件,传入要遍历的数组-->
              <Carousel :list="list.carouselList" />
              <!-- <div class="swiper-container" id="floor1Swiper" ref="caro">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(carouselList, index) in list.carouselList"
                    :key="carouselList.id"
                  >
                    <img :src="carouselList.imgUrl" />
                  </div>
                </div>
               
                <div class="swiper-pagination"></div>

              
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div> -->
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="list.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// 引入swiper
// import Swiper from "swiper"; //抽取
import Carousel from "components/carousel/Carousel.vue";

export default {
  name: "Floor",
  components: { Carousel },
  props: ["list"],
  mounted() {
    // let mySwiper = new Swiper(this.$refs.caro, {
    //   // direction: "vertical", // 垂直切换选项
    //   loop: true, // 循环模式选项
    //   // autoplay: true, //自动轮播
    //   autoplay: {
    //     delay: 3000,
    //     stopOnLastSlide: true,
    //     disableOnInteraction: false,
    //   },
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    //   },
    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    //   // 如果需要滚动条
    //   // scrollbar: {
    //   //   el: ".swiper-scrollbar",
    //   // },
    // });
  },

  // 为了封装

  // watch: {
  //   list: {
  //     //immediate: 确认是否以当前的初始值执行handler的函数 mmediate:true; 立即执行,当刷新页面时会立即执行一次handler函数
  //     // 为什么watch监听不到list:因为这个数据在父组件已经请求好，并且在父组件渲染完成后已经将数据初始化，由空数组赋值为请求的数据，放到store.中，这时候如果接下来不在修改仓库中的list数据，watch就监听不到数据变化，就不会有 handler() 回调，回调handler() {}里面的代码就不会执行，vue的compiler编译子组件的时候，数据是直接从仓库中获取的list，所以添加 immediate: true,
  //     immediate: true,
  //     handler() {
  //       //只能监听到数据已经有了，但是v-for动态渲染的结构我们还没有办法确定，因此还是需要用到nextTick
  //       // console.log("我在监听Floor组件中的list数据");
  //       this.$nextTick(() => {
  //         let mySwiper = new Swiper(this.$refs.caro, {
  //           // direction: "vertical", // 垂直切换选项
  //           loop: true, // 循环模式选项
  //           autoplay: true, //自动轮播
  // autoplay: {
  //   delay: 3000,
  //   stopOnLastSlide: true,
  //   disableOnInteraction: false,
  // },

  //           // 如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination",
  //             clickable: true,
  //           },

  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },

  //           // 如果需要滚动条
  //           // scrollbar: {
  //           //   el: ".swiper-scrollbar",
  //           // },
  //         });
  //       });
  //     },
  //   },
  // },
};
</script>

<style lang="less" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>