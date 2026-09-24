import { ref, computed } from "vue";

// Shared reactive search state across the whole application
const searchQuery = ref("");

export function useSearch() {
  const clearSearch = () => {
    searchQuery.value = "";
  };

  const hasSearch = computed(() => searchQuery.value.trim().length > 0);

  return {
    searchQuery,
    clearSearch,
    hasSearch,
  };
}
