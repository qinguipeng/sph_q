<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <!-- 购物车 -->
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(sku, index) in cartInfoList"
          :key="sku.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="sku.isChecked == 1"
              @change="updateChecked(sku, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="sku.imgUrl" />
            <div class="item-msg">
              {{ sku.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ sku.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, sku)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="sku.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, sku)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, sku)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ sku.skuNum * sku.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteCartById(sku)"
              >删除</a
            >
            <br />
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @change="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllCheckedSku">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// 引入lodash的节流函数
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",

  mounted() {
    this.getData();
  },

  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算选中产品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
      // watch + fliters + reduce
    },
    // 判断是否全选
    isAllChecked() {
      return this.cartInfoList.every((item) => {
        item.isChecked == 1;
      });
    },
  },
  methods: {
    // 获取个人购物车数据
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 修改商品数量
    // 添加节流
    handler: throttle(function (type, disNum, sku) {
      // disNum扮演的角色：  +    -    显示的数量
      // 请求变化商品数量 addOrUpdateShopCart()
      switch (type) {
        case "add":
          // 带给服务器变化量
          disNum = 1;
          break;

        case "minus":
          // if (sku.skuNum > 1) {
          //   // 变化 -1
          //   disNum = -1;
          // } else {
          //   // 变化数量为0
          //   disNum = 0;
          // }

          disNum = sku.skuNum > 1 ? -1 : 0;

          break;

        case "change":
          if (isNaN(disNum) || disNum < 1) {
            // 用户输入的是非数字，比如说汉字，变化的量是0
            disNum = 0;
          } else {
            // 用户输入的是数字，但是是非正整数
            disNum = parseInt(disNum) - sku.skuNum;
          }
          break;

        default:
          break;
      }
      //派发actions
      this.$store
        .dispatch("addOrUpdateShopCart", {
          skuId: sku.skuId,
          skuNum: disNum,
        })
        .then((result) => {
          // console.log(result.message);
          // 再次发送请求
          this.getData();
        })
        .catch((err) => {
          throw err;
        });

      // console.log(type, disNum, sku);
    }, 500),
    // handler(type, disNum, sku) {
    //   // disNum扮演的角色：  +    -    显示的数量
    //   // 请求变化商品数量 addOrUpdateShopCart()
    //   switch (type) {
    //     case "add":
    //       // 带给服务器变化量
    //       disNum = 1;
    //       break;

    //     case "minus":
    //       // if (sku.skuNum > 1) {
    //       //   // 变化 -1
    //       //   disNum = -1;
    //       // } else {
    //       //   // 变化数量为0
    //       //   disNum = 0;
    //       // }

    //       disNum = sku.skuNum > 1 ? -1 : 0;

    //       break;

    //     case "change":
    //       if (isNaN(disNum) || disNum < 1) {
    //         // 用户输入的是非数字，比如说汉字，变化的量是0
    //         disNum = 0;
    //       } else {
    //         // 用户输入的是数字，但是是非正整数
    //         disNum = parseInt(disNum) - sku.skuNum;
    //       }
    //       break;

    //     default:
    //       break;
    //   }
    //   //派发actions
    //   this.$store
    //     .dispatch("addOrUpdateShopCart", {
    //       skuId: sku.skuId,
    //       skuNum: disNum,
    //     })
    //     .then((result) => {
    //       // console.log(result.message);
    //       // 再次发送请求
    //       this.getData();
    //     })
    //     .catch((err) => {
    //       throw err;
    //     });

    //   // console.log(type, disNum, sku);
    // },

    // 删除购物车某个商品的操作
    async deleteCartById(sku) {
      try {
        await this.$store.dispatch("deleteCartListBySkuId", sku.skuId);
        this.getData();
      } catch (error) {
        // alert(error.message);
      }
    },

    // 修改某商品的勾选状态
    async updateChecked(sku, event) {
      // 带给服务器的参数必须是0或1，但是通过event.target.checkedna拿到的是boolean值
      // console.log(event.target.checked);
      try {
        let isChecked = event.target.checked ? 1 : 0;
        await this.$store.dispatch("updateCheckedById", {
          skuId: sku.skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        // alert(error.message);
      }
    },

    // 删除选中的产品
    async deleteAllCheckedSku() {
      try {
        await this.$store.dispatch("deleteAllCheckedSku");
        // 再发一次请求
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    // 点击修改全选按钮的勾选状态
    async updateAllCartChecked(event) {
      try {
        let isChecked = event.target.checked ? 1 : 0;
        // 派发action
        await this.$store.dispatch("updateAllCartChecked", isChecked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>