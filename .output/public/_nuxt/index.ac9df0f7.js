import{H as t}from"./entry.452b7f3a.js";const s=t("user",{state:()=>({user:"",email:""}),actions:{setuser(e){this.user=e},setEmail(e){this.email=e},likeProspectById(e){console.log(e+" Is liked")},dislikeProspectById(e){console.log(e+" Is not liked")},getAge(e){var r=Date.now()-e._dob;return r},getArrayOfChatHistoryProspects(){var e=this.getArrayOfProspects();return e},getChatHistory(){},getArrayOfLikedProspects(){var e=this.getArrayOfProspects();return e},getArrayOfProspectsWhoLikedUser(){var e=this.getArrayOfProspects();return e},logOutUser(){localStorage.removeItem("CupidConnectEmail"),localStorage.removeItem("CupidConnectuser"),localStorage.removeItem("CupidConnectToken"),localStorage.removeItem("CupidConnectType"),localStorage.removeItem("CupidConnectId")}}});export{s as u};