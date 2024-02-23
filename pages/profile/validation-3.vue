<template>
  <div class="h-full  w-full  text-white bg-black min-w-screen">
    <div class="flex justify-center items-center logoEdit">
        <h2><img src="@/assets/logoCupid.svg" alt="frameIcon" /></h2>
      </div>

    <div class="grid grid-rows grid-flow-col gap-4 mx-10 sm:mx-40 lg:mx-60 ">
      <div class="">
        <form @submit.prevent="submitFormOrientation">
          <div  class="p-8">
            <label class="">
              <span class="block text-2xl sm:text-m lg:text-5xl lg:pl-25 xl:px-28  lg:pt-18">Please provide us with your <b>orientation</b>.</span>
              <div class="block w-full w-full  md:8/12  xl:pl-32 pt-12">
                <label class="block lg:text-3xl lg:pr-12 lg:pt-18 pt-12">Select an option</label>
                <select :filterable="true" class="text-2xl lg:text-3xl p-4 w-full  md:6/12 lg:w-8/12  form-input rounded-3xl bg-black border border-gray pl-10 custom-scrollbar-container" type="text" v-model="selectedOrientation" required>
                  <option value="" disabled selected>Select your orientation</option>
                  <option v-for="orientation in orientationData" :key="orientation._id" :value="orientation._id" white>
                    {{ orientation.name }}
                  </option>
                </select>
              </div>
            </label>
          </div>
          <div class="lg:mt-4 text-right pr-10 xl:pr-52">
            <button type="submit" class="mb-10">
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
          orientationData : [],
          selectedOrientation : null,
          error : '',
    };

  },
  mounted() {
      
      if(!localStorage.getItem('CupidConnectToken')){

          this.$router.push('/');

      }
      this._username = localStorage.getItem('CupidConnectuser');
      this.fetchOrientations();

  },
  methods: {

    verify() {
      
        
      if (!this.selectedOrientation) {
            this.error = 'Please select an orientation';
            return false;
      }
      
        this.error = '';
        return true;
  },
  async submitFormOrientation() { 

    if(this.verify()){

      const _userId = localStorage.getItem('CupidConnectId'); 
      const token = localStorage.getItem('CupidConnectToken'); //para verificar id 
      //debugger;
        const dataf = {
            userId: _userId,
            newOrientations: this.selectedOrientation,

        };

        const response = await axios.post('https://espacionebula.com:8000/change-orientation-user', dataf, {

            headers: {

                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`,

            },
            mode: 'cors',

        });
        
        //console.log(response); debugger;
        if (response.data.success) {
        
          this.$router.push('./validation-4'); 

      } else {
          this.error= "There was an error updating your orientation : "+response.data.error;
          console.log("There was an error updating your orientation : "+response.data.error);
          this.clearErrorMessageAfterDelay();
      }

    }

},

  clearErrorMessageAfterDelay() {
      
      setTimeout(() => {
          this.error = "";
      }, 5000);
  },

  async fetchOrientations() {

    try {
      
        const response = await axios.get('https://espacionebula.com:8000/get-orientations', {

            headers: {

              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'multipart/form-data',
              
            },
            mode: 'cors',

        });
      
        this.orientationData = response.data.orientations; //debugger;
        
        if (this.orientationData.length > 0) { //debugger;
          this.selectedOrientation = ''; //para que el axios no se coma el option 1 
        }

        

      
    } catch (error) {

        console.error('Error in fetchOrientations:', error);

    }

},

},

};

</script>