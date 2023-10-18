<template>
  <main>
    <h2>📒 actions</h2>

    <ActionForm :action="currentAction" @cancelEdit="deactivateEditMode" />

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
        <template v-for="action in actions" :key="action.id">
          <tr>
            <td>{{ action.structure.nom }}</td>
            <td>
              <router-link
                :to="{ name: 'actionInfo', params: { id: action.id } }"
              >
              {{ action.nom }}
              </router-link>
              
            </td>
            <td>{{ action.formateur.nom }}</td>
            <td>{{ action.commercial.nom }}</td>
            <td @click="activateEditMode(action)"><a>🖊️</a></td>
            <td @click="handleDelete(action.id)"><a>🗑️</a></td>
          </tr>
        </template>
      </tbody>
    </table>
  </main>
</template>

<script setup>
import { remove } from "@/api/actionApi";
import ActionForm from "./ActionForm.vue";
import { useActionStore } from "@/store/actionStore";
import { onMounted, computed, ref } from "vue";

const actionStore = useActionStore();

const currentAction = ref(null);

function deactivateEditMode() {
  currentAction.value = null;
}

function activateEditMode(action) {
  currentAction.value = action;
}

function handleDelete(id) {
  console.log(id);
  remove(id)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        actionStore.refreshActions();
      }
    })
    .catch((err) => console.log(err));
}

const actions = computed(() => {
  return actionStore.actions;
});

onMounted(() => {
  actionStore.initActions();
});
</script>

<style scoped></style>
