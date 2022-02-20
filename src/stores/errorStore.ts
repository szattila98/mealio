import { defineStore } from "pinia";

export const useErrors = defineStore("errorStore", {
  state: () => {
    return {
      quotaExceededApiError: false,
    };
  },
});
