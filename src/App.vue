<template>
  <div id="app">
     <!--<Login/>-->
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login'
import Home from './components/Home'
export default {
  name: 'App',
  components: {
    Login,
    Home
  }
}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
</style>
