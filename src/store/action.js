import { defineStore } from "pinia";
import axios from "axios";

// PARAM 1 : nom du store
// PARAM 2 : objet representant le store
export const useActionStore = defineStore("actions", {
  state() {
    return {
      actions: [],
    };
  },
  getters: {
    getActions: (state) => state.actions,
    actionsByRole: (state) => {
      // TODO : doesnt work for now
      // https://github.com/vuejs/pinia/discussions/1194
      return () => state.actions.filter((action) => action.nom == "pierre");
    },
  },
  actions: {
    async fetchActions() {
      axios
        .get("/action/")
        .then((res) => {
          console.log(res.data);
          this.actions = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
