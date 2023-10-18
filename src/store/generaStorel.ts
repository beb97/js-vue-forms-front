import { defineStore } from "pinia";
import { ref } from "vue";

export const useGeneralStore = defineStore("general", () => {
  // LE CACHE DU PAUVRE
  const dirtyContextDate = ref();

  function setDirtyContext() {
    dirtyContextDate.value = Date.now();
  }

  function shouldFetch(lastFetch: number) {
    if (lastFetch == 0) {
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
