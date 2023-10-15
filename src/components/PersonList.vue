<template>
    <p>Personnes</p>

    <table v-if="persons" class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr v-for="person in persons" :key="person.id">
                    <td>{{person.nom}}</td>
                    <td><a>E</a></td>
                    <td @click="handleDelete"><a>D</a></td>
                </tr> -->
                <template v-for="person in persons" :key="person.id">
                    <PersonListLigne :person="person" 
                    @personDeleted="fetchPerson"
                    @personUpdated="fetchPerson"/>
                </template>
            </tbody>
        </table>

    <PersonForm @personCreated="fetchPerson"/>
</template>

<script setup>
import PersonForm from './PersonForm.vue'
import PersonListLigne from './PersonListLigne.vue'
import { ref, onMounted } from 'vue'

const persons = ref(null)

// function handleDelete(e) {
//     console.log("delete", e)
// }

function fetchPerson() {
  try {
    fetch('http://localhost:8081/person/', {
        method: "GET"
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
        persons.value = data;
    })

  } catch (error) {
    console.error(error);
  }
}

onMounted(() =>fetchPerson())

</script>

<style scoped>
table {
  border-collapse: collapse;
  border: 1px solid;
}

tbody tr:nth-child(odd) {
    background-color: rgba(138, 138, 138, 0.965);
    color: #fff;
}

th:nth-child(1) {
    width: 20px;
}
</style>