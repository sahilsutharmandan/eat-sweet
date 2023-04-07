<template>
  <Dropdown
    :options="options"
    :optionLabel="optionLabel"
    :placeholder="placeholder"
    v-model="selectedOption"
    class="w-full"
    @change="emitSelectedOption"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex align-items-center">
        <img
          :alt="slotProps.value.strMeal"
          :src="slotProps.value.strMealThumb"
          class="mr-2"
          style="width: 18px"
        />
        <div>{{ slotProps.value.strMeal }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex align-items-center">
        <img
          :alt="slotProps.option.strMeal"
          :src="slotProps.option.strMealThumb"
          class="mr-2"
          style="width: 18px"
        />
        <div>{{ slotProps.option.strMeal }}</div>
      </div>
    </template>
  </Dropdown>
</template>

<script>
export default {
  props: {
    options: {
      type: [Array, Object],
      required: true,
    },
    optionLabel: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Select an option",
    },
  },
  data() {
    return {
      selectedOption: null,
      strMeal: "strMeal",
      strMealThumb: "strMealThumb",
      strMealAlt: "strMealAlt",
    };
  },
  methods: {
    emitSelectedOption() {
      this.$emit("selectedOption", this.selectedOption);
    },
  },
};
</script>
<script setup>
import Dropdown from "primevue/dropdown";
</script>
