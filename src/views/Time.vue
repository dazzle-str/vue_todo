<template>
  <div class="time">
    <h4>待办名称</h4>

    <div class="count">
      <van-circle v-model="currentRate" :rate="rate" :speed="speed" layer-color="#ebedf0" />

      <van-count-down ref="countDown" :time="this.time * 60 * 1000" format="mm:ss" @finish="finish" />
    </div>

    <div>{{ status }}</div>

    <div class="control">
      <van-button round icon="play-circle-o" :disabled="!disabled" @click="start" />
      <van-button round icon="pause-circle-o" :disabled="disabled" @click="pause" />
      <van-button round icon="stop-circle-o" @click="stop" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
    time: {}
  },
  data () {
    return {
      currentRate: 100,
      rate: 0,
      disabled: false,
      status: '进行中'
    }
  },
  methods: {
    start () {
      this.$refs.countDown.start()
      this.disabled = !this.disabled
      this.rate = 0
      this.status = '进行中'
    },
    pause () {
      this.$refs.countDown.pause()
      this.disabled = !this.disabled
      this.rate = this.currentRate
      this.status = '暂停中'
    },
    stop () {
      this.$dialog.confirm({
        message: '确定结束吗？'
      }).then(() => {
        this.$router.push('/todo')
      }).catch(() => {})
    },
    finish () {
      this.$toast({
        message: '专注时间结束',
        position: 'top'
      })
      this.status = '已完成'
      const db = this.$store.state.app.database()
      const todo = db.collection('todo')
      const _ = db.command
      todo.doc(this.id).update({
        count: _.inc(1),
        total: _.inc(Number(this.time))
      })
      window.setTimeout(() => {
        this.$router.push('/todo')
      }, 1000)
    }
  },
  computed: {
    speed () {
      return 100 / 60 / this.time
    }
  }
}
</script>

<style lang="less" scoped>
.time {
  height: 100vh;
  color: #666;
  background-color: #ffe;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .count {
    position: relative;
    .van-count-down {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .control {
    width: 50%;
    display: flex;
    justify-content: space-between;
    .van-button {
      color: inherit;
      background-color: transparent;
      border: 0;
      padding: 0;
      height: 42px;
      line-height: 1;
      .van-button__icon {
        font-size: 3em;
      }
    }
  }
}
</style>
