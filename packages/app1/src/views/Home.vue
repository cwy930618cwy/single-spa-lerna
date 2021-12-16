<template>
  <div class="home">
    <div class="text">
      home
    </div>
      <el-button icon="el-icon-question" type="primary" >
      Show Guide
    </el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
<style scoped>
.home {
  color: rebeccapurple;
}
.text {
  color: green;
}
</style>
