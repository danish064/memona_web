import { defineStore } from "pinia";
export const useGeneralStore = defineStore("general", {
  state: () => ({
    user: null,
    // user: {
    //   user_id: 1,
    //   username: "danish",
    //   email: "danish@gmail.com",
    //   user_type: "technician",
    //   title: null,
    // },
    userComplaints: [],
    categories: [],
  }),
  actions: {
    logout() {
      this.user = null;
      this.router.push("/login");
    },
    async getEverything() {
      await this.getUserComplaints();
      await this.getCategories();
    },
    async getUserComplaints() {
      let response = await fetch(
        `http://localhost:3001/api/${this.user.user_id}/complaints`
      );
      response = await response.json();
      this.userComplaints = response.data;
    },
    async getCategories() {
      let response = await fetch(`http://localhost:3001/api/categories`);
      response = await response.json();
      this.categories = response;
    },
  },
});
