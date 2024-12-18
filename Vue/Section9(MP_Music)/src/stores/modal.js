import { defineStore } from "pinia";

export default defineStore("modal", { //takes store name and the store instance
  state: () => ({ //just like Vue's data property, it is a function so that instance isolation is maintained. Data here is available to all components.
    isOpen: false,
  }),
  getters: { //equivalent of computed properties, and would be available to all components.
    hiddenClass(state) {
      return !state.isOpen ? "hidden" : "";
    }
  }
});
