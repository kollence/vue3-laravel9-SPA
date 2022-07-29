<script setup>
import {   onMounted } from 'vue';
import { useRoute } from 'vue-router';
// import useCategories from '../../composables/categories'
import useSteps from '../../composables/steps'

// const { categories, getCategories } = useCategories()
const {step, getStep, isLoading} = useSteps()

const route = useRoute()


onMounted(() => {
    getStep(route.params.id)
    // getCategories()
}) 


</script>
<template>
    <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <h1>{{step.title}}</h1>
        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-md m-auto">

            <div class="form-group mb-6">
                {{step.title}}
            </div>
            <div class="form-group mb-6">
            {{step.content}}
            </div>
            <div class="form-group form-check text-center mb-6">
                {{step.category_id}}
            </div>
            <div class="form-group mb-6">
            <div >
                <img v-show="step.image" :src="'/step_images/'+ step.image" class="w-50 h-50 object-cover">
            </div>

            </div> 
                <router-link :to="{name: 'steps'}" class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                <span >Back</span></router-link>

        </div>
    </div>
</template>