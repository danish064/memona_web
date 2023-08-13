<template>
  <div class="mx-auto pt-10 flex justify-center">
    <div class="max-w-[500px] w-full">
      <form
        class="p-10 flex flex-col gap-y-10 rounded-lg bg-secondary text-white"
        @submit.prevent="uploadComplaint"
      >
        <div class="text-3xl font-medium">File a complaint</div>
        <div class="input-block">
          <div>Title</div>
          <input v-model="title" type="text" />
        </div>
        <div class="input-block">
          <div>Description</div>
          <input v-model="description" type="text" />
        </div>
        <div class="input-block">
          <div>Category</div>
          <select v-model="category" name="category" id="category">
            <option
              v-for="category in categories"
              :value="category.category_id"
              :key="category.id"
            >
              {{ category.category_name }}
            </option>
          </select>
        </div>
        <input type="submit" class="bg-primary rounded-xl p-2" />
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGeneralStore } from "@/stores/useGeneral.js";
import { storeToRefs } from "pinia";

const router = useRouter();
const { user, categories } = storeToRefs(useGeneralStore());
await useGeneralStore().getCategories();

const title = ref("");
const description = ref("");
const category = ref("");

const uploadComplaint = async () => {
  console.log("uploading complaint");
  const response = await fetch("http://localhost:3001/api/complaint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.value.user_id,
      category_id: category.value,
      title: title.value,
      description: description.value,
    }),
  });
  router.push("/staff/complaints");
};
</script>
<style lang="postcss" scoped>
.input-block {
  @apply flex flex-col gap-y-1;
  > div {
    @apply text-xl font-medium;
  }
  > input {
    @apply text-black rounded-lg border-2 p-1 px-2 outline-none focus:border-primary;
  }
  > select {
    @apply text-black rounded-lg border-2 p-1 px-2;
  }
}
</style>
