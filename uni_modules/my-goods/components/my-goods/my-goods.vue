<template>
  
    <view class="goods-item">
      <!-- 左边 -->
      <view class="left-good">
        <radio :checked="item.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
        <image :src="item.goods_small_logo || defaultPic" class="good-pic"></image>
      </view>
      <!-- 右边 -->
      <view class="right-good">
        <text class="good-name">{{item.goods_name}}</text>
        <view class="good-box-info">
          <view class="good-price">￥{{item.goods_price | tofixed}}</view>
          <uni-number-box :min="1" :value="item.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
          
        </view>
      </view>
    
  </view>
</template>
<script>
  export default{
    props:{
      item:{
        type:Object,
        default:{}
      },
      showRadio: {
            type: Boolean,
            // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
            default: false,
          },
          showNum: {
                type: Boolean,
                default: false,
              },
    },
    data(){
      return{
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    },
    filters:{
      tofixed(num){
        //使数据带两位小数
        return  Number(num).toFixed(2)
      }
    },
    methods:{
      radioClickHandler(){
         // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
            // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
            this.$emit('radio-change', {
              // 商品的 Id
              goods_id: this.item.goods_id,
              // 商品最新的勾选状态
              goods_state: !this.item.goods_state
            })
      },
      numChangeHandler(val){
        this.$emit('num-change', {
              // 商品的 Id
              goods_id: this.item.goods_id,
              // 商品的最新数量
              goods_count: +val
            })
      }
    }
  }
</script>
<style lang="scss">
  .goods-item{
      width: 750rpx;
      // 设置盒模型为 border-box
      box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    .left-good{
      display: flex;
      align-items: center;
      margin-right: 5px;
      .good-pic{
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    .right-good{
      display: flex;
      flex-direction: column;
      justify-content:space-between;
      .good-name{
        font-size: 13px;
        overflow: hidden;      
        text-overflow: ellipsis;      
        display: -webkit-box; 
        -webkit-line-clamp: 2; //多行在这里修改数字即可 
        overflow:hidden;
        -webkit-box-orient: vertical;
      }
      .good-box-info{
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        .good-price{
          color:#C00000;
          font-size: 16px;
        }
        
      }
      
    }
    
  }
</style>
