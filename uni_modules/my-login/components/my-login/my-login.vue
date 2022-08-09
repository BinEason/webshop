<template>
   <view class="login-container">
      <!-- 提示登录的图标 -->
      <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
      <!-- 登录按钮 -->
      <button type="primary" class="btn-login" open-type="getUserInfo"  @getuserinfo="getUserInfo">一键登录</button>
      <!-- 登录提示 -->
      <view class="tips-text">登录后尽享更多权益</view>
    </view>
</template>
<script>
   import { mapMutations,mapState } from 'vuex'
  export default{
   
    data(){
      return{}
    },
    methods:{
      ...mapMutations('m_user', ['updateUserInfo','updateToken','updateRedirectInfo']),
      navigateBack() {
        // redirectInfo 不为 null，并且导航方式为 switchTab
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          // 调用小程序提供的 uni.switchTab() API 进行页面的导航
          uni.switchTab({
            // 要导航到的页面地址
            url: this.redirectInfo.from,
            // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      },
      getUserInfo(e){
        if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showmsg('您取消了登录授权！')
        console.log(e);
        this.updateUserInfo(e.detail.userInfo)
        this.getToken(e.detail)
      },
      getToken(info) {
        this.updateToken('Bear cgbcgbcgb')
        if (!this.token) return uni.$showmsg('登录失败！')
        
        uni.$showmsg('登录成功')
        this.navigateBack()
      //   // 调用微信登录接口
      //   const [err, res] = await uni.login().catch(err => err)
      //   // console.log(res);
      //   // 判断是否 uni.login() 调用失败
      //   if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
      
      //   // 准备参数对象
      //   const query = {
      //     code: res.code,
      //     encryptedData: info.encryptedData,
      //     iv: info.iv,
      //     rawData: info.rawData,
      //     signature: info.signature
      //   }
      
      //   // 换取 token
      //   const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
      //   if (loginResult.meta.status !== 200) return uni.$showmsg('登录失败！')
        
      //   uni.$showmsg('登录成功')
      }
    },
    computed:{
      ...mapState('m_user', ['token','redirectInfo']),
      
    }
  }
</script>
<style lang="scss">
  .login-container{
    height: 750rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f8f8f8;
      position: relative;
      overflow: hidden;
      
        
      
      .btn-login {
          width: 90%;
          border-radius: 100px;
          margin: 15px 0;
          background-color: #c00000;
        }
        .tips-text {
            font-size: 12px;
            color: gray;
          }
    
  }
</style>
