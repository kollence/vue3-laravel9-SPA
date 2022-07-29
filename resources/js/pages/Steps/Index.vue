<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import useSteps from '../../composables/steps'
import useCategories from '../../composables/categories'

const search_global =ref('')
const search_category = ref('')
const search_id = ref('')
const search_title = ref('')
const search_content = ref('')
const orderColumn = ref('')
const direction = ref('')
const perPage = ref(10)

const { steps, getSteps, deleteStep } = useSteps()
const { categories, getCategories } = useCategories()

const userName = computed(() => user.name)
onMounted(() => {
    getSteps()
    getCategories()
})

const updateParamField = (pickedField) => {
    orderColumn.value = pickedField
    direction.value = (direction.value === 'asc') ? 'desc' : 'asc'
    getSteps(
        1, 
        search_global.value,
        search_category.value, 
        search_id.value, 
        search_title.value, 
        search_content.value, 
        orderColumn.value, 
        direction.value, 
        perPage.value
        )
}

watch(search_global, (curr, prev) => {
    getSteps(
        1,
        curr,
        search_category.value, 
        search_id.value, 
        search_title.value, 
        search_content.value, 
        orderColumn.value, 
        direction.value, 
        perPage.value
        )
})
watch(search_category, (curr, prev) => {
    getSteps(
        1,
        search_global.value,
        curr,
        search_id.value, 
        search_title.value, 
        search_content.value, 
        orderColumn.value, 
        direction.value, 
        perPage.value
        )
})
watch(search_id, (curr, prev) => {
    getSteps(
        1,
        search_global.value,
        search_category.value, 
        curr,
        search_title.value, 
        search_content.value, 
        orderColumn.value, 
        direction.value, 
        perPage.value
        )
})
watch(search_title, (curr, prev) => {
    getSteps(
        1,
        search_global.value,
        search_category.value, 
        search_id.value, 
        curr,
        search_content.value, 
        orderColumn.value, 
        direction.value, 
        perPage.value
        )
})
watch(search_content, (curr, prev) => {
    getSteps(
        1,
        search_global.value,
        search_category.value, 
        search_id.value, 
        search_title.value, 
        curr,
        orderColumn.value, 
        direction.value, 
        perPage.value
        )
})
watch(perPage, (curr, prev) => {
    getSteps(
        1,
        search_global.value,
        search_category.value, 
        search_id.value,
        search_title.value, 
        search_content.value, 
        orderColumn.value, 
        direction.value, 
        curr
        )
})
</script>

<template>
    <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <div class="min-w-full align-middle">
            
            <div class="grid grid-cols-2 gap-4">
                <div class="mb-4  col-span-1">
                      <input v-model="search_global" type="text" placeholder="Search..." class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>
                <div class="mb-4  col-span-1 justify-items-end">
                    <select v-model="perPage" id="" class="mt-1 float-right">
                        <option v-for="num in [5,10,15,20]" :value="num">{{num}}</option>
                    </select>
                </div>
            </div>
            <table class="min-w-full divide-y divide-yellow-200 border">
                <thead>
                    <tr>
                        <th class="px-3 py-3 bg-gray-50 text-left">
                            <input v-model="search_id" type="text" class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Filter by ID">
                        </th>
                        <th class="px-3 py-3 bg-gray-50 text-left">
                            <input v-model="search_title" type="text" class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Filter by Title">
                        </th>
                        <th class="px-3 py-3 bg-gray-50 text-left">
                            <input v-model="search_content" type="text" class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Filter by Content">
                        </th>
                        <th class="pl-3 py-3 bg-gray-50 text-left" style="width:160px;">
                            <select v-model="search_category" class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                <option value="" selected>categories</option>
                                <option v-for="category in categories" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </th>
                        <th class="px-3 py-3 bg-gray-50 text-left"></th>
                        <th class="px-3 py-3 bg-gray-50 text-left"></th>
                        <th class="px-3 py-3 bg-gray-50 text-left"></th>
                    </tr>
                    <tr>
                        <th class="px-6 py-3 bg-gray-50 text-left">
                            <!-- <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span> -->
                            <div class="flex flex-row item-center justify-between cursor-pointer"
                                @click="updateParamField('id')">
                                <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    :class="{'font-bold text-blue-600': orderColumn === 'id'}">
                                    id
                                </div>
                                <div class="select-none">
                                    <span :class="{
                                'text-blue-600': direction === 'asc' && orderColumn === 'id',
                                'hidden': direction !== '' && direction !== 'asc' && orderColumn === 'id',
                            }">&uarr;</span>
                                    <span :class="{
                                'text-blue-600': direction === 'desc' && orderColumn === 'id',
                                'hidden': direction !== '' && direction !== 'desc' && orderColumn === 'id',
                            }">&darr;</span>
                                </div>
                            </div>
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-left">
                            <!-- <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</span> -->
                            <div class="flex flex-row item-center justify-between cursor-pointer"
                                @click="updateParamField('title')">
                                <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    :class="{'font-bold text-blue-600': orderColumn === 'title'}">
                                    title
                                </div>
                                <div class="select-none">
                                    <span :class="{
                                'text-blue-600': direction === 'asc' && orderColumn === 'title',
                                'hidden': direction !== '' && direction !== 'asc' && orderColumn === 'title',
                            }">&uarr;</span>
                                    <span :class="{
                                'text-blue-600': direction === 'desc' && orderColumn === 'title',
                                'hidden': direction !== '' && direction !== 'desc' && orderColumn === 'title',
                            }">&darr;</span>
                                </div>
                            </div>
                        </th>
                        
                        <th class="px-6 py-3 bg-gray-50 text-left">
                            <span  class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Content</span>
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-left">
                            <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Category</span>
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-left">
                            <!-- <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Created at</span> -->
                            <div class="flex flex-row item-center justify-between cursor-pointer"
                                @click="updateParamField('created_at')">
                                <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    :class="{'font-bold text-blue-600': orderColumn === 'created_at'}">
                                    created at
                                </div>
                                <div class="select-none">
                                    <span :class="{
                                'text-blue-600': direction === 'asc' && orderColumn === 'created_at',
                                'hidden': direction !== '' && direction !== 'asc' && orderColumn === 'created_at',
                            }">&uarr;</span>
                                    <span :class="{
                                'text-blue-600': direction === 'desc' && orderColumn === 'created_at',
                                'hidden': direction !== '' && direction !== 'desc' && orderColumn === 'created_at',
                            }">&darr;</span>
                                </div>
                            </div>
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-left">Image</th>
                        <th class="px-6 py-3 bg-gray-50 text-left">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                    <tr v-for="step in steps.data">
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{step.id}}</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                            <router-link :to="{name: 'step.show', params: {id: step.id}}">
                                {{step.title}}
                            </router-link>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{step.content}}</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{step.category}}</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{step.created_at}}</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                            <img v-show="step.image" :src="'/step_images/'+step.image" width="30" height="30"  class="w-30 h-30 object-cover" alt="">
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                            <router-link :to="{name: 'step.edit', params: {id: step.id}}">Edit</router-link>
                            
                            <a href="#" @click.prevent="deleteStep(step.id)" class="ml-2">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="flex items-center justify-center py-5">
                <Pagination :data="steps" @pagination-change-page="page => getSteps(page, search_content)" />
            </div>
        </div>
    </div>

</template>