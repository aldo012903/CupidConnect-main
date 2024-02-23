<template>

    <div class="container mx-auto mt-4">

        <div class="grid grid-cols-12 gap-5">

            <div id="Logo" class="col-span-12 md:col-span-7 bg-black-200 p-4 flex justify-center">

                <h2 class="text-xl font-semibold"><img src="@/assets/logoCupid.svg" alt="frameIcon" /></h2>

            </div>

            <div id="content" class="col-span-12 bg-black p-4 lg:border-l white h-full md:col-span-5 md:border-l">

                <h2 id="Register" class="text-xl font-semibold text-white flex flex-col justify-center items-center">Register</h2>


                <form class="mt-8 md:mt-8 md:pr-20% text-white" @submit.prevent="submitForm">

                    <div class="mb-8 grid grid-cols-12 items-center relative">

                        
                        <select v-model="selectedCountry" :filterable="true" class="form-input mt-1 col-span-10 block border-black-300 border-b white lg:text-2xl" @change="handleSelectChange" required>
                          <option value="" disabled selected>Select a country</option>
                          <option v-for="country in countriesData" :key="country._id" :value="country._id" white>
                            {{ country._name }}
                          </option>
                        </select>
                        <img src="@/public/img/arrow-down.png" alt="calendarImg" class="col-span-2 mb-2 h-8 w-8"/>

                    </div>
          
                    <div class="mb-8 grid grid-cols-12 items-center relative">

                        <select v-model="selectedProvince" :filterable="true" class="form-input mt-1 col-span-10 block border-black-300 border-b white lg:text-2xl" @change="handleSelectProvinceChange" required>
                          <option value="" disabled selected>Select a province</option>
                          <option v-for="province in provincesData" :key="province._id" :value="province._id" white>
                            {{ province.name }}
                          </option>
                        </select>
                        <img src="@/public/img/arrow-down.png" alt="calendarImg" class="col-span-2 mb-2 h-8 w-8"/>

                    </div>

                    <div class="mb-8 grid grid-cols-12 items-center relative">

                       <select v-model="selectedCity" :filterable="true" class="form-input mt-1 col-span-10 block border-black-300 border-b white lg:text-2xl"   required>
                          <option value="" disabled selected>Select a city</option>
                          <option v-for="city in citiesData" :key="city._id" :value="city._id" white>
                            {{ city.name }}
                          </option>
                        </select>
                        <img src="@/public/img/arrow-down.png" alt="calendarImg" class="col-span-2 mb-2 h-8 w-8"/>

                    </div>

                    <div class="mb-8">

                        <input type="text" id="address" name="address" class="form-input mt-1 block w-10/12 border-black-300 border-b white" placeholder="Address" v-model="address" minlength="8" required>    

                    </div>
                

                    <div  class="mt-75%">

                        

                        <button class="ml-[60%] lg:ml-[67%] text-3xl" type="submit">

                            Finish

                        </button>

                    </div>
            
                    <!-- error -->
                    <div v-if="error" class="text-red-500 text-center my-4">
                      {{ error }}
                    </div>

                </form>


                <div id="btnLogin" class="flex justify-center items-center mb-4">

                    <label class="cursor-pointer">

                        <button  type="submit" class="bg-black-200 text-white flex items-center">

                            <img src="@/public/img/arrow-left.png" alt="arrowIcon" class="mx-2" />
                            <nuxt-link class="btn" to="/Login">Login</nuxt-link>

                        </button>

                    </label>

                </div>

            </div>

        </div>

    </div>

</template>


<style>

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
    .btn{
        font-family: 'Lovers Quarrel', serif;
    }

    icon {

        font-size: 24px;
        color: white;

    }

    #Register{

        padding-top: 1.5em;
        font-size: 5em;
        font-family: 'Lovers Quarrel', serif;
        font-weight: normal;

    }

    #btnFinish{

        margin-left: 65%;
        font-size: 2em;

    }
    
    #btnLogin{

        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: center;
        font-size: 4em; 
        margin-top: 47%;
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

    select{

        background-color: black;

    }

    select::placeholder{

        color: white;
        font-size: 1.5em;

    }

</style>

  
  <script>
    import { defineComponent, ref} from 'vue';
    import axios from 'axios';
    import { useUserStore } from '../../../stores/users'
    import Swal from 'sweetalert2'
  
    export default {

        data() {

            return {
            
                data : null,
                countriesData : [],
                selectedCountry: null,
                provincesData : [],
                selectedProvince: null,
                citiesData : [],
                selectedCity: null,
                address : '',
                error : '',
                userData : useUserStore(),

            };

        },
    created() {

    },
    mounted() {

        if(localStorage.getItem('CupidConnectToken')){

            this.$router.push('/home');

        }   

        
        
        if (localStorage.getItem('CupidConnectFirstRegisterData')) {
            
            this.data = JSON.parse(localStorage.getItem('CupidConnectFirstRegisterData'));

        } 

        this.fetchCountries();
      
    },
    methods: {
      
        async submitForm() {

            if(this.verify()){

                const dataf = {
                    _email: this.data._email,
                    _username: this.data._username,
                    _fname: this.data._fname,
                    _lname: this.data._lname,                    
                    _password: this.data._password,
                    country : this.selectedCountry,
                    province : this.selectedProvince,
                    city : this.selectedCity,
                    _address : this.address,                    
                    _dob: this.data._dob

                };

                const response = await axios.post('https://espacionebula.com:8000/create-user', dataf, {

                    headers: {

                        'Access-Control-Allow-Origin': '*',

                    },
                    mode: 'cors',

                });
                
                //console.log(response); debugger;
                if(response.data.success){
                    //debugger; 
                    localStorage.setItem('CupidConnectToken', response.data.token);
                    localStorage.setItem('CupidConnectEmail', response.data.user._email);
                    localStorage.setItem('CupidConnectuser', response.data.user._username);
                    localStorage.setItem('CupidConnectType', response.data.user._type);
                    localStorage.setItem('CupidConnectId', response.data.user._id);
                    this.userData.setEmail(localStorage.getItem('CupidConnectEmail'));
                    this.userData.setuser(localStorage.getItem('CupidConnectuser'));

                    localStorage.removeItem('CupidConnectFirstRegisterData');
                    this.$router.push('/profile/validation-1');

                }else{

                    this.error = "There was an error creating user : "+response.data.error;
                    console.log("There was an error creating user : "+response.data.error);
                    this.clearErrorMessageAfterDelay();

                }

            }

        },
        async fetchCountries() {

            try {
              
                const response = await axios.get('https://espacionebula.com:8000/get-countries', {

                    headers: {

                      'Access-Control-Allow-Origin': '*',
                      'Content-Type': 'multipart/form-data',
                      
                    },
                    mode: 'cors',

                });
              
                this.countriesData = response.data.countries; //debugger;

                if (this.countriesData.length > 0) {
                  this.selectedCountry = '';
                  this.selectedProvince = '';
                  this.selectedCity = '';
                }
              
            } catch (error) {

                console.error('Error in fetchCountries:', error);

            }

        },
        verify(){

            if (!this.selectedCountry){

                this.error = "Please select a country";
                console.log("Please select a country");
                return false;

            }

            if(!this.selectedProvince){

                this.error = "Please select a province";
                console.log("Please select a province");
                return false;

            }

            if(!this.selectedCity){

                this.error = "Please select a city";
                console.log("Please select a city");
                return false;

            }

            if(!this.address){

                this.error = "Please write your address";
                console.log("Please write your address");
                return false;

            }

            if(this.address.length < 8){

                this.error = "Your address must have at least 8 characters";
                console.log("Your address must have at least 8 characters");
                return false;

            }

            return true;

        },
        clearErrorMessageAfterDelay() {
      
            setTimeout(() => {
                this.error = "";
            }, 5000);
        },

        async handleSelectChange() {

            this.provincesData = [];
          
            if (this.selectedCountry !== '') {
                
                try {

                    
                    const dataf = {

                        country_id: this.selectedCountry,

                    };

                    //console.log(this.selectedCountry);

                    const response = await axios.post('https://espacionebula.com:8000/get-province-by-country', dataf, {

                        headers: {

                            'Access-Control-Allow-Origin': '*',

                        },
                        mode: 'cors',

                    });

                    //console.log(response); debugger;
                    this.provincesData = response.data.provinces; //debugger;

                    if(response.data.success){

                        if (this.provincesData.length > 0) {
                          this.selectedProvince = '';
                          this.selectedCity = '';
                        }

                    }           

                    
                  
                } catch (error) {

                    console.error('Error in handleSelectChange:', error);

                }

            }
        },

        async handleSelectProvinceChange() {

            this.citiesData = [];

            if (this.selectedProvince !== '') {
            
            try {
                
                const dataf = {

                    province_id: this.selectedProvince,

                };

                //console.log(this.selectedProvince);

                const response = await axios.post('https://espacionebula.com:8000/get-cities-by-province', dataf, {

                    headers: {

                        'Access-Control-Allow-Origin': '*',

                    },
                    mode: 'cors',

                });

                //console.log(response); debugger;
                this.citiesData = response.data.cities; //debugger;

                if(response.data.success){

                    if (this.citiesData.length > 0) {

                        this.selectedCity = '';

                    }

                }           

                
              
            } catch (error) {

                console.error('Error in handleSelectProvinceChange:', error);

            }

          }

        }

    },

  };

  </script>
  
<style scoped>

    .container {

        max-width: 480px;
        margin: 0 auto;

    }
  
</style>
  