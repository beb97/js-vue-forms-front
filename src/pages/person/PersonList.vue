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
          <PersonListLigne :person="person" />
        </template>
      </tbody>
    </table>

    <PersonForm />
  </main>
</template>

<script setup>
import PersonForm from "./PersonForm.vue";
import PersonListLigne from "./PersonListLigne.vue";
import { usePersonStore } from "../../store/person";
import { onMounted, computed } from "vue";

const personStore = usePersonStore();

// const getPersons = computed(() => {
//     return personStore.getPersons;
// });

const persons = computed(() => {
  return personStore.persons;
});

onMounted(() => {
  personStore.fetchPersons();
});
</script>

<style scoped></style>
