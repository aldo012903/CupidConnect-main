<template>
  <div class="h-full w-screen text-white flex">
    <div class="hidden lg:block w-[25.53rem]">
      <GeneralMenu />
    </div>
    <div class="w-5/6 flex flex-col items-center mt-10 ">
      <div class="lg:flex flex items-center flex-wrap xl:ml-0 ml-[30%]">
        <img
          v-if="profilePicture"
          :src="'https://espacionebula.com/img/' + profilePicture"
          alt="Profile photo"
          class="lg:w-64 h-[10rem] lg:h-64 lg:m-5 mr-16 rounded-full object-cover"
        />
        <img
          v-else``
          src="@/assets/dummy-image.jpg"
          alt="Profile photo"
          class="lg:w-64 h-[10rem] lg:h-64 lg:m-5 mr-16 rounded-full object-cover"
        />
        <div>
          <div class="text-3xl lg:text-5xl font-bold">
            {{ (fullname ?? "Full name")}}
          </div>
          <div class="flex-wrap md:flex mt-5">
            <div class="mr-5">
              {{ prospectsLiked.length + "&nbsp; Likes recieved." }}
            </div>
            <div class="mr-5 ml-5">
              {{ prospectsLikedSent.length + "&nbsp; Likes sent." }}
            </div>
            <div class="mr-5 ml-5">
              {{ matches.length + "&nbsp; Matches." }}
            </div>
          </div>
          <div class="text-3xl mt-2  font-bold">
            {{ getIdentity(identities) }}
          </div>
          <div class="text-md flex">
            {{ getAge(userCurrent) + "&nbsp; years old." }}
          </div>
          <div class="pt-5">
          <span class="text-3xl font-bold">About</span>
          <div class="text-[20px]">{{ description }}</div>
        </div>
          <div class="flex mt-[13px] flex-wrap">
            <div
              v-for="(interest, index) in selectedInterests"
              class="border rounded-[90px] border-[#686262] pl-[12px] pr-[12px] mr-[3.5px] ml-[3.5px]"
              :key="index"
            >
              {{ getInterest(interest) }}
            </div>
          </div>
        </div>
      </div>
      <div class=" w-[70%] sm:w-[30%] md:w-[40%] lg:w-[35%] mt-5 mb-5 ">
          <div class="lg:pt-10 overflow-hidden relative">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div v-for="(photo, index) in pictures" :key="index" class=" lg:p-15 white swiper-slide">
                  <img :src="'https://espacionebula.com/img/' + photo" alt="Profile photo" class="rounded-lg" />
                </div>
              </div>
              <div class="swiper-button-prev bg-transparent" @click="prevSlide"></div>
              <div class="swiper-button-next bg-transparent" @click="nextSlide"></div>
            </div>
            <div class="bg-transparent flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
              <button
                v-for="(index) in pictures"
                :key="index"
                type="button"
                class="w-3 h-3 rounded-full"
                :aria-current="index === activeIndex"
                :aria-label="'Slide ' + (index + 1)"
                @click="setActiveIndex(index)"
              ></button>
            </div>
          </div>
        </div>
    </div>
    
    <div class="lg:hidden fixed left-0 right-0 bottom-0 bg-gray-800 z-10">
        <GeneralMenuPhone />
      </div>
  </div>
</template>



<style scoped>
strong, b {
  font-weight: bold;
}
.swiper-button-prev::after,
.swiper-button-next::after {
color: white; 
font-size: xx-large;
font-weight: 1000;

}
.swiper-button-prev, .swiper-button-next {
display: none;
}
.swiper-container:hover .swiper-button-prev,
.swiper-container:hover .swiper-button-next {
display: block;
}
</style>


<script>

import { useIdentitiesStore } from "@/stores/identities";
import { useInterestsStore } from "@/stores/interests";
import { useOrientationsStore } from "@/stores/orientations";
import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

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
          profilePicture : '',
          fullname : '',
          prospectsLiked: [],
          prospectsLikedSent: [],
          matches: [],
          userId : this.$route.params.userId,

          activeIndex: 0,
          swiper: null,
      
    };

  },
  mounted() {

      if(!localStorage.getItem('CupidConnectToken')){

          this.$router.push('/');

      }
      this.fetchDataAndInitializeSwiper();
  },
  created: async function () {
    this.prospectsLiked = await this.getWhoLikedUsers();
    this.prospectsLikedSent = await this.getLikedByUsers();
    this.matches = await this.getMatches();
  },
  methods: {

    async fetchDataAndInitializeSwiper() {
        await this.fetchUser(); 
        this.initSwiper();
    },
    initSwiper() {
      this.swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChange: () => {
            this.activeIndex = this.swiper.realIndex;
          },
        },
      });
    },
    setActiveIndex(index) {
      this.activeIndex = index;
      this.swiper.slideTo(index, 300);
    },
    prevSlide() {
      this.swiper.slidePrev();
    },
    nextSlide() {
      this.swiper.slideNext();
    },
    handlePicturesChange(event) {

      this.pictures = event.target.files;

    },
    clearErrorMessageAfterDelay() {
    
          setTimeout(() => {
              this.error = "";
          }, 5000);
    },
    async getMatches() {
      try {
        const _userId = localStorage.getItem("CupidConnectId");
        const token = localStorage.getItem("CupidConnectToken");
        const dataf = {
          userId: userId,
        };
        const response = await axios.post(
          "https://espacionebula.com:8000/get-user-visitor",
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
          return data.matches;
        } else {
          console.log(
            "There was an error with the user : " + response.data.error
          );
        }
      } catch (error) {}
    },
    async getWhoLikedUsers() {
      try {
        const _userId = localStorage.getItem("CupidConnectId");
        const token = localStorage.getItem("CupidConnectToken");
        const dataf = {
          _liked_userId: _userId,
        };
        const response = await axios.post(
          "https://espacionebula.com:8000/get-likes-to-user",
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
          return data.usersWhoLiked;
        } else {
          console.log(
            "There was an error with the user : " + response.data.error
          );
        }
      } catch (error) {}
    },
    async getLikedByUsers() {
      try {
        const _userId = localStorage.getItem("CupidConnectId");
        const token = localStorage.getItem("CupidConnectToken");
        const dataf = {
          liker_userId: _userId,
        };
        const response = await axios.post(
          "https://espacionebula.com:8000/get-likes-user",
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
          return data.usersWhoILiked;
        } else {
          console.log(
            "There was an error with the user : " + response.data.error
          );
        }
      } catch (error) {}
    },
    getAge(userUSER) {
      if (!userUSER) return 0;
      const dob = new Date(userUSER._dob);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
      ) {
        age--;
      }
      return age;
    },
    getIdentity(identityId){
      return useIdentitiesStore().getIdentitiesById(identityId);
    },
    getInterest(interestId){
      return useInterestsStore().getInterestsById(interestId);
    },
    getOrientation(){
      const o = useOrientationsStore().getOrientationsById(this.selectedOrientation);
      return o;
    },
    async fetchUser(){

      try {
          
          const userId = this.$route.params.userId
          const token = localStorage.getItem('CupidConnectToken');   
          const dataf = {
                userId: userId,
            };

          const response = await axios.post('https://espacionebula.com:8000/get-user-visitor',dataf, {
            
            
              headers: {

                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`,
                
              },
              mode: 'cors',

          });
          
                const data = response.data;
                  if(data.success){
                    if (data.user._username != '') { 
                      this.username = data.user._username
                      console.log(this.username);
                    }
                    if (data.user._fname != '' && data.user._lname != '') { 
                      this.fullname = data.user._fname + " " +  data.user._lname
                      console.log(this.fullname);
                    }
                    if (data.user._profilePicture != '') { 
                      this.profilePicture = data.user._profilePicture 
                      console.log(this.profilePicture);
                    }
                    if (data.user.identities != '') { 
                      this.selectedIdentity = data.user.identities;
                    }
                    if (data.user._description != ''){
                      this.description = data.user._description; 
                    }
                    if (data.user._orientations != '') {  
                      this.selectedOrientation = data.user._orientations; 
                    }
                    this.selectedInterests = data.user._interests;
                    if (data.user._pictures.length > 0) { 
                      this.pictures = data.user._pictures; 
                    }
                    this.userCurrent = data.user;

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

