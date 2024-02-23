import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {

  state: () => ({

    user: '',
    email: '',

  }),

  actions: {

    setuser(user) {
      this.user = user;
    },
    setEmail(email) {
      this.email = email;
    },

    likeProspectById(id){
      console.log(id + " Is liked");
    },
    dislikeProspectById(id){
      console.log(id + " Is not liked");
    },
    getAge(user){
      var age = Date.now() - user._dob;
      return age;
    },
    getArrayOfChatHistoryProspects(){
      var prospects = this.getArrayOfProspects();
      return prospects;
    },
    getChatHistory(){

    },
    getArrayOfLikedProspects(){
      var prospects = this.getArrayOfProspects();
      return prospects;
    }, 
    getArrayOfProspectsWhoLikedUser(){
      var prospects = this.getArrayOfProspects();
      return prospects;
    },
    logOutUser(){
      localStorage.removeItem('CupidConnectEmail');
      localStorage.removeItem('CupidConnectuser');
      localStorage.removeItem('CupidConnectToken');
      localStorage.removeItem('CupidConnectType');
      localStorage.removeItem('CupidConnectId');
    }
  },
})