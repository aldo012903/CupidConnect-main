import{_ as m,a as f}from"./generalMenu.343515dd.js";import{a as i,C as I,D as C,G as k,b as a,e as r,j as d,t as c,F as w,r as y,i as x,o as l,B as v,p as b,m as S}from"./entry.452b7f3a.js";import{_ as A}from"./_plugin-vue_export-helper.c27b6911.js";import"./nuxt-link.bdbb5b1b.js";import"./logoCupid.b8dda0a7.js";import"./index.ac9df0f7.js";import"./swiper-vue.05a5116d.js";const L={data(){return{userCurrent:"",_username:"",prospectsLiked:[],prospectsLikedSent:[],matches:[]}},mounted(){this._username=localStorage.getItem("CupidConnectuser"),this.fetchUser()},created:async function(){this.prospectsLiked=await this.getWhoLikedUsers(),this.prospectsLikedSent=await this.getLikedByUsers(),this.matches=await this.getMatches()},methods:{async getMatches(){try{const t=localStorage.getItem("CupidConnectId"),o=localStorage.getItem("CupidConnectToken"),n={userId:t},s=await i.post("https://espacionebula.com:8000/get-matches",n,{headers:{"Access-Control-Allow-Origin":"*",Authorization:`Bearer ${o}`},mode:"cors"}),e=s.data;if(e.success)return e.matches;console.log("There was an error with the user : "+s.data.error)}catch(t){console.error("Error in fetchUser:",t)}},async getWhoLikedUsers(){try{const t=localStorage.getItem("CupidConnectId"),o=localStorage.getItem("CupidConnectToken"),n={_liked_userId:t},s=await i.post("https://espacionebula.com:8000/get-likes-to-user",n,{headers:{"Access-Control-Allow-Origin":"*",Authorization:`Bearer ${o}`},mode:"cors"}),e=s.data;if(e.success)return e.usersWhoLiked;console.log("There was an error with the user : "+s.data.error)}catch{}},async getLikedByUsers(){try{const t=localStorage.getItem("CupidConnectId"),o=localStorage.getItem("CupidConnectToken"),n={liker_userId:t},s=await i.post("https://espacionebula.com:8000/get-likes-user",n,{headers:{"Access-Control-Allow-Origin":"*",Authorization:`Bearer ${o}`},mode:"cors"}),e=s.data;if(e.success)return e.usersWhoILiked;console.log("There was an error with the user : "+s.data.error)}catch{}},getAge(t){const o=new Date(t._dob),n=new Date,s=n.getFullYear()-o.getFullYear();return(n.getMonth()<o.getMonth()||n.getMonth()===o.getMonth()&&n.getDate()<o.getDate())&&s--,s},getIdentity(t){return I().getIdentitiesById(t)},getInterest(t){return C().getInterestsById(t)},getOrientation(){return k().getOrientationsById(this.selectedOrientation)},async fetchUser(){try{const t=localStorage.getItem("CupidConnectId"),o=localStorage.getItem("CupidConnectToken"),n={userId:t},s=await i.post("https://espacionebula.com:8000/get-user",n,{headers:{"Access-Control-Allow-Origin":"*",Authorization:`Bearer ${o}`},mode:"cors"}),e=s.data;e.success?(e.user.identities!=""&&(this.selectedIdentity=e.user.identities),e.user._description!=""&&(this.description=e.user._description),e.user._orientations!=""&&(this.selectedOrientation=e.user._orientations),this.selectedInterests=e.user._interests,e.user._pictures.length>0&&(this.pictures=e.user._pictures),this.userCurrent=e.user):(this.error="There was an error with the user : "+s.data.error,console.log("There was an error with the user : "+s.data.error),this.clearErrorMessageAfterDelay())}catch(t){console.error("Error in fetchUser:",t)}}}},B=t=>(b("data-v-eb237ab6"),t=t(),S(),t),M={class:"h-screen w-screen text-white flex relative"},O={class:"lg:hidden"},T={class:"hidden lg:block w-1/6"},U={class:"w-5/6 flex flex-col items-center mt-10"},D={class:"flex flex items-center"},j=["src"],z={class:"text-2xl"},P={class:"flex"},E={class:"mr-5"},F={class:"mr-5 ml-5"},W={class:"mr-5 ml-5"},G={class:"text-2xl font-bold mt-2"},N={class:"text-md flex"},V={class:"mt-10 w-5/6 flex items-center justify-center"},Y=["src"],q={key:0,class:"prospect-card border-2 border-[#686262] flex justify-center items-center"},H=B(()=>r("i",{class:"fa-solid fa-plus text-7xl text-[#686262]"},null,-1)),J=[H];function K(t,o,n,s,e,u){const h=m,_=f;return l(),a("div",M,[r("div",O,[d(h)]),r("div",T,[d(_)]),r("div",U,[r("div",D,[r("img",{src:"https://espacionebula.com/img/"+e.userCurrent._profilePicture,alt:"Profile photo",class:"w-48 h-48 m-10 rounded-full object-cover"},null,8,j),r("div",null,[r("div",z,c(e.userCurrent._username),1),r("div",P,[r("div",E,c(e.prospectsLiked.length+"  Likes recieved."),1),r("div",F,c(e.prospectsLikedSent.length+"  Likes sent."),1),r("div",W,c(e.matches.length+"  Matches."),1)]),r("div",G,c(e.userCurrent._fname+" "+e.userCurrent._lname),1),r("div",N,c(u.getAge(e.userCurrent)+"  years old."),1)])]),r("div",V,[(l(!0),a(w,null,y(e.userCurrent._pictures,(p,g)=>(l(),a("div",{class:"prospect-card",key:g},[r("img",{src:"https://espacionebula.com/img/"+p,alt:"Profile Picture",class:"profile-image flex flex-wrap",style:v(t.imageStyle)},null,12,Y)]))),128)),e.userCurrent._pictures&&Object.keys(e.userCurrent._pictures).length<5?(l(),a("div",q,J)):x("",!0)])])])}const se=A(L,[["render",K],["__scopeId","data-v-eb237ab6"]]);export{se as default};