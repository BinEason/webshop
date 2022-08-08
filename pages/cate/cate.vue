<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧滑动 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height:sheight + 'px'}">
        <block v-for="(item,i) in cateList" :key="i">
        <view :class="['left-scroll-view-item',i===active ? 'active':'']"  @click="changeActive(i)">{{item.cat_name}}</view>
        </block>
        
        
      </scroll-view>
      <!-- 右侧滑动 -->
      <scroll-view class="right-scroll-view" scroll-y="true" :style="{height:sheight + 'px'}" :scroll-top="scrollTop">
        <view class="cate-level2" v-for="(item2,i2) in cateLevel2">
          <view class="cate-level2-title">^{{item2.cat_name}}^</view>
          <view class="cate-level3-list">
            <view class="cate-level3-item" v-for="(item3,i3) in item2.children" @click="goodslist(item3)" :key="i3">
              <image src="/static/404.jpg"></image>
              <text>{{item3.cat_name}}</text>
            </view>
            
          </view>
        </view>
        
      </scroll-view>
      
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        sheight:0,
        cateList:[],
        active:0,
        cateLevel2:[],
        scrollTop:0
        
      };
    },
    onLoad() {
      const sysinfo = uni.getSystemInfoSync()
      this.sheight=sysinfo.windowHeight
      this.getCateList()
    },
    methods:{
      async getCateList(){
        const {data:res} = await uni.$http.get("/api/public/v1/categories")
        console.log(res);
        if(res.meta.status !== 200) return uni.$showmsg()
        this.cateList= res.message
        this.cateLevel2=res.message[0].children
       
      },
      changeActive(i){
        this.active=i
        this.cateLevel2=this.cateList[i].children
        this.scrollTop=this.scrollTop === 0? 1:0
        
      },
      // 跳转商品页
      goodslist(item){
        uni.navigateTo({
          url:"/subpkg/goods_list/goods_list?cid=" + item.cat_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container{
    display: flex;
    .left-scroll-view{
      width: 120px;
      .left-scroll-view-item{
        background-color: #f7f7f7;
        line-height: 60px;
        text-align: center;
        font-size: 12;
        &.active{
          background-color: #fff;
          position: relative;
          &:before{
            content:"" ;
            display: block;
            width: 3px;
            height: 30px;
            background-color: #C00000;
            position: absolute;
            top: 15px;
            left: 10px;
          }
        }
      }
      
    }
    .cate-level2-title{
      font-size: 12px;
      font-weight: bold;
      text-align: center;
    }
    .cate-level3-list{
      display: flex;
      flex-wrap: wrap;
      .cate-level3-item{
        width: 33.3%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        image{
          width: 60px;
          height: 60px;
        }
        text{
          font-size: 12;
        }
        
        
      }
    }
  }

</style>
