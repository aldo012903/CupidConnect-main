<template>
  <div class="h-full  w-screen  text-white bg-black flex">
    <div class="hidden lg:block w-1/6">
      <GeneralMenu />
    </div>
    <div class="grid grid-rows-5 lg:px-10 sm:px-40 lg:px-60 mt-10 ">

      <div class="border-b white">
        <form @submit.prevent="submitFormDescription">
          <div class="p-8">
            <label>
              <span class="block text-2xl sm:text-m lg:text-5xl lg:pl-25 xl:px-28  lg:pt-18">Hello <b>{{_username}},</b><br>let's complete your profile!</span>
              <span class="block text-right lg:text-2xl lg:pr-12 lg:pt-18 pt-12">First provide us a quick <b>description</b> of<br>yourself:</span>
              <textarea rows="4" cols="50" class="text-lg p-4 leading-6  p-10 w-full lg:ml-10 lg:w-11/12   block form-input border-black-300 rounded-3xl mt-5 bg-black border border-gray" type="text" 
              id="" name="description" v-model="description" required></textarea>
            </label>
          </div>
          <div class="lg:mt-4 mb-10 text-right pr-10">
            <button type="submit">
              <i class="fa-solid fa-cloud-arrow-down fa-2x"></i> 
            </button>
          </div>
          <!-- error -->
          <div v-if="errors.description" class="text-red-500 text-center my-4">
            {{ errors.description }}
          </div>
          <div v-if="save.description" class="text-green-500 text-center my-4">
              {{ save.description }}
          </div>
        </form>
      </div>
      
      <div class="border-b">
        <form @submit.prevent="submitFormIdentity">
          <div  class="p-8">
            <label class="relative block">
              <span class="block text-2xl sm:text-m lg:text-5xl lg:pl-25 xl:px-28  lg:pt-18">How do you <b>identify</b>?</span>
              <div class="relative flex flex-col lg:flex-row items-baseline  w-full  md:8/12 lg:w-10/12  pt-12">
                <label class="block text-2xl  lg:text-5xl xl:pl-8 pr-5"><b>I am: </b></label>
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
            <button  type="submit">
              <i class="fa-solid fa-cloud-arrow-down fa-2x"></i> 
            </button>
          </div>
         
          <div v-if="errors.identity" class="text-red-500 text-center my-4">
            {{ errors.identity }}
          </div>
          <div v-if="save.identity" class="text-green-500 text-center my-4">
              {{ save.identity }}
           </div>
        </form>
      </div>

      <div class="border-b">
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
            <button type="submit">
              <i class="fa-solid fa-cloud-arrow-down fa-2x"></i> 
            </button>
          </div>
          <div v-if="errors.orientation" class="text-red-500 text-center my-4">
            {{ errors.orientation }}
          </div>
          <div v-if="save.orientation" class="text-green-500 text-center my-4">
              {{ save.orientation }}
           </div>
        </form>
      </div>

      <div class="border-b">
        <form @submit.prevent="submitFormInterests">
          <div class="p-8">
            <label class="relative block">
              <span class="block text-2xl sm:text-m lg:text-5xl lg:pl-25 xl:px-28  lg:pt-18">Talk to us a little bit about you <b>interests</b>:</span>
              <div class="block w-full w-full  md:8/12  xl:pl-32 pt-12">
                <label class="block lg:text-3xl lg:pr-12 lg:pt-18 pt-12">Select minimum of 1 and maximum 3.</label>
                <label class="text-red-700" v-if="showWarning">Select a minimum of 1 and up to 3!</label>
                <div class="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 text-center">
                  <div
                    class="p-2 m-2 border-2 rounded-full border-[#686262] inline-block cursor-pointer"
                    v-for="interest in interestsData"
                    :id="interest._id"
                    :key="interest._id"
                    :value="interest._id"
                    
                    @click="changeInterestStatus(interest)"
                  >
                    {{ interest.name }}
                  </div>
                </div>
              </div>
            </label>
            <div class="lg:mt-4 text-right pr-10 xl:pr-52">
              <button type="submit">
                <i class="fa-solid fa-cloud-arrow-down fa-2x"></i> 
              </button>
            </div>
            <div v-if="errors.interests" class="text-red-500 text-center my-4">
              {{ errors.interests }}
            </div>
            <div v-if="save.interests" class="text-green-500 text-center my-4">
              {{ save.interests }}
           </div>
          </div>
        </form>
      </div>

      <div class="border-b">
        <form @submit.prevent="submitFormPhotos" enctype="multipart/form-data">
          <div class="p-8">
            <label class="relative block">
              <span class="block text-2xl sm:text-m lg:text-5xl lg:pl-25 xl:px-28  lg:pt-18">Please provide us with your <b>photos</b>.</span>
              <div class="block w-full w-full  md:8/12  xl:pl-32 pt-12">

                <label for="pictures" class="text-xl border rounded p-2 cursor-pointer bg-black border border-gray hover:bg-gray-500 text-white py-2 px-4 rounded-full inline-flex items-center"> 
                  <i class="fa-solid fa-images pr-2 fa-lg"></i>
                    Upload File
                </label> 
                <input ref="picturesInput" id="pictures" name="pictures" type="file" 
                    class="hidden"
                    accept="image/*" 
                    @change="handlePicturesChange">

              </div>
              
            </label>
            <div class="lg:mt-4 text-right pr-10 xl:pr-52">
              <button id="" type="submit">
                <i class="fa-solid fa-cloud-arrow-down fa-2x"></i> 
              </button>
            </div>
            <div v-if="errors.interests" class="text-red-500 text-center my-4">
              {{ errors.photos }}
            </div>
            <div v-if="save.photos" class="text-green-500 text-center my-4">
              {{ save.photos }}
            </div>
          </div>
        </form>
        <div class="sm:mx-40  grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 mb-20">
        <div v-for="(photo, index) in pictures" :key="index" >
          <button @click="deletePhoto(index)" class=" absolute">
              <i class="fa-solid fa-circle-xmark fa-2x"></i>
            </button>
          <div class="sm:w-64 sm:h-64 lg:w-80 lg:h-80  rounded-lg p-2 custom-rounded">
            <img :src="'https://espacionebula.com/img/' + photo" alt="Profile photo"  class="w-full h-full object-cover" loading="lazy"/>
          </div>
 
        </div> 
      </div>
    </div>
      <div v-if="error" class="text-red-500 text-center my-4">
              {{ error}}
      </div>

      
    </div>
    <div class="lg:hidden fixed left-0 right-0 bottom-0 bg-gray-800">
        <GeneralMenuPhone />
      </div>  
  </div>
</template>

<style scoped>

  strong, b {
    font-weight: bold;
  }
</style>



<script>
  import axios from 'axios';
  
  export default {

    data() {

        return {
            _username : '',
            description : '',
            identitiesData : [],
            selectedIdentity : '',
            orientationData : [],
            selectedOrientation : null,
            interestsData : [],
            selectedInterests : [],
            interestSelected : [],
            pictures: null,
            newPictures: [],
            error : '',


            formTypes: {
              DESCRIPTION: 'description',
              IDENTITY: 'identity',
              ORIENTATION: 'orientation',
              INTERESTS: 'interests',
              PHOTOS: 'photos',
          },
          errors: {
          description: '',
          identity: '',
          orientation: '',
          interests: '',
          photos: '',
        },
        save: {
          description: '',
          identity: '',
          orientation: '',
          interests: '',
          photos: '',
        },
        
          submissionStatus: {
            description: false,
            identity: false,
            orientation: false,
            interests: false,
            
          },
      };

    },
    mounted() {

      

        if(!localStorage.getItem('CupidConnectToken')){

            this.$router.push('/');

        }
        this._username = localStorage.getItem('CupidConnectuser');
        this.fetchData();
        

      
    },
    methods: {

      async fetchData(){
        await this.fetchIdentities();
      },
      async submitForm(){
          
          const descriptionSuccess = await this.submitFormDescription();
          const identitySuccess = await this.submitFormIdentity();
          const orientationSuccess = await this.submitFormOrientation();
          const interestsSuccess = await this.submitFormInterests();

          this.submissionStatus = descriptionSuccess;
          this.submissionStatus = identitySuccess;
          this.submissionStatus = orientationSuccess;
          this.submissionStatus = interestsSuccess;
          
          if (Object.values(this.submissionStatus).every(success => success)){

            this.$router.push('/profile');
          }
      },
      async submitFormDescription() {
            

              if(this.verify(this.formTypes.DESCRIPTION)){ 

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

                    this.save.description = "The description was saved successfully";
                    this.clearErrorMessageAfterDelay();

              }else{

                  this.errors.description = "There was an error with the description: "+response.data.error;
                  console.log("There was an error with the description: "+response.data.error);
                  this.clearErrorMessageAfterDelay();

              }
          
          }
      },
      verify(formType) {
          
            if (formType === this.formTypes.DESCRIPTION) {
              const descriptionRegex = /^[a-zA-Z0-9\s]{1,100}$/;
              if (!descriptionRegex.test(this.description)) {
                this.errors.description = 'The description cannot be more than 100 alphanumeric characters';
                return false;
              }
          } else if (formType === this.formTypes.IDENTITY) {
            if (!this.selectedIdentity) {
              this.errors.identity = 'Please select an identity';
              return false;
            }
          } else if (formType === this.formTypes.ORIENTATION) {
            if (!this.selectedOrientation) {
              this.errors.orientation = 'Please select an orientation';
              return false;
            }
          } else if (formType === this.formTypes.INTERESTS) {
            if (this.selectedInterests.length < 3 && this.selectedInterests.length > 0) {
              this.errors.interests = 'Select a minimum of 1 and up to 3!';
              return false;
            }
          } else if (formType === this.formTypes.PHOTOS) {
            if (this.pictures == null) {
              this.errors.photos = 'Please select a photo';
              return false;
            }
          }
          // Clear errors for the current form
          this.errors[formType.toLowerCase()] = '';
          return true;
      },
      clearErrorMessageAfterDelay() {
        
              setTimeout(() => {
                  this.save = "";
                  this.error = "";
                  this.errors = "";
              }, 5000);
      },
      async submitFormIdentity() {

        if(this.verify(this.formTypes.IDENTITY)){

          const _userId = localStorage.getItem('CupidConnectId'); 
          const token = localStorage.getItem('CupidConnectToken'); //para verificar id 
          //;
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
            
            //console.log(response); //;
            if (response.data.success) {
              this.save.identity = "The identity was saved successfully";
              this.clearErrorMessageAfterDelay();
            } else {
                this.errors.identity = "There was an error updating your identity : "+response.data.error;
                console.log("There was an error updating your identity : "+response.data.error);
                this.clearErrorMessageAfterDelay();
            }
        
        }

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
            
              this.identitiesData = response.data.identities; //;
              
              if (this.identitiesData.length > 0) { //;
                this.selectedIdentity = ''; //para que el axios no se coma el option 1 
              }
              
            await this.fetchOrientations();
            
          } catch (error) {

              console.error('Error in fetchIdentities:', error);

          }

      },
      async submitFormOrientation() { 

          if(this.verify(this.formTypes.ORIENTATION)){

            const _userId = localStorage.getItem('CupidConnectId'); 
            const token = localStorage.getItem('CupidConnectToken'); //para verificar id 
            //;
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
              
              //console.log(response); ;
              if (response.data.success) {
              this.save.orientation = "The orientation was saved successfully";
              this.clearErrorMessageAfterDelay();
            } else {
                this.errors.orientation = "There was an error updating your orientation : "+response.data.error;
                console.log("There was an error updating your orientation : "+response.data.error);
                this.clearErrorMessageAfterDelay();
            }

          }

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
            
              this.orientationData = response.data.orientations; //;
              
              if (this.orientationData.length > 0) { //;
                this.selectedOrientation = ''; //para que el axios no se coma el option 1 
              }

              
            await this.fetchInterests();
            
          } catch (error) {

              console.error('Error in fetchOrientations:', error);

          }

      },
      async submitFormInterests() {
        //
        if(this.verify(this.formTypes.INTERESTS)){

          const _userId = localStorage.getItem('CupidConnectId'); 
          const token = localStorage.getItem('CupidConnectToken'); //para verificar id 
          //;
            const dataf = {
                userId: _userId,
                newInterests: this.selectedInterests,

            };

            const response = await axios.post('https://espacionebula.com:8000/change-interest-user', dataf, {

                headers: {

                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,

                },
                mode: 'cors',

            });
            
            //console.log(response);;
            if (response.data.success) {
              this.save.interests = "The interests were saved successfully";
              this.clearErrorMessageAfterDelay();
            } else {
                this.errors.interests = "There was an error updating your interests : "+response.data.error;
                console.log("There was an error updating your interests : "+response.data.error);
                this.clearErrorMessageAfterDelay();
            }

        }

      },
      changeInterestStatus(interestName){
        
        const index = this.selectedInterests.indexOf(interestName._id); debugger;
        console.log(index);
        console.log(interestName);
        if (index !== -1) {//debugger;
          this.errors.interests = false;
          this.selectedInterests.splice(index, 1);
          var element = document.getElementById(interestName._id);
          element.style.backgroundColor = "transparent";
        }else{
          if(this.selectedInterests.length == 3){
            this.errors.interests = 'Select a minimum of 1 and up to 3!';
            this.clearErrorMessageAfterDelay();
            return;
          }
          this.errors.interests = false;
          this.selectedInterests.push(interestName);
          var element = document.getElementById(interestName._id);
          element.style.backgroundColor = "#686262";
        }
      },
      async fetchInterests() {

      try {
        
          const response = await axios.get('https://espacionebula.com:8000/get-interests', {

              headers: {

                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data',
                
              },
              mode: 'cors',

          });
        
          this.interestsData = response.data.interests; //;
          
          /*if (this.interestsData.length > 0) { //;
            this.selectedInterests = ''; //para que el axios no se coma el option 1 
          }*/
          
          await this.fetchUser();
        
      } catch (error) {

          console.error('Error in fetchInterests:', error);

      }

      },
      handlePicturesChange(event) {
      console.log("entro a handle");
      this.pictures = event.target.files[0];

      },
      async fetchPhotos(){

          try {
              
              const _userId = localStorage.getItem('CupidConnectId'); 
              const token = localStorage.getItem('CupidConnectToken');   
              const dataf = {
                    userId: _userId,
                };

              const response = await axios.post('https://espacionebula.com:8000/get-user',dataf, {
                
                
                  headers: {

                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    
                  },
                  mode: 'cors',

              });
              
                const data = response.data; //;
                  
                  if(data.success){

                    if (data.user._pictures.length > 0) { 
                      this.pictures = data.user._pictures; //;
                    }
                    
                  }else{

                    this.error = "There was an error with the user : "+response.data.error;
                    console.log("There was an error with the user : "+response.data.error);
                    this.clearErrorMessageAfterDelay();

                  };
            
              //this.identitiesData = response.data.identities; //;
              
            
          } catch (error) {

              console.error('Error in fetchUser:', error);

          }


      },
      async submitFormPhotos() {
        console.log("entro a submit fotos");

        if(this.verify(this.formTypes.PHOTOS)){

          try {
            const formData = new FormData();
            const _userId = localStorage.getItem('CupidConnectId'); 
            const token = localStorage.getItem('CupidConnectToken');

            if (!token) {
              console.error('Token de autorización no encontrado en el localStorage');
              return;
            }

            formData.append('userId', _userId);
            formData.append('_profilePicture', this.pictures);

            

            const response = await axios.post('https://espacionebula.com:8000/upload-picture-user', formData, {

              headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
              },
              mode: 'cors',
            });

            if (response.data.success) {
              const newPhotoFileName = response.data.fileName;
              this.newPictures.push(newPhotoFileName); 
              this.save.photos = "The photos were uploaded successfully";
              this.clearErrorMessageAfterDelay();
              await this.fetchPhotos();
            } else {
                this.errors.photos = "There was an error updating photos : "+response.data.error;
                console.log("There was an error updating photos : "+response.data.error);
                this.clearErrorMessageAfterDelay();
            }
          } catch (error) {
            console.error('Error in explotó aquí:', error);

          }

        }
          
      },
      async deletePhoto(index) {

          try {
            
            const _userId = localStorage.getItem('CupidConnectId');
            const token = localStorage.getItem('CupidConnectToken');
            

            const dataf = {
                userId: _userId,
                index: index,

            };

            const response = await axios.post('https://espacionebula.com:8000/delete-picture-user', dataf, {

              headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`,
              },
              mode: 'cors',
            });
              
            if (response.data.success) {
              this.pictures.splice(index, 1); 
              this.save.photos = "The photos were deleted successfully: ";
              this.clearErrorMessageAfterDelay();

            } else {
                this.errors.photos = "There was an error deleting photos : "+response.data.error; 
                console.log("There was an error deleting photos : "+ response.data.error);
                this.clearErrorMessageAfterDelay();
            }
          } catch (error) {
            console.error('Error al eliminar la foto', error);
          }
      },
      async fetchUser(){

        try {
            
            const _userId = localStorage.getItem('CupidConnectId'); 
            const token = localStorage.getItem('CupidConnectToken');   
            const dataf = {
                  userId: _userId,
              };

            const response = await axios.post('https://espacionebula.com:8000/get-user',dataf, {
              
              
                headers: {

                  'Access-Control-Allow-Origin': '*',
                  'Authorization': `Bearer ${token}`,
                  
                },
                mode: 'cors',

            });
            
              const data = response.data;
                
                if(data.success){

                  if (this.identitiesData.length > 0 && data.user.identities != '') { 
                    this.selectedIdentity = data.user.identities;
                  }
                  if (data.user._description != ''){
                    this.description = data.user._description; 
                  }
                  if (this.orientationData.length > 0 && data.user._orientations != '') { 
                    this.selectedOrientation = data.user._orientations; 
                  }
                  if (this.interestsData.length > 0 && data.user._interests.length > 0) { 
                    this.selectedInterests = data.user._interests; 
                    this.selectedInterests.forEach(interest => {
                    var element = document.getElementById(interest);
                    element.style.backgroundColor = "#686262";
                  });
                    
                  }
                  if (data.user._pictures.length > 0) { 
                    this.pictures = data.user._pictures; 
                  }

                }else{

                  this.error = "There was an error with the user : "+response.data.error;
                  console.log("There was an error with the user : "+response.data.error);
                  this.clearErrorMessageAfterDelay();

                };
          
            //this.identitiesData = response.data.identities; //;
            
          
        } catch (error) {

            console.error('Error in fetchUser:', error);

        }


      },
  },
};

</script>

