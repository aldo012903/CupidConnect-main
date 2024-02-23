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
          <ChatInfoPanel 
            class="chat-panel" 
          />
          <div ref="chatHistory" class="chat-history">
            <ChatBubble
              v-for="(message, index) in messages"
              :key="index"
              :message="message"
              :senderUser = ownUser
              class="w-fit"
              :user-message="message.sender === ownUser"
              :animate="animate"
              @mountedChatBubble="scrollToBottom"
            />
          </div>
          <ChatInput @new-message="addMessage" class="chat-input"/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ChatInfoPanel from '@/components/chat/chatInfoPanel.vue'; 
  import { useUserStore } from '@/stores/users'
  import io from 'socket.io-client'
  import axios from 'axios';

  export default {
    components: {
      ChatInfoPanel,
    },
    data() {
      return {
        socket : null,
        roomId : '',
        selectedUser: this.getUserId(),
        ownUser: localStorage.getItem("CupidConnectId"),
        messages: [
        ],
        animate: false, 
      };
    },
    async mounted() {
      this.socket = io('https://espacionebula.com:8000');
      this.roomId = await this.getRoomId();
      this.socket.emit('join room', this.roomId);
      this.socket.on('chat message', (user,text) => {
        this.messages.push({
          text: text,
          sender: user,
        });
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        setTimeout(() => {
          this.animate = true;
        }, 500);
      });
      this.messages = await this.getHistory();
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      setTimeout(() => {
          this.animate = true;
      }, 500);
    },
    methods: {
      async getHistory(){
        try {
          const userId = localStorage.getItem("CupidConnectId");
          const token = localStorage.getItem("CupidConnectToken");
          const dataf = {
            matchId: this.roomId,
            userId: userId,
          };
          const response = await axios.post(
            "https://espacionebula.com:8000/get-message",
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
            return data.messages;
          } else {
            this.clearErrorMessageAfterDelay();
          }
        } catch (error) {
        }
      },
      addMessage(newMessage) {
        const _userId = localStorage.getItem("CupidConnectId");
        this.socket.emit('chat message', this.roomId,  _userId, newMessage);
        this.newMessage = newMessage;

        this.animate = true;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        setTimeout(() => {
          this.animate = false;
        }, 500);
      },
      scrollToBottom() {
        const chatHistory = this.$refs.chatHistory;
        chatHistory.scrollTop = chatHistory.scrollHeight;
      },
      getUserId(){
        return useRoute().params.id;
      },
      async getRoomId(){
        try {
          const _userId = localStorage.getItem("CupidConnectId");
          const token = localStorage.getItem("CupidConnectToken");
          
          const dataf = {
            userId1: _userId,
            userId2: this.selectedUser,
          };
          const response = await axios.post(
            "https://espacionebula.com:8000/get-match",
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
            return data.match._id;
          } else {
          }
        } catch (error) {
        }
      }
    },
    created: async function () {
      this.roomId = await this.getRoomId();
    },
  };
  </script>
  
  <style scoped>
  .chat-list{
    max-height: 100vh;
  }
  .chat-input{
    max-height: 8%;
  }
  .chat-panel{
    height: 12%;
  }
  .chat {
    max-width: 100%;
    height: 100vh;
    margin: 0 auto;
    border-left: 1px solid #686262;
    overflow: hidden;
  }
  
  .chat-history {
    padding: 16px;
    min-height: 80%;
    max-height: 80%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  .w-fit {
    transition: opacity 0.5s ease-in-out;
  }
  .w-fit.user-message {
    animation: fadeInRight 0.5s ease-in-out;
  }
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
  