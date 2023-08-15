<template>
  <nav class="h-20 bg-primary">
    <div
      class="h-full lg:p-0 px-10 max-w-[1200px] mx-auto flex items-center justify-between"
    >
      <router-link to="/">
        <div
          class="text-secondary border-4 border-secondary px-2 py-1 text-lg font-bold leading-relaxed uppercase"
        >
          JUW
        </div>
      </router-link>
      <div
        v-if="user"
        class="pl-32 uppercase font-medium text-2xl cursor-default"
      >
        {{ user.user_type }} portal
      </div>
      <div class="relative flex gap-x-6 items-center">
        <!-- Staff links -->
        <RouterLink
          class="text-secondary text-lg hover:font-medium"
          v-if="user && user.user_type === 'staff'"
          to="/staff/complaints"
          >Your Complaints</RouterLink
        >
        <RouterLink
          class="text-secondary text-lg hover:font-medium"
          v-if="user && user.user_type === 'staff'"
          to="/staff/fileComplaint"
          >File a Complaint</RouterLink
        >
        <!-- Technician links -->
        <RouterLink
          class="text-secondary text-lg hover:font-medium"
          v-if="user && user.user_type === 'technician'"
          to="/technician/changeCategory"
          >Change Category</RouterLink
        >
        <RouterLink
          class="text-secondary text-lg hover:font-medium"
          v-if="user && user.user_type === 'technician'"
          to="/technician/complaints"
          >View Complaints</RouterLink
        >
        <!-- General Links -->
        <RouterLink
          class="text-secondary text-lg font-md"
          v-if="!user"
          to="/login"
          >Login</RouterLink
        >
        <RouterLink
          class="text-secondary text-lg font-md"
          v-if="!user"
          to="/signup"
          >Signup</RouterLink
        >
        <button
          class="text-secondary text-lg font-md"
          v-if="user"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGeneralStore } from "../stores/useGeneral";
import { ref } from "vue";
const { logout } = useGeneralStore();
const { user } = storeToRefs(useGeneralStore());
import { RouterLink } from "vue-router";
// const navBarOpen = ref(false);
</script>
