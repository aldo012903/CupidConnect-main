<template>
  <div class="app-container bg-black">
    <div class="containerNav grid grid-cols-12">
      <div class="col-span-12"></div>
    </div>
    <div class="content-container grid grid-cols-12 min-h-screen">
      <div class="dos col-span-12">
        <NuxtPage class="" />
      </div>
    </div>
  </div>
</template>

<script setup >
useHead({
  title: "Cupid Connect",
  meta: [{ name: "description", content: "" }],
  bodyAttrs: {
    class: "test",
  },
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "https://cdn.icon-icons.com/icons2/532/PNG/64/love-stamp-3_icon-icons.com_52687.png",
    },
  ],
});
</script>

<script>
import { useIdentitiesStore } from "@/stores/identities";
import { useInterestsStore } from "@/stores/interests";
import { useOrientationsStore } from "@/stores/orientations";
import axios from "axios";

export default {
  created: async function () {
    const identities = await this.getIdentities();
    if (identities) {
      useIdentitiesStore().setIdentities(identities);
    }
    const interests = await this.getInterests();
    if (interests) {
      useInterestsStore().setInterests(interests);
    }
    const orientations = await this.getOrientations();
    if (orientations) {
      useOrientationsStore().setOrientations(orientations);
    }
  },
  methods: {
    async getIdentities() {
      try {
        const response = await axios.get(
          "https://espacionebula.com:8000/get-identities",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            mode: "cors",
          }
        );
        const data = response.data;
        if (data.success) {
          return data.identities;
        } else {
          console.log(
            "There was an error with the user : " + response.data.error
          );
        }
      } catch (error) {
      }
    },
    async getOrientations() {
      try {
        const response = await axios.get(
          "https://espacionebula.com:8000/get-orientations",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            mode: "cors",
          }
        );
        const data = response.data;
        if (data.success) {
          return data.orientations;
        } else {
          console.log(
            "There was an error with the user : " + response.data.error
          );
        }
      } catch (error) {
      }
    },
    async getInterests() {
      try {
        const response = await axios.get(
          "https://espacionebula.com:8000/get-interests",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            mode: "cors",
          }
        );
        const data = response.data;
        if (data.success) {
          return data.interests;
        } else {
          console.log(
            "There was an error with the user : " + response.data.error
          );
        }
      } catch (error) {
      }
    },
  },
};
</script>



<style>
* {
  margin: 0;
  padding: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  box-sizing: border-box;
  border-color: #686262;
  color: #fff5f5;
  font-family: Inter;
  line-height: normal;
  font-style: normal;
}
*::-webkit-scrollbar {
    display: none;
}
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
ul,
ol {
  list-style: none;
}
.container {
  height: fit-content;
  min-height: 100vh;
  min-width: 100vw;
  width: 100vw;
  z-index: -1;
}

.app-container {
  min-height: 100vh;
}
.content-container {
  flex-grow: 1;
}
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>