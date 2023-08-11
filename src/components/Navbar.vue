<template>
  <nav class="h-20 bg-primary">
    <div
      class="h-full max-w-[1200px] mx-auto flex items-center justify-between"
    >
      <router-link to="/">
        <div
          class="text-secondary border-4 border-secondary px-2 py-1 text-lg font-bold leading-relaxed uppercase"
        >
          HOME
        </div>
      </router-link>

      <div class="flex items-center" id="example-navbar-warning">
        <ul class="flex flex-col gap-x-6 lg:flex-row list-none lg:ml-auto">
          <RouterLink
            class="text-secondary text-lg font-md"
            v-if="user && user.role === 'staff'"
            to="/staff/complaints"
            >Your Complaints</RouterLink
          >
          <RouterLink
            class="text-secondary text-lg font-md"
            v-if="user && user.role === 'staff'"
            to="/staff/fileComplaint"
            >File Complaint</RouterLink
          >
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
        </ul>
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
