<template>
  <div class="bg-[#F9F9F9] p-8 rounded-lg shadow-md max-w-lg mx-auto">
    <h2 class="text-xl font-bold mb-6">FAQ</h2>

    <div v-for="(faq, index) in faqs" :key="index" class="mb-3">
      <!-- FAQ Question -->
      <div 
        class="flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-300"
        :class="faq.open ? 'bg-[#FFF6EE]' : 'bg-white hover:bg-gray-100'"
        @click="toggleFAQ(index)"
      >
        <span class="font-medium text-orange-600 text-[16px]">{{ faq.question }}</span>

        <!-- Toggle Icon -->
        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-100">
          <img 
            v-if="faq.open" 
            src="../assets/minusicon.png" 
            alt="Minus" 
          />
          <img 
            v-else 
            src="../assets/addicon.png" 
            alt="Plus" 
          />
        </div>
      </div>

      <!-- FAQ Answer -->
      <transition name="fade">
        <div 
          v-if="faq.open" 
          class="p-4 text-gray-600 bg-white leading-relaxed"
        >
          {{ faq.answer }}
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

<script>
export default {
  data() {
    return {
      faqs: [
        { question: "How do I change my password?", answer: "To reset your password, go to the 'Settings' page. Click on 'Change Password' and follow the instructions.", open: true },
        { question: "How can I contact support?", answer: "You can reach out to our support team through the contact form or email.", open: false },
        { question: "Can I change my email address?", answer: "Yes, go to your account settings and update your email.", open: false },
        { question: "How do I report a problem?", answer: "Use the 'Report Issue' section in the app to notify us.", open: false },
        { question: "How do I edit my profile?", answer: "Navigate to your profile page and click on 'Edit'.", open: false },
      ],
    };
  },
  methods: {
    toggleFAQ(index) {
      this.faqs[index].open = !this.faqs[index].open; 
      //🔥 multiple FAQs can stay open at the same time!
    },
  },
};
</script>
