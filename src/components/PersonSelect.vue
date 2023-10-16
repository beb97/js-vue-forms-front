<template>
    <select v-model="selected" @input="handleSelected" size="4" required>
        <option disabled value="">Select one</option>
        <option 
            v-for="person in props.persons" 
            :value="person.id" 
            :key="person.id"
        >
            {{ person.nom }}
        </option>
    </select>
    <div>{{ selected }}</div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
const props = defineProps(['persons'])
const emit = defineEmits(['selectedPerson'])

const selected = ref('');

function handleSelected(e) {
    console.log("selected : ", e.target.value );
    emit('selectedPerson', e.target.value)
}
</script>