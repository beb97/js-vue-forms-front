<template>
    <select v-model="selected" @input="handleSelected" :size="props.size">
        <option disabled value="">Select one</option>
        <option 
            v-for="option in props.options" 
            :value="option.id" 
            :key="option.id"
        >
            {{ option.nom }}
        </option>
    </select>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
const props = defineProps(['options', 'size'])
const emit = defineEmits(['selectedOption'])

//TODO : utiliser liste fournie en props, sinon charger depuis personeStore
const selected = ref('');

function handleSelected(e) {
    console.log("selected : ", e.target.value );
    emit('selectedOption', e.target.value)
}
</script>