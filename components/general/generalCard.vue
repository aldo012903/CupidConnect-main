<template>
  <div
    v-if="index <= 5" 
    class="card"
    @mousedown="startDragging"
    @touchstart="startDragging"
    :style="cardStyle"
  >
    <div class="image-container">
      <div class="select-none pointer-events-none">
        <img
          v-for="(image, index) in prospect._pictures"
          :key="index"
          :src="'https://espacionebula.com/img/' + image"
          alt="Profile Picture"
          class="profile-image"
          :style="imageStyle"
        />
        <div class="text-overlay">
          <h2 class="name">{{ prospect._fname }}</h2>
          <p class="age">{{ getAge(prospect) }}</p>
        </div>
      </div>
      <div class="bg-black w-full h-full flex flex-col pl-[24px] pr-[24px]">
        <div class="w-full flex justify-between">
          <div class="flex flex-col justify-center">
            <div class="text-[48px] font-bold">
              {{ prospect._fname + " " + prospect._lname }}
            </div>
            <div class="text-[32px]">
              {{ getIdentity(prospect.identities)}}
            </div>
          </div>
          <div class="text-[128px] font-bold">
            {{ getAge(prospect) }}
          </div>
        </div>
        <div class="pt-[41px]">
          <span class="text-[32px] font-bold">About</span>
          <div class="text-[20px]">{{ prospect._description }}</div>
        </div>
        <div class="pt-[41px]">
          <span class="text-[32px] font-bold">Interests</span>
          <div class="flex mt-[13px] flex-wrap">
            <div
              v-for="(interest, index) in prospect._interests"
              class="text-[20px] border rounded-[90px] border-[#686262] pl-[12px] pr-[12px] mr-[3.5px] ml-[3.5px]"
              :key="index"
            >
              {{ getInterest(interest) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
import { useUserStore } from "@/stores/users";
import { useIdentitiesStore } from "@/stores/identities";
import { useInterestsStore } from "@/stores/interests";
import axios from 'axios';

export default {
  props: {
    prospect: Object,
    index: Number,
    permissionDrag: Boolean,
  },
  data() {
    return {
      startPoint: null,
      offsetX: 0,
      offsetY: 0,
      zIndex: 0,
      currentImageIndex: 0,
    };
  },
  computed: {
    cardStyle() {
      let rotation = 0;
      rotation = this.index * 5;
      let howBlur = 3;
      if (this.index == 0) {
        howBlur = 0;
      } 
      return {
        transform: `rotate(${rotation}deg) translateX(${this.index * 10}px)`,
        filter: `blur(${howBlur}px)`,
      };
    },
    imageStyle() {},
  },
  methods: {
    getAge(userUSER) {
      const dob = new Date(userUSER._dob);
      const today = new Date();
      var age = today.getFullYear() - dob.getFullYear();
      if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
      ) {
        age--;
      }
      return age;
    },
    resetRotation() {
      const cards = document.querySelectorAll(".prospect-card");
      cards.forEach((card, idx) => {
        if (idx !== this.index) {
          card.style.transition = "transform 1s";
          if (idx >= 1 && idx <= 2) {
            rotation = idx + 2;
          }
          card.computed.cardStyle();
        }
      });
    },
    startDragging(event) {
      if (!this.permissionDrag) {
        return;
      }
      if (this.isTouchDevice()) {
        event.preventDefault();
        const touch = event.changedTouches[0];
        if (!touch) {
          return;
        }
        this.startPoint = { x: touch.clientX, y: touch.clientY };
        document.addEventListener("touchmove", this.handleTouchMove);
        this.$el.style.transition = "transform 0s";
      } else {
        const { clientX, clientY } = event;
        this.startPoint = { x: clientX, y: clientY };
        document.addEventListener("mousemove", this.handleMouseMove);
        this.$el.style.transition = "transform 0s";
      }

      document.addEventListener("mouseup", this.handleMoveUp);
      document.addEventListener("touchend", this.handleTouchEnd);
      document.addEventListener("cancel", this.handleTouchEnd);
    },
    handleMove(x, y) {
      if (!this.permissionDrag) {
        return;
      }
      this.offsetX = x - this.startPoint.x;
      this.offsetY = y - this.startPoint.y;
      const rotate = this.offsetX * 0.1;
      this.$el.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) rotate(${rotate}deg)`;

      if (Math.abs(this.offsetX) > this.$el.clientWidth * 0.1) {
        this.dismiss(this.offsetX > 0 ? 1 : -1);
      }
    },
    getIdentity(identityId){
      return useIdentitiesStore().getIdentitiesById(identityId);
    },
    getInterest(interestId){
      return useInterestsStore().getInterestsById(interestId);
    },
    handleMouseMove(event) {
      event.preventDefault();
      if (!this.startPoint) return;
      const { clientX, clientY } = event;
      this.handleMove(clientX, clientY);
    },
    handleMoveUp() {
      this.startPoint = null;
      document.removeEventListener("mousemove", this.handleMouseMove);
      this.$el.style.transform = "";
    },
    handleTouchMove(event) {
      if (!this.startPoint) return;
      const touch = event.changedTouches[0];
      if (!touch) {
        return;
      }
      const { clientX, clientY } = touch;
      this.handleMove(clientX, clientY);
    },
    handleTouchEnd() {
      this.startPoint = null;
      document.removeEventListener("touchmove", this.handleTouchMove);
      this.$el.style.transform = "";
    },
    async dismiss(direction) {
      if (direction == 1) {
        try {
          const _userId = localStorage.getItem("CupidConnectId");;
          const token = localStorage.getItem("CupidConnectToken");
          const _prospectId = this.prospect._id;
          const dataf = {
            liker_userId: _userId,
            liked_userId: _prospectId,
          };
          const response = await axios.post( "https://espacionebula.com:8000/add-like",
            dataf,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
              },
              mode: "cors",
              }
          );
          const data = response.data;
          if (data.success) {
            console.log(data);
          } else {
              console.log(
              "There was an error with the user : " + response.data.error
              );
          }
        } catch (error) {
          console.error("Error in fetchUser:", error);
        }
      } else if (direction == -1) {
        try {
          const _userId = localStorage.getItem("CupidConnectId");;
          const token = localStorage.getItem("CupidConnectToken");
          const _prospectId = this.prospect._id;
          const dataf = {
            disliker_userId: _userId,
            disliked_userId: _prospectId,
          };
          const response = await axios.post( "https://espacionebula.com:8000/add-dislike",
            dataf,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
              },
              mode: "cors",
              }
          );
          const data = response.data;
          if (data.success) {
            console.log(data);
          } else {
              console.log(
              "There was an error with the user : " + response.data.error
              );
          }
        } catch (error) {
          console.error("Error in fetchUser:", error);
        }
      }
      this.startPoint = null;
      document.removeEventListener("mouseup", this.handleMoveUp);
      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("touchend", this.handleTouchEnd);
      document.removeEventListener("touchmove", this.handleTouchMove);

      const imageContainer = this.$el.querySelector(".image-container");
      if (imageContainer) {
        imageContainer.scrollTop = 0;
      }

      this.$el.style.transition = "transform 0.7s";
      this.$el.style.transform = `translate(${
        direction * window.innerWidth
      }px, ${this.offsetY}px) rotate(${90 * direction}deg)`;
      this.$el.addEventListener("transitionend", this.handleTransitionEnd);
    },
    handleTransitionEnd() {
      this.$el.style.transition = "transform 0s";
      this.$el.style.transform = "translate(0, 0)";
      this.$el.removeEventListener("transitionend", this.handleTransitionEnd);
      this.$emit("dismissed");
    },
    isTouchDevice() {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    },
  },
};
</script>
  
  <style scoped>
* {
  font-family: Inter;
}
.card {
  position: absolute;
  cursor: pointer;
  transition: transform 0.5s;
  width: 550px;
  height: 680px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  color: white;
}
@media screen and (max-width: 1024px) {
  .prospect-card {
    width: 350px;
    height: 480px;
  }
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none; 
}
.image-container::-webkit-scrollbar {
    display: none;
}

.profile-image {
  width: 550px;
  height: 680px;
  object-fit: cover;
}

.text-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 20%;
  width: 100%;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: linear-gradient(to bottom, transparent, black);
}

.name {
  color: #fff;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.age {
  color: #fff5f5;
  font-family: Inter;
  font-size: 96px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.description {
  font-size: 16px;
  margin: 5px 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 5px;
}

.banner {
  height: 30px; /* Adjust the banner height as needed */
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #000 100%);
  border-radius: 0 0 10px 10px;
}
</style>
  