import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    user: {
      uid: 1,
      name: "danish",
      email: "danish@gmail.com",
      role: "technician",
      title: null
    },
  }),
  actions: {
    logout() {
      this.user = null;
    },
  },
});
