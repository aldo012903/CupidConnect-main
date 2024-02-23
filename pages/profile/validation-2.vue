<template>
  <div class="h-full  w-full  text-white bg-black min-w-screen">
    <div class="flex justify-center items-center logoEdit">
        <h2><img src="@/assets/logoCupid.svg" alt="frameIcon" /></h2>
      </div>

    <div class="grid grid-rows grid-flow-col gap-4 mx-10 sm:mx-30 lg:mx-40 ">
      <div class=" ">
        <form @submit.prevent="submitFormIdentity">
          <div  class="p-8">
            <label class="relative block">
              <span class="block text-2xl sm:text-m lg:text-5xl">How do you <b>identify</b>?</span>
              <div class="relative flex flex-col lg:flex-row items-baseline  w-full  md:8/12 lg:w-10/12  pt-12">
                <label class="block text-2xl  lg:text-5xl  pr-5"><b>I am: </b></label>
                <select :filterable="true" class="origin-bottom text-2xl lg:text-3xl p-4 w-full  md:6/12 lg:w-8/12  form-input rounded-3xl bg-black border border-gray pl-10 custom-scrollbar-container" type="text" name="description" v-model="selectedIdentity" required>
                  <option value="" disabled selected>Select your identity</option>
                  <option v-for="identity in identitiesData" :key="identity._id" :value="identity._id" white>
                    {{ identity.name }}
                  </option>
                </select>
              </div>
            </label>
          </div>
          <div class="lg:mt-4 text-right pr-10 xl:pr-52">
            <button  type="submit" class="mb-10">
              <i class="fa-solid fa-arrow-right  fa-2x"></i>
            </button>
          </div>
          <!-- error -->
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
          identitiesData : [],
          selectedIdentity : '',
          error : '',
    };

  },
  mounted() {
      
      if(!localStorage.getItem('CupidConnectToken')){

          this.$router.push('/');

      }
      this._username = localStorage.getItem('CupidConnectuser');
      this.fetchIdentities();

  },
  methods: {


    async submitFormIdentity() {

      if(this.verify()){

        const _userId = localStorage.getItem('CupidConnectId'); 
        const token = localStorage.getItem('CupidConnectToken'); //para verificar id 
        //debugger;
          const dataf = {
              userId: _userId,
              newIdentity: this.selectedIdentity,

          };

          const response = await axios.post('https://espacionebula.com:8000/change-identity-user', dataf, {

              headers: {

                  'Access-Control-Allow-Origin': '*',
                  'Authorization': `Bearer ${token}`,

              },
              mode: 'cors',

          });
          
          //console.log(response); //debugger;
          if (response.data.success) {

            this.$router.push('./validation-3'); 

          } else {
              this.error = "There was an error with your identity : "+response.data.error;
              console.log("There was an error with your identity : "+response.data.error);
                this.clearErrorMessageAfterDelay();
            }

        }

},

    verify() {
      
        
        if (!this.selectedIdentity) {
          this.error= 'Please select an identity';
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

  async fetchIdentities() {
        
        try {
          
            const response = await axios.get('https://espacionebula.com:8000/get-identities', {

                headers: {

                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'multipart/form-data',
                  
                },
                mode: 'cors',

            });
          
            this.identitiesData = response.data.identities; //debugger;
            
            if (this.identitiesData.length > 0) { //debugger;
              this.selectedIdentity = ''; //para que el axios no se coma el option 1 
            }
            
          
        } catch (error) {

            console.error('Error in fetchIdentities:', error);

        }

    },

},

};

</script>