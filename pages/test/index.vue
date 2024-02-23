<template>
  <div class="h-screen w-screen text-white flex relative">
    <div class="lg:hidden">
      <GeneralMenuPhone />
    </div>
    <div class="hidden lg:block w-1/6">
      <GeneralMenu />
    </div>
    <div class="w-5/6 flex flex-col items-center mt-10">
      <div class="flex flex items-center">
        <img
          :src="'https://espacionebula.com/img/' + userCurrent._profilePicture"
          alt="Profile photo"
          class="w-48 h-48 m-10 rounded-full object-cover"
        />
        <div>
          <div class="text-2xl">
            {{ userCurrent._username }}
          </div>
          <div class="flex">
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
          <div class="text-2xl font-bold mt-2">
            {{ userCurrent._fname + " " + userCurrent._lname }}
          </div>
          <div class="text-md flex">
            {{ getAge(userCurrent) + "&nbsp; years old."}}
          </div>
        </div>
      </div>
      <div class="mt-10 w-5/6 flex items-center justify-center">
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

export default {
  data() {
    return {
      userCurrent: "",
      _username: "",
      prospectsLiked: [],
      prospectsLikedSent: [],
      matches: []
    };
  },
  mounted() {
    this._username = localStorage.getItem("CupidConnectuser");
    this.fetchUser();
  },
  created: async function () {
    this.prospectsLiked = await this.getWhoLikedUsers();
    this.prospectsLikedSent = await this.getLikedByUsers();
    this.matches = await this.getMatches();
  },
  methods: {
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
      } catch (error) {
        console.error("Error in fetchUser:", error);
      }
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
    async fetchUser() {
      try {
        const _userId = localStorage.getItem("CupidConnectId");
        const token = localStorage.getItem("CupidConnectToken");
        const dataf = {
          userId: _userId,
        };
        const response = await axios.post(
          "https://espacionebula.com:8000/get-user",
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
          if (data.user.identities != "") {
            this.selectedIdentity = data.user.identities;
          }
          if (data.user._description != "") {
            this.description = data.user._description;
          }
          if (data.user._orientations != "") {
            this.selectedOrientation = data.user._orientations;
          }
          this.selectedInterests = data.user._interests;
          if (data.user._pictures.length > 0) {
            this.pictures = data.user._pictures;
          }
          this.userCurrent = data.user;
        } else {
          this.error =
            "There was an error with the user : " + response.data.error;
          console.log(
            "There was an error with the user : " + response.data.error
          );
          this.clearErrorMessageAfterDelay();
        }
      } catch (error) {
        console.error("Error in fetchUser:", error);
      }
    },
  },
};
</script>

<style scoped>
.prospect-card {
  position: relative;
  width: 300px; /* Adjust the width as needed */
  height: 400px; /* Adjust the height as needed */
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
  opacity: 0.7; /* Adjust the opacity as needed */
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
</style>
