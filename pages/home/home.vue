<template>
  
  <view>
    
    <view class="search-box">
      <my-search @searchFa="searchfn"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    
    <!--导航-->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClick(item)">
      <image :src="item.image_src" class="nav-image"></image>
        
      </view>
      
    </view>
    <!-- 楼层 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item,i) in floorList" :key="i" >
        <!-- 标题区域 -->
        <image class="floor-image" :src="item.floor_title.image_src"></image>
        <!-- 图片区域 -->
        <view class="floor-img-box">
          <navigator class="floor-left" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <view class="floor-right">
            <navigator class="floor-right-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
              <image :src="item2.image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
              
           </navigator>
           
            
          </view>
        </view>
        
      </view>
      
    </view>
    
      
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //轮播图数组
        swiperList:[],
        //导航列表
        navList:[],
        //楼层列表
        floorList:[]
      };
    },
    onLoad() {
      this.getSwiperList(),
      this.getNavList(),
      this.getFloorList()
      
    },
    methods:{
      async getSwiperList(){
        const {data:res} = await uni.$http.get("/api/public/v1/home/swiperdata")
        // console.log(res)
        if(res.meta.status !== 200) return uni.$showmsg()
        const spl=res.message
        this.swiperList = Object.values(spl)
      },
      async getNavList(){
        const res =await uni.$http.get("/api/public/v1/home/catitems")
        // console.log(res)
        if(res.statusCode !== 200) return uni.$showmsg()
        const spl = res.data.message
        this.navList = Object.values(spl)
        // console.log(this.navList)
      },
      async getFloorList(){
        const res =await uni.$http.get("/api/public/v1/home/floordata")
        // console.log(res)
        if(res.statusCode !== 200) return uni.$showmsg()
        res.data.message.forEach(floor =>{
          floor.product_list.forEach(item =>{
            item.url="/subpkg/goods_list/goods_list?" + item.navigator_url.split("?")[1]
          })
        })
        this.floorList=res.data.message
        // console.log(this.floorList)
      },
      
        
      navClick(item){
        if(item.name === '分类'){
          uni.switchTab({
            url:"/pages/cate/cate"
          })
          
        }
      },
      searchfn(){
        uni.navigateTo({
          url:"/subpkg/search/search"
        })
      }
    }
    
  }
</script>

<style lang="scss">
swiper{
  height: 330rpx;
  .swiper-item,
  image{
    width: 100%;
    height: 100%;
  }
}
.nav-list{
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;
  .nav-image{
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-image{
  width: 100%;
  height: 60rpx;
}
  
.floor-img-box{
  display: flex;
  padding: 10rpx;
  .floor-right{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
.search-box{
  position: sticky;
  top: 0;
  z-index: 999;
}

</style>
