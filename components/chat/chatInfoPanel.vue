<template>
  <div>
    <div v-if="showThisCurrentProspect" class="absolute w-4/6 h-full bg-black/80 flex items-center justify-center z-10">
      <button class="fas fa-arrow-left fa-3x absolute left-0 top-0 m-20" @click="showThisUser()" />
      <Card
        class=" relative"
        :key="0"
        :index="0"
        :prospect="finalUser"
        :permission-drag="false"
      />
    </div>
    <div class="chat-info-panel p-4 border-b">
      <div class="flex items-center space-x-4" v-if="finalUser">
        <div class="flex-shrink-0">
          <img :src="'https://espacionebula.com/img/' + finalUser._profilePicture" alt="Profile"
            class="w-20 h-20 rounded-full object-cover">
        </div>
        <div class="flex-grow flex items-center">
          <h2 class="text-5xl font-semibold text-white">{{ finalUser._fname }}</h2>
          <i class="text-gray-500 fa-solid fa-id-badge m-2 text-lg" @click="showThisUser()" />
        </div>
        <i class="fa-solid fa-x text-gray-500" @click="eliminateMatch()"></i>
        <p class="text-gray-500 text-7xl font-bold">{{ getAge(finalUser) }}</p>
      </div>
    </div>
  </div>
</template>
  
<script>
import { useUserStore } from '@/stores/users'
import axios from 'axios';
import Card from "@/components/general/generalCard.vue";


export default {
  data() {
    return {
      userIDID: useRoute().params.id,
      finalUser: '',
      showThisCurrentProspect: false,
    };
  },
  created: async function () {
    this.finalUser = await this.getUserById(this.userIDID);
  },
  components: {
    Card,
  },
  props: {
    user: Object,
  },
  methods: {
    async eliminateMatch(){
      const confirmed = window.confirm("Are you sure you want to unmatch?");
      if (confirmed) {
        try {
          const userId = localStorage.getItem("CupidConnectId");
          const token = localStorage.getItem("CupidConnectToken");
          const dataf = {
            userId1: userId,
            userId2: this.finalUser
          };
          const response = await axios.post(
            "https://espacionebula.com:8000/delete-match",
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
            this.$router.push({ name: 'chats' });
          } else {
            this.clearErrorMessageAfterDelay();
          }
        } catch (error) {
        }
      }
    },
    showThisUser() {
      this.showThisCurrentProspect = !this.showThisCurrentProspect;
    },
    async getUserById(userIdProp) {
      try {
        const _userId = userIdProp;
        const token = localStorage.getItem("CupidConnectToken");
        const dataf = {
          userId: _userId,
        };
        const response = await axios.post("https://espacionebula.com:8000/get-user-visitor",
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
          return data.user;
        } else {
        }
      } catch (error) {
      }
    },
    getAge(userUSER) {
      const dob = new Date(userUSER._dob);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
      }
      return age;
    }
  }
};
</script>
  
<style scoped>
.chat-info-panel {
  background-color: transparent;
}
</style>
  