<template>
  <div id="app">
    <!-- 使用 -->
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    //注册
    Header,
    Footer,
  },
  mounted(){
    // 通知vuex发请求，获取数据，存储在仓库，在这里请求数据，只执行一次
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>

</style>
