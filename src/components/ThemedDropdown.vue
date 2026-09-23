<template>
  <Dropdown class="eatsweet-dropdown" panelClass="eatsweet-dropdown-panel" dropdownIcon="eatsweet-dropdown-caret" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </Dropdown>
</template>
<script>
export default { inheritAttrs: false };
</script>
<script setup>
import Dropdown from "primevue/dropdown";
</script>
<style>
.p-dropdown.eatsweet-dropdown {
  background: #fff;
  border: 1px solid #86b99a;
  border-radius: 8px;
  min-width: 0;
}
.p-dropdown.eatsweet-dropdown:not(.p-disabled):hover { border-color: #15803d; }
.p-dropdown.eatsweet-dropdown:not(.p-disabled).p-focus {
  border-color: #15803d;
  box-shadow: 0 0 0 3px #dcfce7;
}
.p-dropdown.eatsweet-dropdown .p-dropdown-label { color: #244332; padding: 12px; }
.p-dropdown.eatsweet-dropdown .p-dropdown-label.p-placeholder { color: #547060; }
.p-dropdown.eatsweet-dropdown .p-dropdown-trigger { color: #15803d; width: 2.5rem; flex-shrink: 0; }
.eatsweet-dropdown-caret {
  width: 20px; height: 20px;
  background: center / 20px 20px no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='m6 9 6 6 6-6' stroke='%2315803d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
.eatsweet-dropdown:has([aria-expanded="true"]) .eatsweet-dropdown-caret { transform: rotate(180deg); }
.p-dropdown-panel.eatsweet-dropdown-panel {
  background: #fff;
  border: 1px solid #bbd9c5;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgb(20 83 45 / 12%);
  overflow: hidden;
  max-width: calc(100vw - 24px);
}
.p-dropdown-panel.eatsweet-dropdown-panel .p-dropdown-items { padding: 6px; }
.p-dropdown-panel.eatsweet-dropdown-panel .p-dropdown-items .p-dropdown-item {
  padding: 10px 12px;
  color: #244332;
  border-radius: 5px;
  white-space: normal;
}
.p-dropdown-panel.eatsweet-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover,
.p-dropdown-panel.eatsweet-dropdown-panel .p-dropdown-items .p-dropdown-item.p-focus { background: #f0fdf4; color: #166534; }
.p-dropdown-panel.eatsweet-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight,
.p-dropdown-panel.eatsweet-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight.p-focus { background: #dcfce7; color: #166534; }
</style>
