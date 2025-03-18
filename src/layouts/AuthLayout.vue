<template>
  <div class="p-8">
    <h2 class="text-gray-700 font-semibold text-lg mb-6">Can We Help You?</h2>

    <div class="flex bg-gray-100 p-6 rounded-lg">
      <!-- Sidebar -->
      <div class="w-[22%] bg-white p-6 rounded-lg shadow-md">
        <nav class="space-y-8">
          <RouterLink 
            to="/report-issue" 
            class="block relative text-gray-700 text-[16px] transition duration-300"
            active-class="active"
          >
            Report An Issue
          </RouterLink>

          <RouterLink 
            to="/chat-support" 
            class="block relative text-gray-700 text-[16px] transition duration-300"
            active-class="active"
          >
            Chat With Us
          </RouterLink>

          <RouterLink 
            to="/faq" 
            class="block relative text-gray-700 text-[16px] transition duration-300"
            active-class="active"
          >
            FAQ
          </RouterLink>
        </nav>
      </div>

      <!-- Content -->
      <div class="w-[78%] pl-8">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Active & hover link style */
.active, a:hover {
  color: #F97316; /* Orange text */
  font-weight: 600;
  position: relative;
}

/* Underline adapts to text length */
.active::after,
a:hover::after {
  content: "";
  display: block;
  width: 110px;  /* Makes width match text */
  min-width: 30px;  /* Ensures a minimum underline */
  height: 2px;
  background: #F97316;
  position: absolute;
  left: 0;
  bottom: -3px;
}
</style>
