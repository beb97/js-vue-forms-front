import { defineStore } from "pinia";
import { ref } from "vue";

export const useGeneralStore = defineStore("general", () => {
  // LE CACHE DU PAUVRE
  const dirtyContextDate = ref(false);

  function setDirtyContext() {
    this.dirtyContextDate = Date.now();
  }

  function shouldFetch(lastFetch) {
    if (lastFetch == null) {
      return true;
    }
    if (dirtyContextDate.value && dirtyContextDate.value > lastFetch) {
      return true;
    }
    return false;
  }

  return {
    dirtyContextDate,
    setDirtyContext,
    shouldFetch,
  };
});
