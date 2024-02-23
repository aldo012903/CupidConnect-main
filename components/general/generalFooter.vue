<template>
    <footer class="bg-gray-900 text-white py-4">
      <div class="container mx-auto flex justify-between items-center">
        <div>
          <p>&copy; {{ currentYear }} CupidConnect</p>
        </div>
        <div>
          <ul class="flex space-x-4">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    computed: {
      currentYear() {
        return new Date().getFullYear();
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  