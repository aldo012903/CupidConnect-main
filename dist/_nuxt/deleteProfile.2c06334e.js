import{u as d}from"./index.ac9df0f7.js";import{a as m,b as i,e,f as h,h as p,t as g,i as f,o as u,p as _,m as x}from"./entry.452b7f3a.js";import{_ as y}from"./_plugin-vue_export-helper.c27b6911.js";import"./swiper-vue.05a5116d.js";const v={data(){return{username:"",error:"",userData:d()}},mounted(){localStorage.getItem("CupidConnectToken")||this.$router.push("/login")},methods:{async deleteMessage(){if(this.verify()){const t=localStorage.getItem("CupidConnectId"),r=localStorage.getItem("CupidConnectToken"),l={userId:t},s=await m.post("https://espacionebula.com:8000/delete-user",l,{headers:{"Access-Control-Allow-Origin":"*",Authorization:`Bearer ${r}`},mode:"cors"});s.data.success?(this.userData.logOutUser(),this.$router.push("/delete")):(this.error=s.data.error,console.log(s.data.error),this.clearErrorMessageAfterDelay())}else this.clearErrorMessageAfterDelay()},verify(){return this.username?this.username.length<10?(this.error="Your username must have at least 10 characters",console.log("Your username must have at least 10 characters"),!1):this.username!=localStorage.getItem("CupidConnectuser")?(this.error="Error "+this.username+" is not your user name",console.log("Error "+this.username+" is not your user name"),!1):!0:(this.error="Please write your username",console.log("Please write your username"),!1)},clearErrorMessageAfterDelay(){setTimeout(()=>{this.error=""},5e3)}}},c=t=>(_("data-v-3a03c167"),t=t(),x(),t),b={class:"grid col-4 flex items-center justify-center h-screen text-white"},C=c(()=>e("div",{class:"white mx-40 text-5xl lg:text-9xl"},[e("h1",null,"Delete Profile")],-1)),I={class:"mx-40 lg:mx-72 md:text-md lg:text-lg"},k=c(()=>e("span",{class:"block font-medium"}," Please to delete enter username: ",-1)),w={class:"w-32 mx-40 lg:mx-80 font-medium hover:bg-gray-700 p-5 text-lg flex justify-center border border-white p-5"},D={key:0,class:"text-red-500 text-center my-4"};function S(t,r,l,s,o,n){return u(),i("div",b,[C,e("div",I,[e("label",null,[k,h(e("input",{class:"form-input border-black-300 mt-3 bg-black border border-gray",type:"text",id:"username",name:"username",placeholder:"Username","onUpdate:modelValue":r[0]||(r[0]=a=>o.username=a),required:""},null,512),[[p,o.username]])])]),e("div",w,[e("button",{onClick:r[1]||(r[1]=(...a)=>n.deleteMessage&&n.deleteMessage(...a))}," Delete ")]),o.error?(u(),i("div",D,g(o.error),1)):f("",!0)])}const B=y(v,[["render",S],["__scopeId","data-v-3a03c167"]]);export{B as default};