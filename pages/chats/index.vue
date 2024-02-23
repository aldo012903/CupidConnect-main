<template>
  <div class="flex">
    <div class="lg:hidden">
      <GeneralMenuPhone />
    </div>
    <div class="hidden lg:block w-1/6">
      <GeneralMenu />
    </div>
    <div class="w-1/6">
      <ChatList />
    </div>
    <div class="w-4/6">
      <div class="chat">
        <div class="flex items-center justify-center h-full">
          <div class="text-center">
            <i class="fas fa-envelope text-4xl text-gray-500 mb-4"></i> 
            <p class="text-2xl text-gray-500">
              There is not a chat opened right now.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animate: false, // Initial state for animation
    };
  },
  methods: {
  
  },
};
</script>

<style scoped>
.chat {
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  border-left: 1px solid #686262;
  border-radius: 8px;
  overflow: hidden;
}

.chat-history {
  padding: 16px;
  min-height: 95%;
  max-height: 95%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* Define the animation */
.w-fit {
  transition: opacity 0.5s ease-in-out;
}

/* Add animation for user messages */
.w-fit.user-message {
  animation: fadeInRight 0.5s ease-in-out;
}

/* Add animation for friend messages */
.w-fit.friend-message {
  animation: fadeInLeft 0.5s ease-in-out;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
