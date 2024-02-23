<template>
  <div class="flex flex-col menuOverall p-4 cont">
    <div class="w-fit mx-auto">
      <ul class="flex flex-col items-center">
        <li class="mb-4">
          <nuxt-link to="/" class="w-3/4"
            ><img :src="logo" class="h-24"
          /></nuxt-link>
        </li>
        <li :class="{ 'font-bold': isProfileRoute }">
          <nuxt-link to="/profile" class="flex items-center">
            <img
              v-if="userData._profilePicture"
              :src="'https://espacionebula.com/img/' + userData._profilePicture"
              alt="Profile photo"
              class="w-6 h-6 rounded-full object-cover mr-4"
              :class="{ 'border-2 border-white': isProfileRoute }"
            />
            <img
              v-else
              src="@/assets/dummy-image.jpg"
              alt="Profile photo"
              class="w-6 h-6 rounded-full object-cover mr-4"
              :class="{ 'border-2 border-white': isProfileRoute }"
            />
             Profile
          </nuxt-link>
        </li>
        <li :class="{ 'font-bold': isLikesRoute }">
          <nuxt-link to="/likes"><i class="fas fa-heart"></i> Likes</nuxt-link>
        </li>
        <li :class="{ 'font-bold': isChatsRoute }">
          <nuxt-link to="/chats"
            ><i class="fas fa-comments"></i> Chats</nuxt-link
          >
        </li>
        <li :class="{ 'font-bold': isHomeRoute }">
          <nuxt-link to="/"><i class="fas fa-home"></i> Home</nuxt-link>
        </li>
        <li :class="{ 'font-bold': isUsersRoute }">
          <nuxt-link v-if="(adminView == 9758) && isLogin" to="/admin/user"><i class="fa-solid fa-user"></i> Users</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="mx-auto">
      <button @click="showMenu"><i class="fa-solid fa-bars"></i> Menu</button>
      <ul id="hiddenMenu" class="relative">
        <li v-if="isListVisible && !isLogin" class="hover:font-bold">
          <NuxtLink to="Login">LogIn</NuxtLink>
        </li>
        <li v-if="isListVisible && !isLogin" class="hover:font-bolds">
          <NuxtLink to="/admin/users/add-user">SignUp</NuxtLink>
        </li>
        <li v-if="isListVisible && isLogin" class="hover:font-bold">
          <NuxtLink to="logout" @click="logout">Logout</NuxtLink>
        </li>
        <li v-if="isListVisible && isLogin" class="hover:font-bold">
          <NuxtLink to="/user/DeleteProfile">Delete Profile</NuxtLink>
        </li>
        <li v-if="isListVisible && isLogin" class="hover:font-bold">
          <NuxtLink to="/user/changePassword">Change Password</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>



<style scoped>
.cont {
  border-right: 1px solid #686262;
}
* {
  color: white;
  list-style: none;
  font-size: 1.5rem;
  line-height: 2rem;
}
.menuOverall {
  height: 100%;
  justify-content: space-between;
}
li {
  margin-top: 0.5rem !important;
  width: fit-content;
}
i {
  min-width: 35px;
}
/* Remove underlines from anchor elements within li */
li a {
  text-decoration: none;
  color: inherit; /* Inherit the color from the parent li */
}
</style>

<script>
import logo from "@/assets/logoCupid.svg";
import { useUserStore } from "../../stores/users";
import axios from 'axios';

export default {
  data() {
    return {
      logo: logo,
      isListVisible: false,
      isLogin: false,
      userData: '',
      adminView:false,
    };
  },
  mounted() {
    if (localStorage.getItem("CupidConnectToken")) {
      this.isLogin = true;
      this.showAdmin();
    }
  },
  created: async function () {
    this.userData = await this.fetchUser();
  },
  computed: {
    isProfileRoute() {
      return this.$route.path.startsWith("/profile");
    },
    isLikesRoute() {
      return this.$route.path.startsWith("/likes");
    },
    isChatsRoute() {
      return this.$route.path.startsWith("/chats");
    },
    isHomeRoute() {
      return this.$route.path === "/";
    },
    isUsersRoute() {
      return this.$route.path.startsWith("/admin/user");
    },
  },
  methods: {
    async fetchUser() {
      try {
        const userId = localStorage.getItem("CupidConnectId");
        const token = localStorage.getItem("CupidConnectToken");
        const dataf = {
          userId: userId,
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
          return data.user;
        } else {
          this.error =
            "There was an error with the user : " + response.data.error;
          console.log(
            "There was an error with the user : " + response.data.error
          );
          this.clearErrorMessageAfterDelay();
        }
      } catch (error) {
      }
    },
    showMenu() {
      this.isListVisible = !this.isListVisible;
    },
    logout() {
      useUserStore().logOutUser();
      this.$router.push("/logout");
    },
    showAdmin(){

      if(localStorage.getItem("CupidConnectType")){

        this.adminView = localStorage.getItem("CupidConnectType");
      }
      
    }
  },
};
</script>
