<template>
  <div>
    <div class="flex min-h-screen min-w-screen overflow-hidden">
      <div class="lg:hidden">
        <GeneralMenuPhone />
      </div>
      <div class="hidden lg:block w-1/6 z-20">
        <GeneralMenu />
      </div>
      <div class="w-full lg:w-5/6 relative">
        <div v-if="showProspects">
            <div class="mt-10 w-4/6 translate-x-1/2 text-white h-[90vh] flex">
              <Card v-for="(prospect, index) in prospects" 
                ref="prospectCards"
                class="overflow-scroll"
                :key="index" 
                :index="index"
                :prospect="prospect" 
                :permission-drag="true"
                :style="{ 'z-index': (index*-1) }"
                @dismissed="removeProspect(index)"
              />
              <div class="absolute flex self-end justify-around w-[70%]">
                <button class="fas fa-times fa-3x" @click="dislikeProspect" />
                <button class="fas fa-heart fa-3x" @click="likeProspect" />
              </div>
            </div>
        </div>
        <div v-else>
          <div class="h-screen w-full">
            <div class="flex items-center justify-center h-full">
              <div class="text-center text-gray-500">
                <i class="fas fa-street-view fas-2xl text-4xl mb-4"></i> 
                <p class="text-2xl">
                  No more prospects were found at this moment, <br/>please reload the page soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>

<style scoped>

</style>

<script>
  import Card from '@/components/general/generalCard.vue'; 
  import { useUserStore } from '@/stores/users'
  import axios from 'axios';

  export default {
    data() {
      return {
        activeCardIndex: 0,
        isListVisible: false,
        prospects: [],
        showProspects: false
      };
    },
    computed: {
      
    },
    components: {
      Card,
    },
    methods: {
      async getLikedUsers(){
        try {
          const _userId = localStorage.getItem("CupidConnectId");;
          const token = localStorage.getItem("CupidConnectToken");
          const dataf = {
              userId: _userId,
          };
          const response = await axios.post( "https://espacionebula.com:8000/get-user-likes",
            dataf,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
              },
              mode: "cors",
              }
          );
          const data = response.data;
          if (data.success) {
            return data.usersToDisplay;
          } else {
              console.log(
              "There was an error with the user : " + response.data.error
              );
          }
        } catch (error) {
        }
      },
      removeProspect(index) {
        this.prospects.splice(index, 1);
        if (this.prospects.length === 0) {
          this.showProspects = false;
        }
      },
      showMenu(){
        this.isListVisible = !this.isListVisible;
      },
      dislikeProspect() {
        const firstProspectCard = this.$refs.prospectCards[0];
        if (firstProspectCard) {
          firstProspectCard.dismiss(-1);
        }
      },
      likeProspect() {
        const firstProspectCard = this.$refs.prospectCards[0];
        if (firstProspectCard) {
          firstProspectCard.dismiss(1);
        }
      },
    },
    created: async function () {
      this.prospects = await this.getLikedUsers();
      if(this.prospects && this.prospects.length > 0){
        this.showProspects= true;
      }
    },
    mounted: function() {
      if (!localStorage.getItem("CupidConnectToken")) {
        useRouter().push('/login');
      }
    },
    watch: {
      prospects: {
        handler(newProspects, oldProspects) {
        },
        deep: true,
      },
    },
  };
  </script>
  
  <style scoped>
 
  </style>