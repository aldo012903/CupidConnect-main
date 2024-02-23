<template>
    <div class="container mx-auto mt-4">
  <div class="grid grid-cols-12 gap-5">

    <div id="Logo" class="col-span-12 md:col-span-7 bg-black-200 p-4 flex justify-center">
      <h2 class="text-xl font-semibold"><img src="@/assets/logoCupid.svg" alt="frameIcon" /></h2>
    </div>

    <div id="content" class="col-span-12 bg-black p-4 lg:border-l white h-full md:col-span-5 md:border-l">
      <h2 id="Register" class="text-xl font-semibold text-white flex flex-col justify-center items-center">Register</h2>


        <form class="mt-8 md:mt-8 md:pr-20% text-white">
        <div id="welcomeText" class="mb-4 align-items center">
          <p>Welcome to the <b>community</b>! <br> Please verify your <b>email</b> to <br>  start connecting.</p>
        </div>
  


        <div id="btnLogin" class="flex justify-center items-center mb-4">
          <label class="cursor-pointer">
            <button  type="submit" class="bg-black-200 text-white flex items-center">
              <img src="@/public/img/arrow-left.png" alt="arrowIcon" class="mx-2" />
              Log in  
            </button>
          </label>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<style scoped>
  strong, b {
    font-weight: bold;
  }
</style>

<style>
    #welcomeText{
      margin-top: 10%;
      font-size: 2em;
      text-align: center;
    }
    #content{
      margin-left: 5%;
      @screen lg {
      margin-left: 23%;
  }
    }

    div{
      line-height: 1em; 
      background-color: black;
    }


    #Register{
    padding-top: 3em;
    font-size: 5em;
    font-family: 'Lovers Quarrel', serif;
    font-weight: normal;
  }
    
    #btnLogin{
      display: flex; 
      flex-direction: column; 
      align-items: center; 
      justify-content: center;
      font-size: 4em; 
      margin-top: 65%;
      margin-left: 1.5em;
      font-family: 'Lovers Quarrel', serif;
      font-weight: normal;
      margin-inline-start: 3%;
    }

    input{
      background-color: black;
    }
    input::placeholder{
        color: white;
        font-size: 1.5em;
    }

</style>

  
  <script>

  import axios from 'axios';
  import Swal from 'sweetalert2'
  
  export default {
    data() {
      return {
        
      };
    },
    mounted() {
      
    },
    methods: {
      
      async submitForm() {

        
      },

    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 480px;
    margin: 0 auto;
  }
  
  </style>
  