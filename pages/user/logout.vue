<template>
  <div>
    <h1>Hello, {{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'you have logged out'
    };
  }
}
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
