<template>
    <div class="prospect-card">
      <div class="image-container">
        <img :src="prospect.image" alt="Profile Picture" class="profile-image" />
      </div>
      <div class="text-overlay">
        <h2 class="name">{{ prospect.name }}</h2>
        <p class="age">{{ prospect.age }}</p>
        <p class="description">{{ prospect.description }}</p>
        <ul>
          <li v-for="(interest, i) in prospect.interests" :key="i">{{ interest }}</li>
        </ul>
      </div>
      <div class="banner"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      prospect: Object,
    },
  };
  </script>
  
  <style scoped>
  .prospect-card {
    position: relative;
    width: 300px; /* Adjust the width as needed */
    height: 400px; /* Adjust the height as needed */
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    color: white;
  }
  
  .image-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7; /* Adjust the opacity as needed */
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .text-overlay {
    position: relative;
    z-index: 1;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
  }
  
  .name {
    font-size: 24px;
    margin: 0;
  }
  
  .age {
    font-size: 16px;
    margin: 5px 0;
  }
  
  .description {
    font-size: 16px;
    margin: 5px 0;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  
  .banner {
    height: 30px; /* Adjust the banner height as needed */
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #000 100%);
    border-radius: 0 0 10px 10px;
  }
  </style>
  