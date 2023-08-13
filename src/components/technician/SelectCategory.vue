<template>
  <div class="p-10">
    <div class="text-xl mb-4">Select a category</div>
    <div class="flex flex-col gap-y-6">
      <select v-model="technician_category" name="" id="">
        <option v-for="category in categories" :value="category.category_id">
          {{ category.category_name }}
        </option>
      </select>
      <button class="bg-primary rounded-lg">Submit</button>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useGeneralStore } from "@/stores/useGeneral";
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
const router = useRouter();
const userTitle = ref("");
const responsejson = ref([]);
const { user, categories } = storeToRefs(useGeneralStore());

const technician_category = ref(categories.value[0].category_id);
</script>
<style scoped></style>
