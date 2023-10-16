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
                    <StructureListLigne :structure="structure"/>
                </template>
            </tbody>
        </table>

    <StructureForm/>
</main>
</template>

<script setup>
import StructureForm from './StructureForm.vue'
import StructureListLigne from './StructureListLigne.vue'
import {useStructureStore} from '../../store/structure'
import { onMounted, computed } from 'vue'

const structureStore = useStructureStore();

// const getStructures = computed(() => {
//     return structureStore.getStructures;
// });

const structures = computed(() => {
  return structureStore.structures;
});

onMounted(() => {structureStore.fetchStructures()})
</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: clamp(300px, 100vw, 800px);

    flex-basis: 100%;
    flex-grow: 1;
}

table {
  border-collapse: collapse;
  border: 1px solid;
  text-align: center;
}

th {
  padding: 10px;
    background-color: rgba(138, 138, 138, 0.5);
}

tbody tr:nth-child(even) {
    background-color: rgba(138, 138, 138, 0.2);
}

th:nth-child(1) {
    min-width: 150px;
}
</style>