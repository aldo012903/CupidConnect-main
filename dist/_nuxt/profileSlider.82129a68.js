import{a as w,_ as f}from"./generalMenu.343515dd.js";import{C as v,D as I,G as y,a as k,b as o,e,j as b,F as _,r as p,t as d,l as i,o as c,p as S,m as C}from"./entry.452b7f3a.js";import{S as O}from"./swiper-vue.05a5116d.js";import{_ as D}from"./_plugin-vue_export-helper.c27b6911.js";import"./nuxt-link.bdbb5b1b.js";import"./logoCupid.b8dda0a7.js";import"./index.ac9df0f7.js";const A={data(){return{_username:"",description:"",identitiesData:[],selectedIdentity:null,orientationData:[],selectedOrientation:null,interestsData:[],selectedInterests:null,pictures:[],activeIndex:0,swiper:null}},mounted(){this.swiper=new O(".swiper-container",{loop:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{slideChange:()=>{this.activeIndex=this.swiper.realIndex}}}),localStorage.getItem("CupidConnectToken")||this.$router.push("/"),this._username=localStorage.getItem("CupidConnectuser"),this.fetchUser()},methods:{setActiveIndex(s){this.activeIndex=s,this.swiper.slideTo(s,300)},prevSlide(){this.swiper.slidePrev()},nextSlide(){this.swiper.slideNext()},handlePicturesChange(s){this.pictures=s.target.files},clearErrorMessageAfterDelay(){setTimeout(()=>{this.error=""},5e3)},getIdentity(s){return v().getIdentitiesById(s)},getInterest(s){return I().getInterestsById(s)},getOrientation(){return y().getOrientationsById(this.selectedOrientation)},async fetchUser(){try{const s=localStorage.getItem("CupidConnectId"),a=localStorage.getItem("CupidConnectToken"),h={userId:s},u=await k.post("https://espacionebula.com:8000/get-user",h,{headers:{"Access-Control-Allow-Origin":"*",Authorization:`Bearer ${a}`},mode:"cors"}),t=u.data;t.success?(t.user.identities!=""&&(this.selectedIdentity=t.user.identities),t.user._description!=""&&(this.description=t.user._description),t.user._orientations!=""&&(this.selectedOrientation=t.user._orientations),this.selectedInterests=t.user._interests,t.user._pictures.length>0&&(this.pictures=t.user._pictures)):(this.error="There was an error with the user : "+u.data.error,console.log("There was an error with the user : "+u.data.error),this.clearErrorMessageAfterDelay())}catch(s){console.error("Error in fetchUser:",s)}}}},n=s=>(S("data-v-a0b9c037"),s=s(),C(),s),B={class:"h-full w-screen text-white flex"},E={class:"hidden lg:block w-1/6"},T={class:"mx-10 mb-5 sm:mx-40 lg:mx-60"},M={class:"border-black-300 rounded-3xl mt-5 bg-black border-b border-gray"},N={class:"px-8"},P={class:"pt-10 w-fit lg:w-72 overflow-hidden relative"},G={class:"w-fit lg:w-72 swiper-container"},U={class:"swiper-wrapper"},V=["src"],z={class:"bg-transparent flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2"},F=["aria-current","aria-label","onClick"],j={class:"text-5xl p-4 leading-6 lg:m-8 pt-10 w-full lg:ml-2 lg:w-11/12 block",type:"text"},q={class:"text-xl p-4 leading-6 text-white p-10 w-full lg:ml-2 lg:w-11/12 block",type:"text"},L=n(()=>e("b",null,"Description:",-1)),H=n(()=>e("br",null,null,-1)),J=n(()=>e("br",null,null,-1)),K={class:"text-xl p-4 leading-6 p-10 w-full lg:ml-2 lg:w-11/12 block",type:"text",name:"description",required:""},Q=n(()=>e("b",null,"Identity:",-1)),R=n(()=>e("br",null,null,-1)),W=n(()=>e("br",null,null,-1)),X={class:"text-xl p-4 leading-6 p-10 w-full lg:ml-2 lg:w-11/12 block",type:"text"},Y=n(()=>e("b",null,"Orientation:",-1)),Z=n(()=>e("br",null,null,-1)),$=n(()=>e("br",null,null,-1)),ee={class:"text-xl p-4 leading-6 p-10 w-full lg:ml-2 lg:w-11/12 block",type:"text"},te=n(()=>e("b",null,"interests:",-1)),se=n(()=>e("br",null,null,-1)),re=n(()=>e("br",null,null,-1)),ne=n(()=>e("div",{class:"text-left text-2xl"},[e("button",{class:"bg-black-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"}," Edit Info ")],-1)),ie={class:"lg:hidden fixed left-0 right-0 bottom-0 bg-gray-800 p-4"};function le(s,a,h,u,t,l){const x=w,m=f;return c(),o("div",B,[e("div",E,[b(x)]),e("div",T,[e("div",M,[e("div",N,[e("div",P,[e("div",G,[e("div",U,[(c(!0),o(_,null,p(t.pictures,(r,g)=>(c(),o("div",{key:g,class:"p-15 white swiper-slide"},[e("img",{src:"https://espacionebula.com/img/"+r,alt:"Profile photo",class:"rounded-lg"},null,8,V)]))),128))]),e("div",{class:"swiper-button-prev bg-transparent",onClick:a[0]||(a[0]=(...r)=>l.prevSlide&&l.prevSlide(...r))}),e("div",{class:"swiper-button-next bg-transparent",onClick:a[1]||(a[1]=(...r)=>l.nextSlide&&l.nextSlide(...r))})]),e("div",z,[(c(!0),o(_,null,p(t.pictures,r=>(c(),o("button",{key:r,type:"button",class:"w-3 h-3 rounded-full","aria-current":r===t.activeIndex,"aria-label":"Slide "+(r+1),onClick:g=>l.setActiveIndex(r)},null,8,F))),128))])])]),e("div",j,[e("b",null,d(t._username),1)]),e("div",q,[L,i(),H,i(),J,i(d(t.description),1)]),e("div",K,[Q,i(),R,i(),W,i(" "+d(l.getIdentity(t.selectedIdentity)),1)]),e("div",X,[Y,i(),Z,i(),$,i(d(l.getOrientation(t.selectedOrientation)),1)]),e("div",ee,[te,i(),se,re,(c(!0),o(_,null,p(t.selectedInterests,r=>(c(),o("span",{key:r,class:"px-2 py-1 rounded-3xl bg-black border border-gray rounded-xl inline-block"},d(l.getInterest(r)),1))),128))])]),ne]),e("div",ie,[b(m)])])}const he=D(A,[["render",le],["__scopeId","data-v-a0b9c037"]]);export{he as default};