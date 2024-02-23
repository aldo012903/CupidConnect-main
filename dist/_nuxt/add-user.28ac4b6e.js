import{_ as b}from"./nuxt-link.bdbb5b1b.js";import"./sweetalert2.all.fce410fa.js";import{b as c,e,w as f,f as a,h as i,t as _,i as g,j as u,k as w,o as h,l as x,p as v,m as y}from"./entry.452b7f3a.js";import{_ as D}from"./logoCupid.b8dda0a7.js";import{_ as k}from"./_plugin-vue_export-helper.c27b6911.js";import"./swiper-vue.05a5116d.js";const N={data(){return{email:"",username:"",password:"",confirmPassword:"",firstName:"",lastName:"",birthDate:"",error:""}},created(){},mounted(){},methods:{goToLogin(){this.$router.go("/Login")},async submitForm(){if(this.verify()){localStorage.removeItem("CupidConnectFirstRegisterData");const o={_email:this.email,_username:this.username,_password:this.password,_fname:this.firstName,_lname:this.lastName,_dob:this.birthDate},t=JSON.stringify(o);localStorage.setItem("CupidConnectFirstRegisterData",t),this.$router.push("/admin/users/add-user-continuation")}else this.clearErrorMessageAfterDelay()},verify(){const o=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,t=/^\d{4}-\d{2}-\d{2}$/,d=/^[a-zA-Z0-9_]{10,19}$/,l=/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/;if(!o.test(this.email))return this.error="Error in the email",console.log("Error in the email"),!1;if(this.password!==this.confirmPassword)return this.error="Passwords are differents",console.log("Passwords are differents"),!1;if(this.password.length<8)return this.error="Passwords must have more than 7 characters",console.log("Passwords must have more than 7 character"),!1;if(!t.test(this.birthDate))return this.error="Incorrect date format (YYYY-MM-DD)",console.log("Incorrect date format (YYYY-MM-DD)"),!1;const s=new Date(this.birthDate);return new Date().getFullYear()-s.getFullYear()<18?(this.error="You must be at least 18 years old to register.",console.log("You must be at least 18 years old to register"),!1):d.test(this.username)?l.test(this.firstName)?l.test(this.lastName)?(this.error="",!0):(this.error="The last name must not contain special characters",console.log("The last name must not contain special characters"),!1):(this.error="The first name must not contain special characters",console.log("The first name must not contain special characters"),!1):(this.error="The username must be at least 10 alphanumeric characters",console.log("The username must be at least 10 alphanumeric characters"),!1)},clearErrorMessageAfterDelay(){setTimeout(()=>{this.error=""},5e3)}}},p=o=>(v("data-v-37699c2e"),o=o(),y(),o),P={class:"container mx-auto mt-4"},T={class:"grid grid-cols-12 gap-5"},U=p(()=>e("div",{id:"Logo",class:"col-span-12 md:col-span-7 bg-black-200 p-4 flex justify-center"},[e("h2",{class:"text-xl font-semibold"},[e("img",{src:D,alt:"frameIcon"})])],-1)),Y={id:"content",class:"col-span-12 bg-black p-4 lg:border-l white h-full md:col-span-5 md:border-l"},V=p(()=>e("h2",{id:"Register",class:"text-xl font-semibold text-white flex flex-col justify-center items-center"}," Register ",-1)),I={class:"mb-8"},L={class:"mb-8"},C={class:"mb-8"},F={class:"mb-8"},M={class:"mb-8"},R={class:"mb-8"},S={class:"mb-8 grid grid-cols-12 items-center relative"},q={key:0,class:"text-red-500 text-center my-4"},A={id:"arrow-right",class:"mt-4"},z={type:"submit"},E={id:"btnLogin",class:"flex justify-center items-center mb-4"},Z={class:"cursor-pointer"};function j(o,t,d,l,s,n){const m=b;return h(),c("div",P,[e("div",T,[U,e("div",Y,[V,e("form",{class:"mt-8 md:mt-8 md:pr-20% text-white",onSubmit:t[7]||(t[7]=f((...r)=>n.submitForm&&n.submitForm(...r),["prevent"]))},[e("div",I,[a(e("input",{type:"email",id:"email",name:"email",class:"form-input mt-1 block w-10/12 border-black-300 border-b white",placeholder:"Email","onUpdate:modelValue":t[0]||(t[0]=r=>s.email=r),required:""},null,512),[[i,s.email]])]),e("div",L,[a(e("input",{type:"text",id:"username",name:"username",class:"form-input mt-1 block w-10/12 border-black-300 border-b white",placeholder:"Username","onUpdate:modelValue":t[1]||(t[1]=r=>s.username=r),required:""},null,512),[[i,s.username]])]),e("div",C,[a(e("input",{type:"password",id:"password",name:"password",class:"form-input mt-1 block w-10/12 border-black-300 border-b white",placeholder:"Password","onUpdate:modelValue":t[2]||(t[2]=r=>s.password=r),required:""},null,512),[[i,s.password]])]),e("div",F,[a(e("input",{type:"password",id:"confirmationPassword",name:"confirmationPassword",class:"form-input mt-1 block w-10/12 border-black-300 border-b white",placeholder:"Confirm Password","onUpdate:modelValue":t[3]||(t[3]=r=>s.confirmPassword=r),required:""},null,512),[[i,s.confirmPassword]])]),e("div",M,[a(e("input",{type:"text",id:"firstName",name:"firstName",class:"form-input mt-1 block w-10/12 border-black-300 border-b white",placeholder:"First name","onUpdate:modelValue":t[4]||(t[4]=r=>s.firstName=r),required:""},null,512),[[i,s.firstName]])]),e("div",R,[a(e("input",{type:"text",id:"lastName",name:"lastName",class:"form-input mt-1 block w-10/12 border-black-300 border-b white",placeholder:"Last name","onUpdate:modelValue":t[5]||(t[5]=r=>s.lastName=r),required:""},null,512),[[i,s.lastName]])]),e("div",S,[a(e("input",{type:"date",id:"birthDate",name:"birthDate",class:"form-input col-span-9 block border-black-300 border-b white",placeholder:"Date of birth","onUpdate:modelValue":t[6]||(t[6]=r=>s.birthDate=r),required:""},null,512),[[i,s.birthDate]])]),s.error?(h(),c("div",q,_(s.error),1)):g("",!0),e("div",A,[e("button",z,[u(m,{to:"admin/users/add-user"})])])],32),e("div",E,[e("label",Z,[e("button",{type:"submit",onClick:t[8]||(t[8]=(...r)=>n.goToLogin&&n.goToLogin(...r)),class:"bg-black-200 text-white flex items-center"},[u(m,{to:"/Login"},{default:w(()=>[x("Login")]),_:1})])])])])])])}const Q=k(N,[["render",j],["__scopeId","data-v-37699c2e"]]);export{Q as default};