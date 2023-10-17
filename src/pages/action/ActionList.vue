<template>
  <main>
    <h2>📒 Actions de formation</h2>

    <table v-if="actions" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Client</th>
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
          <ActionListLigne :action="action" />
        </template>
      </tbody>
    </table>

    <ActionForm />
  </main>
</template>

<script setup>
import ActionForm from "./ActionForm.vue";
import ActionListLigne from "./ActionListLigne.vue";
import { useActionStore } from "../../store/action";
import { onMounted, computed } from "vue";

const actionStore = useActionStore();

// const getActions = computed(() => {
//     return actionStore.getActions;
// });

const actions = computed(() => {
  return actionStore.actions;
});

onMounted(() => {
  actionStore.fetchActions();
});
</script>

<style scoped></style>
