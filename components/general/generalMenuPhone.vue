<template>
  <div class="menuOverall p-4 cont absolute w-screen h-fit bottom-0 bg-black">
      <ul class="flex w-full justify-around">
        <li :class="{ 'font-bold': isProfileRoute }"><nuxt-link to="/profile"><i class="fas fa-user"></i></nuxt-link></li>
        <li :class="{ 'font-bold': isLikesRoute }"><nuxt-link to="/likes"><i class="fas fa-heart"></i></nuxt-link></li>
        <li :class="{ 'font-bold': isChatsRoute }"><nuxt-link to="/chats"><i class="fas fa-comments"></i></nuxt-link></li>
        <li :class="{ 'font-bold': isHomeRoute }"><nuxt-link to="/"><i class="fas fa-home"></i></nuxt-link></li>
      </ul>
  </div>
</template>

<style scoped>
.cont {
  border-top: 1px solid #686262;
}
* {
  color: white;
  list-style: none;
  font-size: 1.5rem;
  line-height: 2rem;
}
.menuOverall {
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
import logo from '@/assets/logoCupid.svg'
import { useUserStore } from '../../stores/users'

export default {
  data() {
    return {
      logo: logo,
      isListVisible: false,
      isLogin: false,
      userData : useUserStore(),
    }
  },
  mounted() {

        if(localStorage.getItem('CupidConnectToken')){

            this.isLogin = true;

        }    
      
    },
  computed: {
    isProfileRoute() {
      return this.$route.path.startsWith('/profile');
    },
    isLikesRoute() {
      return this.$route.path.startsWith('/likes');
    },
    isChatsRoute() {
      return this.$route.path.startsWith('/chats');
    },
    isHomeRoute() {
      return this.$route.path === '/';
    },
  },
  methods: {
      showMenu(){

        this.isListVisible = !this.isListVisible;
    },
    logout() {

        this.userData.logOutUser();
        this.$router.push('/logout');

    }
  }
}
</script>
