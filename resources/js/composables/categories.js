import axios from "axios"
import { ref } from "vue"

const useCategories = () => {
   const categories = ref({})

   const getCategories = async () => {
    axios.get('/api/categories')
        .then(res => {
            categories.value = res.data.data
        })
   }


   return { categories, getCategories }
}

export default useCategories