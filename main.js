
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
import mySearch from '@/uni_modules/my-search/components/my-search/my-search.vue'
import store from "@/store/store.js"
Vue.use(mySearch)

uni.$http=$http
//请求拦截器
$http.beforeRequest = function(options){
  uni.showLoading({
    title:"数据加载中"
  })
}
//响应拦截器
$http.afterRequest = function () {
  uni.hideLoading()
}
//基地址
$http.baseUrl="https://api-ugo-web.itheima.net"

//全局请求失败的方法
uni.$showmsg=function(title="数据请求失败",duration=1500){
  uni.showToast({
    title,
    duration,
    icon:"none"
  })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif