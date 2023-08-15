<template>
  <div class="pt-20">
    <div class="p-10 bg-secondary rounded-3xl text-white">
      <div class="text-xl mb-4">Select a category</div>
      <div class="flex flex-col gap-y-6">
        <div v-if="user.category_id != null">
          <div>
            Current category:
            {{ categories[user.category_id - 1].category_name }}
          </div>
        </div>
        <select v-model="technician_category" name="" id="" class="bg-secondary border border-white rounded-2xl p-1 px-2">
          <option v-for="category in categories" :value="category.category_id">
            {{ category.category_name }}
          </option>
        </select>
        <button class="bg-primary rounded-lg" @click="handleSubmit">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useGeneralStore } from "@/stores/useGeneral";
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
const router = useRouter();
const { user, categories } = storeToRefs(useGeneralStore());

const technician_category = ref();

technician_category.value = user.value.category_id
  ? user.value.category_id
  : categories.value[0].category_id;

const handleSubmit = async () => {
  const response = await fetch(`http://localhost:3001/api/technician/assign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.value.user_id,
      category_id: technician_category.value,
    }),
  });
  // console.log(response);
  if (response.status === 200) {
    user.value.category_id = technician_category.value;
    // router.push("/technician");
  }
};
</script>
<style scoped></style>
