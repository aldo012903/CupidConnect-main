<template>
    <div class="chat-input">
      <textarea
        v-model="newMessage"
        @keydown.enter.prevent="handleEnterKey"
        class="form-control chatInputBox w-full h-full"
        placeholder="Type a message..."
        rows="1"
      ></textarea>
      <button @click="sendMessage" class="send-button">
        <i class="fas fa-paper-plane fa-2x text-white"></i> 
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newMessage: '',
      };
    },
    methods: {
      handleEnterKey(event) {
        if (event.shiftKey) {
          this.newMessage += '\n';
          event.preventDefault();
        }else{
            this.sendMessage();
        }
      },
      sendMessage() {
        if (this.newMessage.trim() === '') return;
        this.$emit('new-message', this.newMessage);
        this.newMessage = '';
      },
    },
  };
</script>

  <style scoped>
  .chat-input {
    padding: 16px;
    background: transparent;
    border-top: 1px solid #686262;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .chatInputBox {
    color: white;
    border: none;
    background: transparent;
    resize: none; /* Prevent textarea from being resizable */
    overflow-y: auto; /* Enable vertical scrolling when content overflows */
  }
  
  .chatInputBox:focus {
    outline: none !important;
    border: none;
    box-shadow: none;
  }
  
  ::placeholder {
    color: #686262;
  }
  </style>
  