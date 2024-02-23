<template>
    <div :class="['chat-bubble', message.sender === senderUser ? 'user-message' : 'friend-message']">
      <p class="message" v-html="formattedMessage"></p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: Object,
        required: true,
      },
      senderUser: String,
    },
    computed: {
      formattedMessage() {
        return this.message.text.replace(/\n/g, '<br>');
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-bubble {
    display: inline-block;
    background-color: transparent;
    color: #ffffff;
    border: 1px solid #686262; 
    border-radius: 8px;
    padding: 8px 12px;
    margin: 8px;
    max-width: 70%;
    white-space: pre-line; 
  }
  
  .user-message {
    float: right;
    background-color: transparent;
    align-self: flex-end; 
  }
  
  .friend-message {
    float: left;
    background-color: #444141;
    opacity: 0.5;
    color: #fff;
  }
  
  .message {
    margin: 0;
    clear: both; 
  }
  </style>
  