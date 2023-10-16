<template>
    <main>
    <h2>📒 Actions de formation</h2>

    <table v-if="actions" class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Formateur</th>
                    <th>Commercial</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr v-for="action in actions" :key="action.id">
                    <td>{{action.nom}}</td>
                    <td><a>E</a></td>
                    <td @click="handleDelete"><a>D</a></td>
                </tr> -->
                <template v-for="action in actions" :key="action.id">
                    <ActionListLigne :action="action"/>
                </template>
            </tbody>
        </table>

    <ActionForm/>
</main>
</template>

<script setup>
import ActionForm from './ActionForm.vue'
import ActionListLigne from './ActionListLigne.vue'
import {useActionStore} from '../../store/action'
import { onMounted, computed } from 'vue'

const actionStore = useActionStore();

// const getActions = computed(() => {
//     return actionStore.getActions;
// });

const actions = computed(() => {
  return actionStore.actions;
});

onMounted(() => {actionStore.fetchActions()})
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