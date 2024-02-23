<template>
  <div class="container mx-auto mt-4">
    <div class="grid grid-cols-12 gap-5">
      <div
        id="Logo"
        class="col-span-12 md:col-span-7 bg-black-200 p-4 flex justify-center"
      >
        <h2 class="text-xl font-semibold">
          <img src="@/assets/logoCupid.svg" alt="frameIcon" />
        </h2>
      </div>

      <div
        id="content"
        class="col-span-12 bg-black p-4 lg:border-l white h-full md:col-span-5 md:border-l"
      >
        <h2
          id="Register"
          class="text-xl font-semibold text-white flex flex-col justify-center items-center"
        >
          Register
        </h2>

        <form
          class="mt-8 md:mt-8 md:pr-20% text-white"
          @submit.prevent="submitForm"
        >
          <div class="mb-8">
            <input
              type="email"
              id="email"
              name="email"
              class="form-input mt-1 block w-10/12 border-black-300 border-b white text-lg"
              placeholder="Email"
              v-model="email"
              required
            />
          </div>

          <div class="mb-8">
            <input
              type="text"
              id="username"
              name="username"
              class="form-input mt-1 block w-10/12 border-black-300 border-b white text-lg"
              placeholder="Username"
              v-model="username"
              required
            />
          </div>

          <div class="mb-8">
            <input
              type="password"
              id="password"
              name="password"
              class="form-input mt-1 block w-10/12 border-black-300 border-b white text-lg"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>

          <div class="mb-8">
            <input
              type="password"
              id="confirmationPassword"
              name="confirmationPassword"
              class="form-input mt-1 block w-10/12 border-black-300 border-b white text-lg"
              placeholder="Confirm Password"
              v-model="confirmPassword"
              required
            />
          </div>

          <div class="mb-8">
            <input
              type="text"
              id="firstName"
              name="firstName"
              class="form-input mt-1 block w-10/12 border-black-300 border-b white text-lg"
              placeholder="First name"
              v-model="firstName"
              required
            />
          </div>

          <div class="mb-8">
            <input
              type="text"
              id="lastName"
              name="lastName"
              class="form-input mt-1 block w-10/12 border-black-300 border-b white text-lg"
              placeholder="Last name"
              v-model="lastName"
              required
            />
          </div>

          <div class="mb-8 grid grid-cols-12 items-center relative">
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              class="form-input col-span-9 block border-black-300 border-b white text-lg"
              placeholder="Date of birth"
              v-model="birthDate"
              required
            />
          </div>

          <!-- error -->
          <div v-if="error" class="text-red-500 text-center my-4">
            {{ error }}
          </div>

          <div id="arrow-right" class="mt-4">
            <button type="submit">
              <img src="@/public/img/arrow-right.png" alt="arrowImg" />

              <!--<nuxt-link to="/add-user-continuation">
             </nuxt-link>-->
            </button>
          </div>
        </form>

        <div class="flex justify-center items-center mb-4 btnLogin">
          <label class="cursor-pointer">
              <nuxt-link class="btn" to="/Login">Login</nuxt-link>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
#content {
  margin-left: 5%;

  @screen lg {
    margin-left: 23%;
  }
}

div {
  line-height: 1em;
  background-color: black;
}

icon {
  font-size: 24px;
  color: white;
}

#Register {
  padding-top: 1.5em;
  font-size: 5em;
  font-family: "Lovers Quarrel", serif;
  font-weight: normal;
}

#arrow-right {
  margin-left: 76%;
}
.btnStyleLogin{
  font-family: "Lovers Quarrel", serif;

}
.btn{
  font-family: "Lovers Quarrel", serif;
}
.btnLogin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 4em;
  margin-top: 1.5em;
  margin-left: 1.5em;
  font-family: "Lovers Quarrel", serif;
  font-weight: normal;
  margin-inline-start: 3%;
}

form {
  padding-top: 5em;
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
import { parseClassNames } from "@fullcalendar/core/internal";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      error: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    goToLogin() {
      this.$router.go("/Login");
    },

    async submitForm() { 
      if (this.verify()) { 
        localStorage.removeItem("CupidConnectFirstRegisterData");

        const data = {
          _email: this.email,
          _username: this.username,
          _password: this.password,
          _fname: this.firstName,
          _lname: this.lastName,
          _dob: this.birthDate,
        };

        const serializedData = JSON.stringify(data);

        localStorage.setItem("CupidConnectFirstRegisterData", serializedData);
        this.$router.push("/admin/users/add-user-continuation");

      } else {
        this.clearErrorMessageAfterDelay();
      }
    },

    verify() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
      const usernameRegex = /^[a-zA-Z0-9_]{10,19}$/;
      const nameRegex = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/;

      if (!emailRegex.test(this.email)) {
        this.error = "Error in the email";
        console.log("Error in the email");
        return false;
      }

      if (this.password !== this.confirmPassword) {
        this.error = "Passwords are differents";
        console.log("Passwords are differents");
        return false;
      }

      if (this.password.length < 8) {
        this.error = "Passwords must have more than 7 characters";
        console.log("Passwords must have more than 7 character");
        return false;
      }

      if (!birthDateRegex.test(this.birthDate)) {
        this.error = "Incorrect date format (YYYY-MM-DD)";
        console.log("Incorrect date format (YYYY-MM-DD)");
        return false;
      }

      const birthDateUser = new Date(this.birthDate);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDateUser.getFullYear();

      if (age < 18) {
        this.error = "You must be at least 18 years old to register.";
        console.log("You must be at least 18 years old to register");
        return false;
      }

      if (!usernameRegex.test(this.username)) {
        this.error = "The username must be at least 10 alphanumeric characters";
        console.log("The username must be at least 10 alphanumeric characters");
        return false;
      }

      if (!nameRegex.test(this.firstName)) {
        this.error = "The first name must not contain special characters";
        console.log("The first name must not contain special characters");
        return false;
      }

      if (!nameRegex.test(this.lastName)) {
        this.error = "The last name must not contain special characters";
        console.log("The last name must not contain special characters");
        return false;
      }

      this.error = "";
      return true;
    },
    clearErrorMessageAfterDelay() {
      setTimeout(() => {
        this.error = "";
      }, 5000);
    },
  },
};
</script>
  
<style scoped>
.container {
  max-width: 480px;
  margin: 0 auto;
}
</style>
  