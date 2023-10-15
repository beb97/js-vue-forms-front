<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Forms PB"/>
  <PersonList />

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import PersonList from './components/PersonList.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    PersonList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 800px;
  margin: auto;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  width: 200px;
}
</style>
