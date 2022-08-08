<template>
  <view class="my-search-container" @click="searchBox">
    <view class="my-search-box">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="playholder">搜索</text>
    </view>
    
  </view>
</template>
<script>
  export default{
    methods:{
      searchBox(){
        this.$emit('searchFa')
      }
    }
  }
</script>
<style lang="scss">
  .my-search-container{
    height: 50px;
    
    background-color: #C00000;
    display: flex;
    align-items: center;
    padding:0 10px;
    
    
    .my-search-box{
      display: flex;
      justify-content: center;
      align-items: center;
      
      width: 100%;
      height: 34px;
      background-color: #ffffff;
      border-radius: 18px;
      .playholder{
        font-size: 15px;
        margin-left:5px ;
      }
    }
  }
</style>
