<template>
  <div>{{ user.role }}</div>
  <div v-if="!user.title" class="flex flex-col items-center justify-center">
    <div class="text-2xl">Select Role</div>
    <form class="flex flex-col" action="" @submit.prevent="updateTitle">
      <select v-model="userTitle" name="role" id="role">
        <option v-for="role in responsejson" :value="role.rid">
          {{ role.role }}
        </option>
      </select>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useGeneralStore } from "../stores/useGeneral";
import { ref, onMounted } from "vue";
const userTitle = ref("");
const responsejson = ref([]);
const { user } = storeToRefs(useGeneralStore());
onMounted(async () => {
  const response = await fetch("http://localhost:3001/api/tech_roles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  responsejson.value = await response.json();
  console.log(responsejson);
});
const updateTitle = async () => {
  user.value.title = responsejson.value[userTitle.value].role;
  const response = await fetch("http://localhost:3001/api/assign_role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: user.value.uid,
      rid: userTitle.value,
    }),
  });
};
</script>
