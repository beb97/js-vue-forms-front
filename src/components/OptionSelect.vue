<template>
  <select v-model="selected" @input="handleSelected" :size="props.size">
    <!-- <option disabled value="">Select one</option> -->
    <option v-for="option in props.options" :value="option.id" :key="option.id">
      {{ option.nom }}
    </option>
  </select>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from "vue";
const props = defineProps(["options", "size", "default"]);
const emit = defineEmits(["selectedOption"]);

//TODO : utiliser liste fournie en props, sinon charger depuis personeStore
const selected = ref("");

watch(
  () => props.default,
  (newDefault) => {
    console.log("watch selected default :", newDefault);
    selected.value = props.default;
  }
);

function handleSelected(e) {
  console.log("option selected : ", e.target.value);
  emit("selectedOption", e.target.value);
}
</script>
