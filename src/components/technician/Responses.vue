<template>
  <div class="mt-10">
    <div class="font-medium text-xl">Past Responses</div>
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
