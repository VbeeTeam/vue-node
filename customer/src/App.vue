<template>
  <div id="app">
    <!-- <Header title="app" /> -->
    <router-view/>
  </div>
</template>

<script>
// import Header from "@/components/Header.vue";
export default{
  name: "App",
  // components: {
  //   Header,
  // },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  background: url(./assets/img/bg.png) left top;
  background-size: cover;
}

</style>
