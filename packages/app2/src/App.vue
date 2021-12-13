<template>
  <div id="app2">
    App 2
      <div class="color">
      app1样式 红色
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
#app2 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.color{
  color: red;
}
</style>
