<template>
  <div class="bg-white p-6 rounded-lg shadow-md mr-[90px]">
    <!-- Date and Time -->
    <div class="text-center text-gray-500 text-sm mb-4">
      26 Oct 2023 12:30PM
    </div>

    <!-- Chat Messages (Hidden Scrollbar, Auto-scroll Enabled) -->
    <div ref="chatContainer" class="p-4 h-96 overflow-y-auto custom-scroll">
      <div v-for="(message, index) in messages" :key="index" class="mb-4">
        <div v-if="!message.isUser" class="flex items-start space-x-2">
          <!-- Support Icon -->
          <img src="../assets/supportguy.png" alt="Support Icon" class="w-8 h-8 rounded-full bg-orange-200" />

          <div>
            <p class="font-semibold">MailPay Support</p>
            <div class="bg-yellow-100 p-3 rounded-2xl max-w-md w-[350px]">
              <span>{{ message.text }}</span>

              <!-- Display Uploaded Files Properly -->
              <div v-if="message.isFile" class="mt-2">
                <img 
                  :src="message.fileUrl" 
                  alt="Uploaded File" 
                  class="w-[180px] h-[180px] object-cover rounded-md border cursor-pointer" 
                  @click="viewImage(message.fileUrl)"
                />
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-1">{{ message.timestamp }}</p>
          </div>
        </div>

        <div v-else class="flex items-end justify-end space-x-2">
          <div>
            <div class="bg-gray-200 p-3 rounded-2xl max-w-md w-[350px]">
              <span>{{ message.text }}</span>

              <!-- Display Uploaded Files Properly -->
              <div v-if="message.isFile" class="mt-2">
                <img 
                  :src="message.fileUrl" 
                  alt="Uploaded File" 
                  class="w-[180px] h-[180px] object-cover rounded-md border cursor-pointer" 
                  @click="viewImage(message.fileUrl)"
                />
              </div>
            </div>
            <div class="flex items-center justify-end space-x-1">
              <img src="../assets/check.png" alt="Sent" class="w-4 h-4" />
              <p class="text-xs text-gray-500">{{ message.timestamp }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input & Send Button -->
    <div class="mt-4 flex items-center border-t pt-3">
      <!-- File Upload Icon -->
      <label for="file-upload" class="cursor-pointer">
        <img src="../assets/paperclip.png" alt="Attach" class="w-6 h-6 mr-3" />
      </label>
      <input 
        id="file-upload" 
        type="file" 
        class="hidden" 
        @change="handleFileUpload"
      />

      <!-- Input Box (Shorter) -->
      <input 
        v-model="newMessage"
        @keyup.enter="sendMessage" 
        class="flex-1 border px-3 py-2 rounded-md w-[250px]" 
        placeholder="Type a message..."
      />

      <!-- Bigger Send Button -->
      <button @click="sendMessage" class="bg-orange-500 text-white px-8 py-2 rounded-md ml-3 w-[150px]">
        Send
      </button>
    </div>

    <!-- Full-Screen Image Viewer -->
    <div v-if="fullScreenImage" class="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <img :src="fullScreenImage" alt="Full Screen" class="max-w-full max-h-full rounded-lg">
      <button @click="closeImage" class="absolute top-5 right-5 text-white text-2xl">&times;</button>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar but allow scrolling */
.custom-scroll {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE & Edge */
}
.custom-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
</style>

<script>
export default {
  data() {
    return {
      messages: [
        { text: "Hi, my name is Favour from Mailpay. How may I help you?", isUser: false, timestamp: "12:30PM" },
        { text: "Hi Favour, I made a transfer on October 24 but the person hasn’t received it.", isUser: true, timestamp: "12:31PM" },
        { text: "Alright, give me a minute, I’ll check and get back to you.", isUser: false, timestamp: "12:33PM" },
      ],
      newMessage: "",
      fullScreenImage: null,
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        this.messages.push({ text: this.newMessage, isUser: true, timestamp: time });
        this.newMessage = "";

        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        this.messages.push({
          text: "",
          fileUrl,
          isFile: true,
          isUser: true,
          timestamp: time,
        });

        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chatContainer;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    },
    viewImage(imageUrl) {
      this.fullScreenImage = imageUrl;
    },
    closeImage() {
      this.fullScreenImage = null;
    },
  },
};
</script>
