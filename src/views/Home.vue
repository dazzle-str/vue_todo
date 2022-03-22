<template>
  <div class="home">
    <router-view></router-view>

    <van-tabbar route placeholder safe-area-inset-bottom>
      <van-tabbar-item icon="todo-list-o" replace to="/todo">待办</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o" replace to="/data">统计</van-tabbar-item>
      <van-tabbar-item icon="user-o" replace to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
