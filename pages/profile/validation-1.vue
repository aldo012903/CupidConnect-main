<template>
    <div class="h-full  w-full  text-white bg-black min-w-screen">
      <div class="flex justify-center items-center logoEdit">
          <h2><img src="@/assets/logoCupid.svg" alt="frameIcon" /></h2>
        </div>
  
      <div class="grid grid-rows-1 grid-flow-col gap-4 mx-10 sm:mx-40 lg:mx-60 ">
        <div class="white">
          <form @submit.prevent="submitFormDescription">
            <div class="p-8">
              <label>
                <span class="block text-2xl sm:text-m lg:text-5xl">Hello <b>{{_username}},</b><br>let's complete your profile!</span>
                <span class="block text-right lg:text-2xl lg:pr-12 lg:pt-18 pt-12">First provide us a quick <b>description</b> of<br>yourself:</span>
                <textarea rows="4" cols="50" class="text-lg p-4 leading-6  p-10 w-full block form-input border-black-300 rounded-3xl mt-5 bg-black border border-gray" type="text" 
                id="" name="description" v-model="description" required></textarea>
              </label>
            </div>
            <div class="lg:mt-4 mb-10 text-right pr-10">
              <button type="submit" >
                <i class="fa-solid fa-arrow-right  fa-2x"></i>
              </button>
            </div>
            <div v-if="error" class="text-red-500 text-center my-4">
              {{ error }}
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
   
    .logoEdit {
   
    width: 7.5em;
    height: 7em;
    margin-left: 20%;


      @screen md {
        width: 10em;
        height: 10em;
        margin-left: 60%;

      }

      @screen lg {
        margin-left: 40%;
        width: 8em;
        height: 8em;
      }
      
      @screen xl {
        margin-left: 45%;
        width: 15em;
        height: 15em;
        
      }

  }

   

</style>



<script>

import axios from 'axios';
  
  export default {

    data() {

        return {
            _username : '',
            description : '',
            error : '',
      };

    },
    mounted() {
        
        if(!localStorage.getItem('CupidConnectToken')){

            this.$router.push('/');

        }
        this._username = localStorage.getItem('CupidConnectuser');

    },
    methods: {


        async submitFormDescription() {
          

          if(this.verify()){ 

              const _userId = localStorage.getItem('CupidConnectId'); 
              const token = localStorage.getItem('CupidConnectToken');

              const dataf = {

                userId: _userId,
                newDescriptions: this.description, 

              };

              const response = await axios.post('https://espacionebula.com:8000/change-description-user', dataf, {

               headers: {

                      'Access-Control-Allow-Origin': '*',
                      'Authorization': `Bearer ${token}`,

                  },
                  mode: 'cors',

              });
               if(response.data.success){

                this.$router.push('./validation-2');

          }else{

              this.error = "There was an error with the description: "+response.data.error;
              console.log("There was an error with the description: "+response.data.error);
              this.clearErrorMessageAfterDelay();

          }
      
      }
    },

    verify() {
      const descriptionRegex = /^[a-zA-Z0-9\s]{1,100}$/;
      
      if (!descriptionRegex.test(this.description)) {
        this.error = 'The description cannot be more than 100 alphanumeric characters and differents signs!';
        return false;
      }

      this.error = '';
      return true;
    },

    clearErrorMessageAfterDelay() {
      
      setTimeout(() => {
          this.error = "";
      }, 5000);
  },

},

};

</script>