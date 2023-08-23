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
      this.userComplaints = [];
      this.categories = [];
      this.router.push("/login");
    },
    async login(email, password, user_type) {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          user_type,
        }),
      });
      const responsejson = await response.json();
      if (responsejson.status === "success") {
        this.user = responsejson.data;
        await this.getEverything();
      }
      return responsejson;
    },
    async signup(name, email, password, user_type) {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          user_type,
        }),
      });
      const responsejson = await response.json();
      return responsejson;
    },
    async getEverything() {
      await this.getUserComplaints();
      await this.getCategories();
    },
    async getUserComplaints() {
      if (this.user.user_type === "staff") {
        await this.getStaffComplaints();
      } else if (this.user.user_type === "technician") {
        await this.getTechnicianComplaints();
      } else if (this.user.user_type === "supervisor") {
        await this.getSupervisorComplaints();
      }
    },
    async getStaffComplaints() {
      let response = await fetch(
        `http://localhost:3001/api/${this.user.user_id}/complaints`
      );
      response = await response.json();
      this.userComplaints = response.data;
    },
    async getTechnicianComplaints() {
      let response = await fetch(
        `http://localhost:3001/api/technician/complaints`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: this.user.user_id,
            category_id: this.user.category_id,
          }),
        }
      );
      response = await response.json();
      this.userComplaints = response;
    },
    async getSupervisorComplaints() {
      let response = await fetch(
        `http://localhost:3001/api/supervisor/get_complaints`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_id: this.user.category_id,
          }),
        }
      );
      response = await response.json();
      this.userComplaints = response;
    },
    async getAvailableTechnicians() {
      let response = await fetch(
        `http://localhost:3001/api/supervisor/get_technicians`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_id: this.user.category_id,
          }),
        }
      );
      response = await response.json();
      return response;
    },
    async getCategories() {
      let response = await fetch(`http://localhost:3001/api/categories`);
      response = await response.json();
      this.categories = response;
    },
  },
  persist: true,
});
