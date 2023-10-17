<template>
  <main>
    <h2>🏭 Structures</h2>

    <table v-if="structures" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Nom</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for="structure in structures" :key="structure.id">
                    <td>{{structure.nom}}</td>
                    <td><a>E</a></td>
                    <td @click="handleDelete"><a>D</a></td>
                </tr> -->
        <template v-for="structure in structures" :key="structure.id">
          <StructureListLigne :structure="structure" />
        </template>
      </tbody>
    </table>

    <StructureForm />
  </main>
</template>

<script setup>
import StructureForm from "./StructureForm.vue";
import StructureListLigne from "./StructureListLigne.vue";
import { useStructureStore } from "../../store/structure";
import { onMounted, computed } from "vue";

const structureStore = useStructureStore();

// const getStructures = computed(() => {
//     return structureStore.getStructures;
// });

const structures = computed(() => {
  return structureStore.structures;
});

onMounted(() => {
  structureStore.fetchStructures();
});
</script>

<style scoped></style>
