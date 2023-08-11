import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    user: {
      user_id: 1,
      name: "danish",
      email: "danish@gmail.com",
      role: "staff",
      title: null,
    },
    userComplaints: [],
  }),
  actions: {
    logout() {
      this.user = null;
    },
    async getUserComplaints() {
      let response = await fetch(
        `http://localhost:3001/api/${this.user.user_id}/complaints`
      );
      response = await response.json();
      this.userComplaints = response.data;
    },
  },
});
