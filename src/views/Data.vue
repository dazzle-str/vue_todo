<template>
  <div class="data">
    <van-nav-bar left-text="统计" fixed placeholder></van-nav-bar>

    <div class="container focus">
      <div class="title">累计专注</div>
      <div class="record">
        <div class="content count">
          <div class="subtitle">次数</div>
          <div class="number">{{ count }}</div>
        </div>
        <div class="content total">
          <div class="subtitle">时长</div>
          <div class="number">
            {{ total }}
            <span class="minute">分钟</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container chart" id="count"></div>

    <div class="container chart" id="total"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data () {
    return {
      count: 0,
      total: 0
    }
  },
  methods: {
    getTodo () {
      const db = this.$store.state.app.database()
      const todo = db.collection('todo')
      todo.get().then(res => {
        let count = 0
        let total = 0
        res.data.forEach(element => {
          count += element.count
          total += element.total
        })
        this.count = count
        this.total = total
      })
    },
    async echartsInit () {
      const countData = []
      const totalData = []
      const db = this.$store.state.app.database()
      const todo = db.collection('todo')
      await todo.get().then(res => {
        res.data.forEach(element => {
          const countItem = { value: element.count, name: element.name }
          const totalItem = { value: element.total, name: element.name }
          countData.push(countItem)
          totalData.push(totalItem)
        })
      })
      const countChart = echarts.init(document.getElementById('count'))
      const totalChart = echarts.init(document.getElementById('total'))
      const countOption = {
        title: {
          text: '专注次数分布',
          textStyle: {
            color: '#1989fa',
            fontSize: 12
          }
        },
        series: [
          {
            type: 'pie',
            data: countData
          }
        ]
      }
      const totalOption = {
        title: {
          text: '专注时长分布',
          textStyle: {
            color: '#1989fa',
            fontSize: 12
          }
        },
        series: [
          {
            type: 'pie',
            data: totalData
          }
        ]
      }
      countChart.setOption(countOption)
      totalChart.setOption(totalOption)
    }
  },
  created () {
    this.getTodo()
  },
  mounted () {
    this.echartsInit()
  }
}
</script>

<style lang="less" scoped>
.data {
  color: #1989fa;
  .container {
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    background-color: #ffe;
  }
  .focus {
    text-align: center;
    font-weight: bold;
    .title {
      font-size: 20px;
    }
    .record {
      display: flex;
      .content {
        width: 50%;
        .subtitle {
          margin: 8px 0;
        }
        .number {
          font-size: 32px;
          .minute {
            font-size: 12px;
            font-weight: normal;
          }
        }
      }
    }
  }
  .chart {
    height: 100px;
  }
}
</style>