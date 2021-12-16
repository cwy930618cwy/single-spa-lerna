<template>
  <span id="app1">
    账号中台正在工作
    <div>
      账号中台 年龄
    </div>
    <div>
      点击按钮 总部数据+1
      <button @click="addCount">点击</button>
    </div>
    <div class="color">
      app1样式 黄色
    </div>
    <router-view></router-view>
  </span>
</template>

<script>
// @ is an alias to /src
export default {
  methods: {
    addCount(){
      console.log('增加cout数量---', window.vm)
      window.vm.$emit('addName', 'ls')
    },
  }
}

</script>
<style>
#app1 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.color{
  color: yellow;
}
</style>