<script setup>
import { ref } from 'vue';
 const about = ref('about');
</script>
<template>
    <div  class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <h1>{{about}}</h1>
    </div>
</template>

<style>

</style>