

<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-12 gap-5  h-screen">
      <div
        id="Logo"
        class="col-span-12 bg-black-200 p-4 flex justify-center md:col-span-7 hidden sm:hidden md:grid"
      >
        <img src="@/assets/logoCupid.svg" class="h-128" alt="frameIcon" />
      </div>
      <div class="col-span-12 bg-black p-4 lg:border-l white h-full md:col-span-5 md:border-l flex flex-col justify-between">
        <div>
          <h2
            id="Login"
            class="text-xl font-semibold text-white flex flex-col justify-center items-center"
          >
            Log in
          </h2>
          <form class="md:mt-8 md:pr-20% text-white" @submit.prevent="login">
            <div class="mb-8 pl-5 pr-5">
              <input
                type="email"
                id="username"
                name="username"
                class="form-input pt-1 pb-2 block w-full border-black-300 border-b white text-lg"
                placeholder="Email"
                v-model="username"
                required
              />
            </div>
            <div class="pl-5 pr-5">
              <input
                type="password"
                id="password"
                name="password"
                class="form-input pt-1 pb-2 block w-full border-gray-300 border-b white text-lg"
                placeholder="Password"
                v-model="password"
                required
              />
            </div>
            <div v-if="error" class="text-red-500 text-center my-4">
              {{ error }}
            </div>
            <div id="arrow-right" class="mt-8">
              <button type="submit">
                <img src="@/public/img/arrow-right.png" alt="arrowIcon" />
              </button>
            </div>
          </form>
        </div>
        <div id="btnRegister" class="flex justify-center items-center">
          <label for="registerButton" class="cursor-pointer">
            <button
              id="registerButton"
              type="submit"
              class="flex items-center"
            >
              <nuxt-link to="admin/users/add-user" id="btnRegister">Register</nuxt-link>
            </button>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
#content {

}
#arrow-right {
  margin-left: 76%;
}
div {
  line-height: 1em;
  background-color: black;
}
#Logo {
  margin-left: 3em;
  align-items: center;
  background-color: black;
  color: white;
}
icon {
  font-size: 24px;
  color: white;
}
#Login {
  padding-top: 1.5em;
  margin-bottom: 15%;
  font-size: 8em;
  font-family: "Lovers Quarrel", serif;
  font-weight: normal;
}

#btnRegister {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  font-family: "Lovers Quarrel", serif;
  font-weight: normal; 
  padding-right: 5px;
}
input {
  background-color: black;
}
input::placeholder {
  color: white;
  font-size: 1.5em;
}
</style>
  <script>
import { defineComponent, ref } from "vue";
import { useUserStore } from "../../stores/users";
import axios from "axios";

export default defineComponent({
  components: {},
  created() {},
  mounted() {},
  data() {
    return {
      username: "",
      password: "",
      wrongPass: false,
      error: "",
      userData: useUserStore(),
    };
  },
  methods: {
    async login() {
      try {
        const data = {
          _email: this.username,
          _password: this.password,
        };
        const response = await axios.post(
          "https://espacionebula.com:8000/sign-in",
          data,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            mode: "cors",
          }
        );
        if (response.data.success) {

          this.wrongPass = false;
          localStorage.setItem("CupidConnectToken", response.data.token);
          localStorage.setItem("CupidConnectEmail", response.data.user._email);
          localStorage.setItem(
            "CupidConnectuser",
            response.data.user._username
          );
          localStorage.setItem("CupidConnectType", response.data.user._type);
          localStorage.setItem("CupidConnectId", response.data.user._id);
          this.userData.setEmail(localStorage.getItem("CupidConnectEmail"));
          this.userData.setuser(localStorage.getItem("CupidConnectuser"));

          this.$router.push("/");
        } else {
          this.wrongPass = true;
          this.error = response.data.error;
          console.log(response.data.error);
        }
      } catch (error) {
        console.error("error exploto aca" + error);
      }
    },
  },
  setup() {},
});
</script>

