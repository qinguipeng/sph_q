<template>
  <div>
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <!--bread ：面包屑，带有x的小按钮-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 分类的面包屑 -->
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryanme">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword(trademark)">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark(trademark)">×</i>
            </li>
            <!-- 平台的售卖的属性值的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!-- 详情页 -->
        <div class="details clearfix">
          <!--排序-->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOder('1')">
                  <a href="JavaScript:;">
                    综合
                    <span
                      v-if="isOne"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                    ></span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOder('2')">
                  <a href="JavaScript:;">
                    价格
                    <span
                      v-if="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!--商品列表 goodsList-->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"> -->
                    <!-- 路由跳转的时候需要带参数 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>

                    <!-- </a> -->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页Pagination-->
          <pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import SearchSelector from "./searchSelector/SearchSelector.vue";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: { SearchSelector },
  // 面试题4：路由组件能不能传递props数据？
  // 1.Boolean写法： props: ["keyword"],接收params参数,
  // props: ["keyword"],
  data() {
    return {
      searchParams: {
        // 一级分类的Id
        category1Id: "",
        // 二级分类的Id
        category2Id: "",
        // 三级分类的Id
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序,默认  综合:降序  "1:desc"   ==>1: 综合,2: 价格 asc: 升序,desc: 降序
        order: "1:desc",
        // 分页器，代表显示的是第几页
        pageNo: 1,
        // 代表每一页展示的数据
        pageSize: 10,
        // 平台售卖商品的属性可选项=>商品属性的数组: ["属性ID:属性值:属性名"]
        props: [],
        // 商标
        trademark: "",
      },
    };
  },

  beforeMount() {
    // 1.整理参数：    在发请求之前将参数searchParams传给服务器，服务器通过参数searchParams返回相关的结果进行展示
    // 1.1复杂写法：
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.params.keyword;
    // this.searchParams.keyword = this.$route.keyword;
    //1.2 ES6,Object.assign()方法,浅拷贝属性名相同的对象的属性值*********************************ES6：Object.assign(合并到的对象,obj1,obj2/)
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    //3.获取数据： 测试接口返回的数据
    this.getData();
  },
  computed: {
    //  ...mapGetters([]),传递的是数组，不区分模块
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    // 升序
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    // 降序
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    ...mapState({
      total: function (state) {
        return state.search.searchInfo.total;
      },
    }),
  },

  methods: {
    //向服务器发请求，获取search模块数据，功能：需根据用户在搜索框内输入参数  或 在三级列表中点击的菜单进行相应search模块数据的展示
    //2. 把请求封装成函数：当需要调用的时候才请求数据
    getData() {
      this.$store.dispatch("getSearchInfo", this.searchParams);
    },
    // 移除路由分类名称
    removeCategoryanme() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //地址栏也要改：进行路由跳转，自己跳自己
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 点击删除searchParams关键字，实现关键字控制的面包屑不显示
    removeKeyword() {
      // 给服务器带的参数searchParams的keyword置空
      this.searchParams.keyword = undefined;
      // 再次发送请求
      this.getData();
      // 通知兄弟组件Header清除keyword
      this.$bus.$emit("clear");
      // 进行路由的跳转
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //自定义事件回调,子组件点击显示相应的面包屑
    trademarkInfo(trademark) {
      //1. 整理参数:品牌: "ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //2. 再次发请求，展示数据
      this.getData();

      // console.log("我是父组件", trademark);
    },
    // 点击移除trademark
    removeTrademark(trademark) {
      this.searchParams.trademark = undefined;
      // 再次发送请求
      this.getData();
      // 通知兄弟组件Header清除keyword
      this.$bus.$emit("clear");
      // 进行路由的跳转
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 收集平台售卖属性的回调
    attrInfo(attr, attrValue) {
      //  ["属性ID:属性值:属性名"]
      // 整理参数格式
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if (this.searchParams.props.indexOf(prop) == -1) {
        this.searchParams.props.push(prop);
      }
      // 再次发请求
      this.getData();

      // console.log(attr, attrValue);
    },
    // 点击移除props
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      // 再次发请求
      this.getData();
    },
    // 排序功能点击事件：整体思路是先改变order再发送getData()请求
    changeOder(flag) {
      // flag来区分点击的是综合还是价格
      let originOrder = this.searchParams.order;
      // console.log(originOrder);
      // 确认初始状态，再根据初始状态与flag参数是否相等，再对order进行赋值
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      // 准备一个newOrder
      let newOrder = "";
      //
      if (flag == originFlag) {
        newOrder = `${flag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;

      // 默认是desc,
      // 1. 先修改order属性

      // 1.2多重if判断（自己的实现思路）
      // if (flag == "1") {
      //   if (this.searchParams.order == "1:asc") {
      //     this.searchParams.order = "1:desc";
      //   } else {
      //     this.searchParams.order = "1:asc";
      //   }
      // } else {
      //   if (this.searchParams.order == "2:asc") {
      //     this.searchParams.order = "2:desc";
      //   } else {
      //     this.searchParams.order = "2:asc";
      //   }
      // }

      // 再发请求
      this.getData();
    },
    // 分页器点击实现页面跳转页面
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },

  watch: {
    // 1.数据监听：监听组件实例上的属性值的变化
    $route(newValue, oldValue) {
      //2. 再次发请求之前 还要再整理this.searchParams,再传给服务器
      // console.log(this.searchParams);
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //3. 在发送请求

      this.getData();
      // 每一次请求完毕，应该把相应的1、2、3级id清空
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      // .page {
      //   width: 733px;
      //   height: 66px;
      //   overflow: hidden;
      //   float: right;

      //   .sui-pagination {
      //     margin: 18px 0;

      //     ul {
      //       margin-left: 0;
      //       margin-bottom: 0;
      //       vertical-align: middle;
      //       width: 490px;
      //       float: left;

      //       li {
      //         line-height: 18px;
      //         display: inline-block;

      //         a {
      //           position: relative;
      //           float: left;
      //           line-height: 18px;
      //           text-decoration: none;
      //           background-color: #fff;
      //           border: 1px solid #e0e9ee;
      //           margin-left: -1px;
      //           font-size: 14px;
      //           padding: 9px 18px;
      //           color: #333;
      //         }

      //         &.active {
      //           a {
      //             background-color: #fff;
      //             color: #e1251b;
      //             border-color: #fff;
      //             cursor: default;
      //           }
      //         }

      //         &.prev {
      //           a {
      //             background-color: #fafafa;
      //           }
      //         }

      //         &.disabled {
      //           a {
      //             color: #999;
      //             cursor: default;
      //           }
      //         }

      //         &.dotted {
      //           span {
      //             margin-left: -1px;
      //             position: relative;
      //             float: left;
      //             line-height: 18px;
      //             text-decoration: none;
      //             background-color: #fff;
      //             font-size: 14px;
      //             border: 0;
      //             padding: 9px 18px;
      //             color: #333;
      //           }
      //         }

      //         &.next {
      //           a {
      //             background-color: #fafafa;
      //           }
      //         }
      //       }
      //     }

      //     div {
      //       color: #333;
      //       font-size: 14px;
      //       float: right;
      //       width: 241px;
      //     }
      //   }
      // }
    }
  }
}
</style>