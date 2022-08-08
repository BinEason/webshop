<template>
  
    <view class="goods-item">
      <!-- 左边 -->
      <view class="left-good">
        <image :src="item.goods_small_logo || defaultPic" class="good-pic"></image>
      </view>
      <!-- 右边 -->
      <view class="right-good">
        <text class="good-name">{{item.goods_name}}</text>
        <view class="good-box-info">
          <view class="good-price">￥{{item.goods_price | tofixed}}</view>
          
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
      }
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
    }
  }
</script>
<style lang="scss">
  .goods-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    .left-good{
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
        .good-price{
          color:#C00000;
          font-size: 16px;
        }
      }
      
    }
    
  }
</style>
