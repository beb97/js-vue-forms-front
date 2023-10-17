<template>
  <main>
    <h2>🏭 Structures</h2>

    <StructureForm 
    :structure="currentStructure" 
    @cancelEdit="deactivateEditMode"
    />

    <table v-if="structures" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Nom</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="structure in structures" :key="structure.id">
          <td >{{ structure.nom }}</td>
          <td class="icon" @click="activateEditMode(structure)">🖊️</td>
          <td class="icon" @click="handleDelete(structure.id)">🗑️</td>
        </tr>
      </tbody>
    </table>

  </main>
</template>

<script setup>
import { useStructureStore } from "@/store/structure";
import { computed, onMounted, ref } from "vue";
import StructureForm from "./StructureForm.vue";
import { remove } from "@/api/structure.api";

const structureStore = useStructureStore();

const currentStructure = ref(null);

function deactivateEditMode() {
  currentStructure.value = null;
}

function activateEditMode(struc) {
  currentStructure.value = struc;
}

function handleDelete(id) {
  console.log(id);
  remove(id)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        structureStore.refreshStructures();
      }
    })
    .catch((err) => console.log(err));
}

const structures = computed(() => {
  return structureStore.structures;
});

onMounted(() => {
  structureStore.initStructures();
});
</script>

<style scoped></style>
