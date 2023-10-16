<template>
    <main>
    <h2>🧠 Acteurs</h2>

    <table v-if="persons" class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Structure</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr v-for="person in persons" :key="person.id">
                    <td>{{person.nom}}</td>
                    <td><a>E</a></td>
                    <td @click="handleDelete"><a>D</a></td>
                </tr> -->
                <template v-for="person in persons" :key="person.id">
                    <PersonListLigne :person="person"/>
                </template>
            </tbody>
        </table>

    <PersonForm/>
</main>
</template>

<script setup>
import PersonForm from './PersonForm.vue'
import PersonListLigne from './PersonListLigne.vue'
import {usePersonStore} from '../../store/person'
import { onMounted, computed } from 'vue'

const personStore = usePersonStore();

// const getPersons = computed(() => {
//     return personStore.getPersons;
// });

const persons = computed(() => {
  return personStore.persons;
});

onMounted(() => {personStore.fetchPersons()})
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