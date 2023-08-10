<template>
  <div
    class="flex w-screen h-screen justify-center items-center"
    :style="bg_style"
  >
    <div class="bg-[#181532] p-10 w-full max-w-[460px] rounded-lg">
      <img draggable="false" src="logo.png" width="200" alt="Logo" />

      <form
        class="flex flex-col gap-y-2 w-full"
        @submit.prevent="handelFormSubmit"
      >
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          v-model="email"
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          v-model="password"
        />
        <button
          class="bg-[#f6a329] h-12 rounded-lg text-white"
          type="submit"
          value="submit"
          name="submit"
        >
          login
        </button>
        <p class="text-white text-center">
          Forget Password? <a href="#" class="text-[#f6a329]">Reset-It</a>
        </p>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const login_bg = new URL("../assets/images/login_bg.gif", import.meta.url).href;
const bg_style = `background-image: url(${login_bg});`;
const email = ref("");
const password = ref("");
const handelFormSubmit = async (formData) => {
  const response = await fetch("http://localhost:3001/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });
  const responsejson = await response.json();
    console.log(responsejson);
};
</script>
<style lang="postcss" scoped>
input {
  @apply h-12 w-full border-2 border-gray-300 rounded-md px-2;
}
</style>
