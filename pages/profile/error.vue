<template>
  <div class="h-full w-screen text-white flex">
  <div class="hidden lg:block w-1/6">
    <GeneralMenu />
  </div>
  
  <div class="row">
  <div class="col-12 col-md-8"><span>.col-12 .col-md-8</span></div>
  <div class="col-6 col-md-4"><span>.col-6 .col-md-4</span></div>
</div>

  <div id="users-table" :class="{ 'modal-active': showModal }" class="overflow-x-auto overflow-y-auto max-h-screen">
      <table class="xl:m-32 hover:table-fixed text-xl ">
        <caption class="text-3xl">List of all users</caption>
          <thead class="underline-offset-4 white">
            <tr class="">
                <th class="p-10" >Username</th>
                <th class="p-10">First Name</th>
                <th class="p-10">Last Name</th>
                <th class="p-10">Email</th>
                <th class="p-10">Actions</th>
            </tr>
          </thead>
          <tbody>
          <tr class="text-center  " v-for="user in users" :key="user._id">
              <td>{{ user._username }}</td>
              <td>{{ user._fname }}</td>
              <td>{{ user._lname }}</td>
              <td class="">{{ user._email }}</td>
              <td class="pl-5">
                <button 
                  :id="'seeMatches' + user._id"
                  class="p-2 mr-[3.5px] ml-[3.5px] rounded-3xl border border-gray rounded-xl relative inline-block group" 
                  @click="seeMatches(user._id)">
                  <i class="fa-solid fa-people-arrows"></i>
                  <div class="hidden group-hover:block bg-gray-800 text-white text-sm py-1 px-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2">
                    Press to see matches from user
                  </div>
                </button> 
                <button 
                  :id="'blockButton_' + user._id"
                  class="p-2 mr-[3.5px] ml-[3.5px] rounded-3xl border border-gray rounded-xl relative inline-block group"
                  @click="blockUser(user._id)">
                  <i class="fa-solid fa-user-slash"></i>
                  <div 
                  class="hidden group-hover:block bg-gray-800 text-white text-sm py-1 px-2 rounded absolute bottom-full left-1/2 transform -translate-x-1/2">
                    Press to block user
                  </div>
                </button> 
              </td>
          </tr>
          </tbody>
      </table>
      <div  v-if="showModal" 
      class="modal border border p-10 fixed mt-0 lg:top-1/2 lg:left-1/2 transform lg:-translate-x-1/2 -translate-y-1/2 bg-black text-white z-10 rounded-2xl">
        <div class="modal-content hover:table-fixed text-xl overflow-y-auto max-h-screen">
          <span class="close" @click="closeModal"></span>
            <table>
              <caption class="text-3xl">List of all matches</caption>
                <thead class="underline-offset-4 white">
                  <tr>
                    <th class="p-10">Username</th>
                    <th class="p-10">First Name</th>
                    <th class="p-10">Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center" v-for="match in matches">
                      <td> {{ match._username }} </td>
                      <td class="pt-3">  {{ match._fname }} </td>
                      <td class="pt-3">  {{ match._lname }} </td> 
                  </tr>
              </tbody>
            </table>
            <button 
                  class="bottom-0 left-0 pt-8 mb-0 pl-0"
                  @click="closeModal()">
                  <i class="fa-solid fa-arrow-left fa-xl"></i>
            </button> 
        </div>
      </div>
      <div v-if="error" class="text-red-500 text-center my-4">
            {{ error}}
    </div>
  </div>
  
  <div class="lg:hidden fixed left-0 right-0 bottom-0 bg-gray-800 z-10">
      <GeneralMenuPhone />
    </div>
</div>
</template>

<style scoped>
.modal-active {
  backdrop-filter: blur(10px);
}

.modal-content {
  max-height: 80vh;
  overflow-y: auto;
}
</style>


<script>
import axios from 'axios';

export default {
  data() {

  return {
      username : '',
      description : '',
      identitiesData : [],
      selectedIdentity : null,
      orientationData : [],
      selectedOrientation : null,
      interestsData : [],
      selectedInterests : null,
      pictures: [],
      error : '',
      showModal : false,
      
      users : [],
      matches : [],

      };

  },
  mounted() {

        

  if(!localStorage.getItem('CupidConnectToken')){

      this.$router.push('/');

  }
  this.fetchUsers();

  },
  

methods: { 
  clearErrorMessageAfterDelay() {
      
      setTimeout(() => {
          this.error = "";
      }, 5000);
  },
  closeModal() {
    this.showModal = false;
    const usersTable = document.getElementById('users-table');
    if (usersTable) {
      usersTable.style.backdropFilter = 'none';
    }
  },
  async blockUser(id) {
    try {
      
      const _userId = localStorage.getItem('CupidConnectId');
      const token = localStorage.getItem('CupidConnectToken');
      debugger;

      const dataf = {
        userId: _userId,
        userId2: id,
      };

      const response = await axios.post('https://espacionebula.com:8000/delete-user-admin', dataf, {

        headers: {
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${token}`,
        },
        mode: 'cors',
      });
        
      if (response.data.success) {
        
        console.log(`The user has been blocked: ${id}`);
        this.fetchUsers();
        

      } else {
        this.error = "Error when blocking a user : "+response.data.error;
        console.log('Error when blocking a user', error);
        this.clearErrorMessageAfterDelay();
          
      }
    } catch (error) {
      console.error('Error when blocking a user', error);
    }
  },
  async seeMatches(id) {
    try {
      
      const _userId = localStorage.getItem('CupidConnectId');
      const token = localStorage.getItem('CupidConnectToken');

      const dataf = {
        userId: _userId,
        userId2: id,
      };

      const response = await axios.post('https://espacionebula.com:8000/get-all-matches', dataf, {

        headers: {
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${token}`,
        },
        mode: 'cors',
      });
      const data = response.data;
        
      if (data.success) {

        this.showModal = true;
        this.matches = data.matches;
        
        console.log(`The admin can see the matches: ${id}`);
        

      } else {

        this.error = "Error when trying to see the matches : "+response.data.error;
        console.log('Error when trying to see the matches', error);
        this.clearErrorMessageAfterDelay();
          
      }
    } catch (error) {
      console.error('Error when trying to see the matches', error);
    }
  },
  async fetchUsers(){

    try {
        
        const _userId = localStorage.getItem('CupidConnectId'); 
        const token = localStorage.getItem('CupidConnectToken');   
        const dataf = {
              userId: _userId,
          };

        const response = await axios.post('https://espacionebula.com:8000/get-all-users',dataf, {
          
          
            headers: {

              'Access-Control-Allow-Origin': '*',
              'Authorization': `Bearer ${token}`,
              
            },
            mode: 'cors',

        });
        
          const data = response.data;
            
            if(data.success){

              this.users = data.users;
              this.username = data._username;

            }else{

              this.error = "There was an error with the user : "+response.data.error;
              console.log("There was an error with the user : "+response.data.error);
              this.clearErrorMessageAfterDelay();

            };
                
      
    } catch (error) {

        console.error('Error in fetchUser:', error);

    }


  },

},
};
</script>
