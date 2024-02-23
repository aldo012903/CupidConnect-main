<template>
  <div class="h-screen w-screen text-white flex relative">
    <div class="lg:hidden">
      <GeneralMenuPhone />
    </div>
    <div class="hidden lg:block w-1/6 z-10">
      <GeneralMenu />
    </div>
    <div class="w-5/6 flex flex-col items-center mt-10">
      <div class="flex flex items-center">
        <img
          v-if="userCurrent._profilePicture"
          :src="'https://espacionebula.com/img/' + userCurrent._profilePicture"
          alt="Profile photo"
          class="w-64 h-64 m-5 mr-16 rounded-full object-cover"
        />
        <img
          v-else
          src="@/assets/dummy-image.jpg"
          alt="Profile photo"
          class="w-64 h-64 m-5 mr-16 rounded-full object-cover"
        />
        <div>
          <div class="text-5xl font-bold">
            {{
              (userCurrent._fname ?? "First name and") +
              " " +
              (userCurrent._lname ?? "last name.")
            }}
          </div>
          <div class="flex mt-5">
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
            {{ getIdentity(userCurrent.identities) }}
          </div>
          <div class="text-md flex">
            {{ getAge(userCurrent) + "&nbsp; years old." }}
          </div>
          <div class="pt-5">
          <span class="text-3xl font-bold">About</span>
          <div class="text-[20px]">{{ userCurrent._description }}</div>
        </div>
          <div class="flex mt-[13px] flex-wrap">
            <div
              v-for="(interest, index) in userCurrent._interests"
              class="border rounded-[90px] border-[#686262] pl-[12px] pr-[12px] mr-[3.5px] ml-[3.5px]"
              :key="index"
            >
              {{ getInterest(interest) }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 w-[50%] flex items-center justify-center">
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
            <div class="bg-transparent flex  bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
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
        <div
          class="prospect-card"
          v-for="(image, index) in userCurrent._pictures"
          :key="index"
        >
          <img
            :src="'https://espacionebula.com/img/' + image"
            alt="Profile Picture"
            class="profile-image flex flex-wrap"
            :style="imageStyle"
          />
        </div>
        <div
          v-if="
            userCurrent._pictures &&
            Object.keys(userCurrent._pictures).length < 5
          "
          class="prospect-card border-2 border-[#686262] flex justify-center items-center"
        >
        <i class="fa-solid fa-plus text-7xl text-[#686262]"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useIdentitiesStore } from "@/stores/identities";
import { useInterestsStore } from "@/stores/interests";
import { useOrientationsStore } from "@/stores/orientations";
import axios from "axios";
import Swiper from 'swiper';


export default {
  data() {
    return {
      userCurrent: "",
      _username: "",
      prospectsLiked: [],
      prospectsLikedSent: [],
      matches: [],
      activeIndex: 0,
      swiper: null,
    };
  },
  mounted() {
    
    if(!localStorage.getItem('CupidConnectToken')){

      this.$router.push('/');

    }
    this._username = localStorage.getItem("CupidConnectuser");
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
      this.pictures = this.userCurrent._pictures || []; // Set pictures data
      this.initSwiper();
  },
  initSwiper() {
  console.log("Initializing Swiper");
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

    async getMatches() {
      try {
        const _userId = localStorage.getItem("CupidConnectId");
        const token = localStorage.getItem("CupidConnectToken");
        const dataf = {
          userId: _userId,
        };
        const response = await axios.post(
          "https://espacionebula.com:8000/get-matches",
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
    getIdentity(identityId) {
      return useIdentitiesStore().getIdentitiesById(identityId);
    },
    getInterest(interestId) {
      return useInterestsStore().getInterestsById(interestId);
    },
    getOrientation() {
      const o = useOrientationsStore().getOrientationsById(
        this.selectedOrientation
      );
      return o;
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
                  if (data.user._username != '') { 
                    this.username = data.user._username
                    console.log(this.username);
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

<style scoped>
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
.prospect-card {
  position: relative;
  width: 300px;
  height: 400px;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  color: white;
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
}
.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
</style>