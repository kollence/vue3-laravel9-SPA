<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import useCategories from '../../composables/categories'
import useSteps from '../../composables/steps'

const { categories, getCategories } = useCategories()
const {storeStep, validErrors, isLoading} = useSteps()


const step = reactive({
    'title': '',
    'content': '',
    'category_id': '',
    'image': ''
})
const inputFile = ref(null)
const imageFile = ref('')
const imageUrl = ref('')

const handleImageUpload = (e) => {
    if(e.target.files.length === 0){
        imageFile.value = ''
        imageUrl.value = ''
        step.image = ''
        return
    }
   imageFile.value = e.target.files[0]
   step.image = e.target.files[0]
}
const removeImg = (e) => {
        inputFile.value.value= null
        imageFile.value = ''
        imageUrl.value = ''
        step.image = ''
        
}

onMounted(() => {
    getCategories()
})

watch(imageFile, (imageFile) => {
    if(!(imageFile instanceof File)) return;
    let fileReader = new FileReader()
    fileReader.readAsDataURL(imageFile)

    fileReader.addEventListener('load', () => {
        imageUrl.value = fileReader.result
    })
})
</script>

<template>
    <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <h1>Create</h1>
        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-md m-auto">
        <form @submit.prevent="storeStep(step)">
            <div class="form-group mb-6">
            <input v-model="step.title" type="text" class="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7"
                placeholder="Title">
            <div class="text-red-600 mt-1">
                <div v-for="errormsg in validErrors?.title">{{errormsg}}</div>
            </div>
            </div>
            <div class="form-group mb-6">
            <textarea  v-model="step.content"
            class="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
            id="content"
            rows="3"
            placeholder="Content"
            ></textarea>
            <div class="text-red-600 mt-1">
                <div v-for="errormsg in validErrors?.content">{{errormsg}}</div>
            </div>
            </div>
            <div class="form-group form-check text-center mb-6">
                <select  v-model="step.category_id" id="" class="block mt-1 w-full rounder-md">
                    <option value="" selected>-- Categories --</option>
                    <option v-for="category in categories" :value="category.id">
                        {{category.name}}
                    </option>
                </select>
            </div>
            <div class="form-group mb-6">
            <div >
                <img v-show="imageUrl" :src="imageUrl" class="w-50 h-50 object-cover" @click="removeImg">
            </div>
            <input @change="handleImageUpload"  type="file" accept="image/*"  ref="inputFile" class="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="fileup">
            <div class="text-red-600 mt-1">
                <div v-for="errormsg in validErrors?.image">{{errormsg}}</div>
            </div>
            </div>

            <div class="text-red-600 mt-1">
                <div v-for="errormsg in validErrors?.category_id">{{errormsg}}</div>
            </div>
            <button type="submit" :disabled="isLoading" class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                <div v-show="isLoading" class="inline-block animate-spin w-4 h-4 mr-2 border-t-2 border-t-white border-r-2 border-r-white border-b-2 border-b-white border-l-2 border-l-blue-600 rounded-full"></div>
                <span v-if="isLoading">Processing...</span>
                <span v-else>Save</span>
            </button>
        </form>
        </div>
    </div>
</template>