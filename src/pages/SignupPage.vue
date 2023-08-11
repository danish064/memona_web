<template>
  <div class="mx-auto mt-20 px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
          class="flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-secondary border-b-2 border-primary"
        >
          <div
            class="rounded-t text-center text-4xl font-medium text-filler mb-0 px-6 py-6"
          >
            Signup
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <div class="w-full mb-3">
                <label
                  class="block uppercase text-filler text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Name
                </label>
                <input
                  v-model="name"
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-filler bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Name"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-filler text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  v-model="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-filler bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-filler text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  v-model="password"
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-filler bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>
              <div class="w-full mb-3">
                <label
                  class="block uppercase text-filler text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Role
                </label>
                <select v-model="user_type" name="user_type" id="user_type">
                  <option value="staff" selected>Staff</option>
                  <option value="technician">Technician</option>
                </select>
              </div>
              <div class="text-center mt-6">
                <button
                  class="bg-primary text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  @click="signupUser"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const user_type = ref("staff");

const signupUser = async () => {
  const response = await fetch("http://localhost:3001/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
      user_type: user_type.value,
    }),
  });
  const responsejson = await response.json();
  console.log(responsejson);
  if (responsejson.status == "success") {
    // user.value = responsejson.data;
    router.push("/login");
    alert("User created successfully");
  } else if (responsejson.status == "failed") {
    alert(responsejson.data);
  }
};
</script>
