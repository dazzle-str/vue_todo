<template>
  <div class="time">
    <h4>待办名称</h4>
    <van-circle v-model="currentRate" :rate="40" :speed="100" text="00:24" layer-color="#ebedf0" />
    <div>进行中</div>
    <van-grid clickable :border="false">
      <van-grid-item icon="play-circle-o" />
      <van-grid-item icon="pause-circle-o" />
      <van-grid-item icon="stop-circle-o" />
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRate: 0
    }
  }
}
</script>

<style lang="less">
.time {
  height: 100vh;
  color: #666;
  background-color: #ffe;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .van-grid-item {
    .van-grid-item__content {
      background-color: #ffe;
    }
    &:first-child {
      color: #ccc;
    }
  }
}
</style>
