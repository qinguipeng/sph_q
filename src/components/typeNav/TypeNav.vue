<template>
  <!-- 分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派  -->
      <div @mouseleave="leaveIndex()">
        <h2 class="all">全部商品分类</h2>

        <!-- 三级联动 -->
        <div class="sort">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in catergoryList.slice(0, 16)"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <!-- 一级菜单 -->
                <a
                  href="#"
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>

              <!-- 二级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none ' }"
              >
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <!-- 二级菜单 -->
                      <a
                        href="#"
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>

                    <!-- 三级分类 -->
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <!-- 三级菜单 -->
                        <a
                          href="#"
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>


<script>
// 使用vuex身上的辅助函数mapState辅助函数，将store.state的数据映射到computed 身上，方便使用（相较于$store.state.方便）
import { mapState } from "vuex";

// 引入lodash的节流函数
import _ from "lodash";
// console.log(_);
// 按需引入
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  // 组件创建或者挂载完毕后；可以向服务器发送请求
  data() {
    return {
      currentIndex: -1,
    };
  },
  created() {
    // 通知vuex发请求，存储在仓库中
    this.$store.dispatch("categoryList");
  },

  computed: {
    ...mapState({
      // 此对象k:v里面的v是一个函数，当使用这个计算属性的时候，右侧的这个函数会立即调用一次，所以函数return 的应该是大仓库里面的小仓库里面的数据
      catergoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },

  methods: {
    // 鼠标经过修改一级分类元素
    // changeIndex(index) {
    //   this.currentIndex = index;
    //   // console.log(index);
    //   // console.log(this.currentIndex);
    // },
    // 使用lodash节流throttle
    // 不要使用箭头函数，会有问题
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    // 鼠标离开修改一级分类元素
    leaveIndex() {
      this.currentIndex = -1;
    },

    // 路由跳转
    // 传入一个事件对象event,利用事件对象的属性实现点击的必须是我们设定的a标签内绑定的自定义属性data-categoreyName=""
    goSearch(event) {
      let element = event.target;
      // console.log(element);
      // console.log(element.dataset);
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 如果标签上游categoryname属性才是a标签
      if (categoryname) {
        // 区分了是不是a标签，还要区分是哪一级分类的a标签，就再绑定自定义属性
        // 整理路由跳转要传参数
        let location = { name: "search" };
        let query = { categoreyName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 参数的整理
        console.log(location, query);
        // 路由的跳转
        this.$router.push("/search");
      }
    },
  },
};
</script>

 
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        // .item:hover {
        //   background-color: skyblue;
        // }
        .cur {
          background-color: skyblue;
        }
      }
    }
  }
}
</style>