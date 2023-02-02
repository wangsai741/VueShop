<template>
  <div>
    <!-- 使用三级联动组件--全局注册不用再引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,result) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
// 注册其他组件
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
import {mapState} from 'vuex'

export default {
  name:'',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    // 派发action，获取floor组件的数据
    this.$store.dispatch('getFloorList');
    // // 获取用户信息首页展示，路由守卫中所有路由都能发送请求
    // this.$store.dispatch('getUserInfo');
  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
  }
}
</script>

<style scoped lang = "less">

</style>