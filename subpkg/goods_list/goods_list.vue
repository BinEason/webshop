<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,i) in goodslist" :key="i" @click="gotoDetail(item.goods_id)">
        <my-goods :item="item"></my-goods>
      </view>
      
    </view>
  </view>
</template>

<script>
  export default {
    
    data() {
      return {
        queryobj:{
          query:'',
          cid:"",
          pagenum:1,
          pagesize:10
        },
        goodslist:[],
        total:0,
        isLoading:false
        
        
      };
    },
    onLoad(options) {
      this.queryobj.query = options.query || ''
      this.queryobj.cid = options.cid || ''
      // console.log(this.queryobj);
      this.getGoodsList()
    },
    methods:{
      async getGoodsList(){
        this.isLoading=true
       const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryobj)
       this.isLoading=false
     
       if(res.meta.status !== 200) return uni.$showmsg()
       // console.log(res);
       this.goodslist=[...this.goodslist,...res.message.goods]
       if(this.goodslist.length === 0){
         uni.showToast({
           title:"已无数据",
           icon:"error"
         })
       }
       this.total=res.message.total
      },
      gotoDetail(id){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + id
        })
      }
    },
    onReachBottom() {
     
      if(this.isLoading) return 
      
      if(this.queryobj.pagenum * this.queryobj.pagesize >= this.total) {
        
        return uni.showToast({
          title:'已加载完毕',
          duration:1500
        })
      }else{
        //让页码自增加一
        this.queryobj.pagenum++
        this.getGoodsList()
      }
      
    },
    onPullDownRefresh() {
      // 1. 重置关键数据
      this.queryobj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodslist = []
    
      // 2. 重新发起请求
      this.getGoodsList()
      uni.stopPullDownRefresh()
    }
  }
</script>

<style lang="scss">
  

</style>
