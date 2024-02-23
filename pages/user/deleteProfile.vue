<link href="https://fonts.googleapis.com/css2?family=Lovers+Quarrel&display=swap" rel="stylesheet">

<template>
  <div class=" grid col-4 flex items-center justify-center h-screen  text-white">
    
        <div class="white mx-40 text-5xl lg:text-9xl">

            <h1>Delete Profile</h1>

        </div>

        <div class="mx-40 lg:mx-72  md:text-md lg:text-lg">

            <label>

                <span class="block font-medium"> Please to delete enter username: </span>

                <input class="form-input border-black-300  mt-3 bg-black border border-gray"
                type="text" id="username" name="username" placeholder="Username" v-model="username" required>

            </label>

        </div>

        <div class="w-32 mx-40 lg:mx-80  font-medium hover:bg-gray-700 p-5 text-lg flex justify-center border border-white p-5">

            <button @click="deleteMessage"> Delete </button>

        </div>

        <!-- error -->
        <div v-if="error" class="text-red-500 text-center my-4">
          {{ error }}
        </div>
    
    </div>

</template>

<script>
import { useUserStore } from '../../stores/users'
import axios from 'axios';

    export default {

        data() {

            return {

              username : '',
              error : '',
              userData : useUserStore(),

            };

        },
        mounted() {
          
            if(!localStorage.getItem('CupidConnectToken')){

                this.$router.push('/login');

            }

        },
        methods: {

            async deleteMessage(){

                if(this.verify()){

                    const _userId = localStorage.getItem('CupidConnectId'); 
                    const token = localStorage.getItem('CupidConnectToken'); 
                    const dataf = {

                        userId: _userId,

                    };

                    const response = await axios.post('https://espacionebula.com:8000/delete-user', dataf, {

                        headers: {

                            'Access-Control-Allow-Origin': '*',
                            'Authorization': `Bearer ${token}`,

                        },
                        mode: 'cors',

                    });
                    //debugger;
                    if(response.data.success){

                        this.userData.logOutUser();
                        this.$router.push('/delete');

                    }else{

                        this.error = response.data.error;
                        console.log(response.data.error);
                        this.clearErrorMessageAfterDelay();

                    }

                }else{

                    this.clearErrorMessageAfterDelay();

                }
                

            },
            verify(){

                if(!this.username){

                    this.error = "Please write your username";
                    console.log("Please write your username");
                    return false;

                }

                if(this.username.length < 10){

                    this.error = "Your username must have at least 10 characters";
                    console.log("Your username must have at least 10 characters");
                    return false;

                }

                if(this.username != localStorage.getItem('CupidConnectuser')){

                    this.error = "Error "+this.username+" is not your user name";
                    console.log("Error "+this.username+" is not your user name");
                    return false;

                }

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

<style scoped>

  h1 {

        font-family: 'Lovers Quarrel', serif;

    }


</style>
