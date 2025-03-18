<template>
  <div class="bg-white p-6 rounded-lg shadow-md h-[100%]">
    <!-- Show Form When Not Submitted -->
    <div v-if="!submitted">
      <h2 class="text-xl font-bold mb-6 mt-4 text-center">Report An Issue</h2>
      <p class="text-gray-600 mb-6 text-center">To report an issue, fill in the form below.</p>

      <label class="block mb-2">Subject</label>
      <input 
        v-model="subject" 
        class="w-full border px-3 py-2 rounded-md mb-4" 
        placeholder="Enter subject"
      />

      <label class="block mb-2">Describe the issue</label>
      <textarea 
        v-model="description" 
        class="w-full h-[150px] border px-3 py-2 rounded-md" 
        placeholder="Describe..."
      ></textarea>

      <p class="mb-4"> Add a screenshot of the issue you are facing (optional) </p>

      <!-- Image Upload Section -->
      <div class="relative w-[100px] h-[100px] border-2 border-gray-300 border-dashed rounded-md flex items-center justify-center cursor-pointer mb-3" @click="selectImage">
        <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleFileUpload" />
        
        <!-- Show uploaded image -->
        <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover rounded-md" />
        
        <!-- Show plus icon if no image uploaded -->
        <img v-else src="../assets/plusicon.png" alt="Plus Icon" class="opacity-50" />
      </div>

      <!-- Submit Button (Disabled if inputs are empty) -->
      <button 
        @click="submitReport" 
        :disabled="!subject || !description"
        class="w-[50%] py-2 rounded-lg mx-auto block mb-5 text-white shadow-md transition-all"
        :class="{
          'bg-orange-500 hover:bg-orange-600': subject && description,
          'bg-gray-300 cursor-not-allowed': !subject || !description
        }"
      >
        Send Report
      </button>
    </div>

    <!-- Submission Confirmation -->
    <div v-if="submitted" class="flex flex-col items-center justify-center text-center p-8 bg-[#F9F9F9] rounded-lg shadow-md">
      <img :src="successIcon" alt="Success Icon" class="w-30 h-30 mb-4">  <!-- Increased icon size -->

      <h2 class="text-xl font-bold text-gray-800">Submitted!</h2>

      <!-- Formatted message exactly like the image -->
      <p class="text-gray-600 mt-2">
        Your complaint has been successfully submitted.
        You will get  <br> a response between 24 to 48 hours.
      </p>

      <button @click="resetForm" class="mt-6 px-10 py-2 bg-orange-500 text-white rounded-lg shadow-md w-[200px]">
        Done
      </button>
    </div>
  </div>
</template>

<script>
import successIcon from "../assets/successicon.png"; // Importing the success icon

export default {
  data() {
    return {
      subject: '',
      description: '',
      submitted: false,
      imagePreview: null, // Holds the uploaded image preview
      successIcon, // Assign imported icon
    };
  },
  methods: {
    // Function to trigger file input when clicking the plus icon
    selectImage() {
      this.$refs.fileInput.click();
    },

    // Handle file selection and preview
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.imagePreview = URL.createObjectURL(file);
      } else {
        alert('Please select a valid image file (PNG, JPG, JPEG)');
      }
    },

    // Submit Report - Hide form and show confirmation
    submitReport() {
      if (this.subject && this.description) {
        this.submitted = true;
      }
    },

    // Reset Form
    resetForm() {
      this.submitted = false;
      this.subject = '';
      this.description = '';
      this.imagePreview = null;
      this.$refs.fileInput.value = ''; // Reset file input
    },
  },
};
</script>
