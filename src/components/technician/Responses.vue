<template>
  <div class="mt-10 flex justify-around">
    <div class="font-medium text-xl">Past Response</div>
    <div>{{ response }}</div>
  </div>
</template>
<script setup>
const { response } = defineProps({
  response: {
    type: String,
    default: "No response yet",
  },
});
</script>
