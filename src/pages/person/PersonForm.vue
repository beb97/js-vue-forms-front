<template>
  <h2>Ajouter</h2>
  <form @submit.prevent="onSubmit">
    <input type="text" name="nom" placeholder="nom" v-model="formNom" />

    <OptionSelect
      :options="structures"
      :size="1"
      @selectedOption="handleStructure"
    />

    <input type="submit" value="Ajouter" />
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { usePersonStore } from "../../store/person";
import { useStructureStore } from "../../store/structure";
import OptionSelect from "../../components/OptionSelect.vue";

const personStore = usePersonStore();
const structureStore = useStructureStore();
const formNom = ref("");
const formStructure = ref(0);

const structures = computed(() => {
  return structureStore.structures;
});

async function onSubmit() {
  axios
    .post("/person/", {
      nom: formNom.value,
      structureId: formStructure.value,
    })
    .then((res) => {
      console.log(res);
      if (res.status == 201) {
        formNom.value = "";
        personStore.fetchPersons();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleStructure(id) {
  formStructure.value = id;
}

onMounted(() => {
  structureStore.fetchStructures();
});
</script>

<style scoped></style>
