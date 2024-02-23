<template>
<div class="min-h-screen flex items-center justify-center">
  <h1 class="text-4xl font-bold text-center text-gray-800">Bye, {{ message }}</h1>
</div>

</template>

 

<script>
export default {
  data() {
    return {
      message: 'See you again!'
    };
  },
  mounted() {
    
    setTimeout(() => {
      this.$router.push('/login'); 
    }, 4000);
  },
}
</script>

 

<style scoped>
h1 {
  color: white;
}
</style>