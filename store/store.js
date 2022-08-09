import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart.js'
import moduleUser from './user.js'

Vue.use(Vuex)

const store =new Vuex.Store({
  modules:{
    // 购物车模块中 cart 数组的访问路径是 m_cart/cart
    'm_cart': moduleCart,
    'm_user': moduleUser,
  }
})

export default store