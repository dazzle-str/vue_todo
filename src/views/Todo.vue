<template>
  <div class="todo">
    <van-nav-bar left-text="待办" fixed placeholder @click-right="showDialog = true">
      <template #right>
        <van-icon name="plus" size="18" />
      </template>
    </van-nav-bar>

    <van-cell-group inset v-for="item in todoList" :key="item._id">
      <van-swipe-cell>
        <template #left>
          <van-button square type="primary" text="编辑" @click="editTodo(item._id)" />
        </template>
        <van-cell center :title="item.name" :value="item.count === 0 ? '开始' : '已专注' + item.count + '次'" :label="item.time + '分钟'" @click="link(item._id, item.time)" />
        <template #right>
          <van-button square type="danger" text="删除" @click="removeTodo(item._id)" />
        </template>
      </van-swipe-cell>
    </van-cell-group>

    <van-dialog v-model="showDialog" :title="update ? '编辑待办' : '添加待办'" show-cancel-button :before-close="beforeClose" @closed="reset" @confirm="submit">
      <van-form ref="todoFormRef" @submit="setTodo">
        <van-field v-model="todoForm.name" label="待办名称" placeholder="请输入待办名称" :rules="[{ required: true }]" />
        <van-field v-model="todoForm.time" type="digit" label="专注时间" placeholder="输入专注分钟数" :rules="[{ required: true }]" />
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      todoList: [],
      showDialog: false,
      todoForm: {
        name: '',
        time: '',
        count: 0,
        total: 0
      },
      update: false
    }
  },
  methods: {
    getTodo () {
      const db = this.$store.state.app.database()
      const todo = db.collection('todo')
      todo.get().then(res => {
        this.todoList = res.data
      })
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        done(false)
      } else {
        done()
      }
    },
    reset () {
      Object.assign(this.$data.todoForm, this.$options.data(this).todoForm)
      this.$refs.todoFormRef.resetValidation()
      this.update = false
    },
    submit () {
      this.$refs.todoFormRef.submit()
    },
    setTodo () {
      const db = this.$store.state.app.database()
      const todo = db.collection('todo')
      if (this.update) {
        todo.doc(this.todoForm._id).update({
          name: this.todoForm.name,
          time: this.todoForm.time
        }).then(() => {
          this.$toast({
            message: '编辑成功',
            position: 'top'
          })
          this.showDialog = false
          this.getTodo()
        })
      } else {
        todo.add(this.todoForm).then(() => {
          this.$toast({
            message: '添加成功',
            position: 'top'
          })
          this.showDialog = false
          this.getTodo()
        })
      }
    },
    editTodo (id) {
      this.update = true
      const db = this.$store.state.app.database()
      const todo = db.collection('todo')
      todo.doc(id).get().then(res => {
        this.todoForm = res.data[0]
        this.showDialog = true
      })
    },
    removeTodo (id) {
      this.$dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        const db = this.$store.state.app.database()
        const todo = db.collection('todo')
        todo.doc(id).remove().then(() => {
          this.$toast({
            message: '删除成功',
            position: 'top'
          })
          this.getTodo()
        })
      }).catch(() => {})
    },
    link (id, time) {
      this.$router.push(`/time/${id}/${time}`)
    }
  },
  created () {
    this.getTodo()
  }
}
</script>

<style lang="less" scoped>
.van-cell-group {
  margin: 16px;
  .van-swipe-cell {
    .van-cell {
      background-color: #ffe;
    }
    .van-button {
      height: 100%;
    }
  }
}
</style>
