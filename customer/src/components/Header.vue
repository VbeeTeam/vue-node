<template>
  <div class="header">
      <h1>{{ title }}</h1>
  </div>
</template>
<script>
export default {
  name: "Header",
  props:["title"]
};
</script>
<style lang="scss">
    .header{
      width: 100%;
      position: fixed;
      left: 0;
      top: 0;
        h1{
            color: #ccc;
            text-align: center;
            padding: 20px 0;
        }
    }
</style>