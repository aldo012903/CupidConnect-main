<template>
    <div class="chat-list">
      <div class="mx-auto">
        <div v-for="(user, index) in users" :key="index" class="chat-item">
          <nuxt-link :to="'/chats/' + user._id" class="no-underline">
            <div class="flex items-center space-x-4 p-4 border-b">
              <div class="flex-shrink-0">
                <img 
                  :src="'https://espacionebula.com/img/' + user._profilePicture"
                  alt="Profile" 
                  class="w-12 h-12 rounded-full object-cover">
              </div>
              <div class="flex-grow">
                <h2 class="text-xl font-semibold text-white">{{ user._fname }}</h2>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/users'
  import axios from "axios";

  export default {
    data() {
      return {
        users: []
      };
    },
    created: async function () {
      this.users = await this.getMatches();
    },
    methods:{
      async getMatches(){
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
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .chat-list {
    max-height: 100vh;
    overflow-y: auto;
  }
  
  .chat-item:hover {
    background-color: #68626264;
  }
  </style>
  