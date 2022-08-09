<template>
  <view>
    <view class="search-box">
      <uni-search-bar  @input="input" cancelButton="none" clearButton="always"></uni-search-bar>
    </view>
    <!-- 搜索列表 -->
    <view class="suggest-list" v-if="searchList.length !== 0">
      <view class="suggest-item" v-for="(item,i) in searchList" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="17"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题 -->
      <view class="his-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clearFn"></uni-icons>
        
      </view>
      <!-- 列表 -->
      <view class="his-list">
        <uni-tag :text="item" type="error" v-for="(item,i) in history" :key="i" @click="gotoList(item)"></uni-tag>
        
   </view>
 
    </view>
   
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer:null,
        kw:'',
        searchList:[],
        historyList:[]
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || [])
    },
    
    methods:{
      input(e){
        clearTimeout(this.timer)
        this.timer=setTimeout(()=>{
          this.kw=e
         
          this.getSearchList()
        },500)
      },
      async getSearchList(){
        // console.log(this.kw);
        if(this.kw.length === 0) {
          this.searchList=[]
          return
        } 
        const {data:res} = await uni.$http.get("/api/public/v1/goods/qsearch",{query:this.kw})
        if(res.meta.status !== 200) return uni.$showmsg()
        this.searchList = res.message
        this.saveKey()
        if(this.searchList.length === 0) return uni.showToast({
          title:"没找到结果",
          duration:1500,
          icon:"error"
        })
      },
      gotoDetail(id){
      uni.navigateTo({
        url:"/subpkg/goods_detail/goods_detail?goods_id=" + id
      })
        
      },
      saveKey(){
        // this.historyList.unshift(this.kw)
        const set =new Set(this.historyList)
        // 防止顺序乱
        set.delete(this.kw)
        set.add(this.kw)
        
        this.historyList =Array.from(set)
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      clearFn(){
        this.historyList=[]
        uni.setStorageSync('kw',[])
      },
      gotoList(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + item
        })
      }
    },
    computed:{
      history(){
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
.search-box{
  position: sticky;
  top: 0;
  z-index: 999;
}
.suggest-list{
  padding: 0 5px;
  .suggest-item{
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    
    .goods-name{
      //溢出隐藏
      overflow: hidden;
      //文字不允许换行
      white-space: nowrap;
      //文字溢出后用...代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box{
  padding: 0 5px;
  .his-title{
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    border-bottom: 1px solid #efefef;
  }
  .his-list{
    display: flex;
    flex-wrap: wrap;
    .uni-tag{
      margin-top: 5px;
      margin-right: 5px;
      border-radius: 10px;
    }
  }
}
</style>
