<template>
  <main>
    <h2>🧠 acteurs</h2>

    <PersonForm :person="currentPerson" @cancelEdit="deactivateEditMode" />

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
          <tr>
            <td>
              <router-link
                :to="{ name: 'personInfo', params: { id: person.id } }"
              >
                {{ person.nom }}
              </router-link>
            </td>
            <td>{{ person.structure?.nom }}</td>
            <td @click="activateEditMode(person)"><a>🖊️</a></td>
            <td @click="handleDelete(person.id)"><a>🗑️</a></td>
          </tr>
        </template>
      </tbody>
    </table>
  </main>
</template>

<script setup>
import PersonForm from "./PersonForm.vue";
import { usePersonStore } from "@/store/personStore";
import { onMounted, computed, ref } from "vue";
import { remove } from "@/api/personApi";

const personStore = usePersonStore();

// eslint-disable-next-line
const { getPersonsByRole } = personStore;

const currentPerson = ref(null);

function deactivateEditMode() {
  currentPerson.value = null;
}

function activateEditMode(person) {
  currentPerson.value = person;
}

function handleDelete(id) {
  remove(id)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        personStore.refreshPersons();
      }
    })
    .catch((err) => console.log(err));
}

const persons = computed(() => {
  return personStore.persons;
});

onMounted(() => {
  personStore.initPersons();
});
</script>

<style scoped></style>
