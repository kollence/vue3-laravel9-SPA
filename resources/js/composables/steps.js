import axios from "axios"
import { ref, inject } from "vue"
import { useRouter } from "vue-router"


const useSteps = () => {
   const step = ref({})
   const steps = ref({})
   const router = useRouter()
   const validErrors = ref({})
   const isLoading = ref(false)
   const swal = inject('$swal')

   const getSteps = async (
        page = 1, 
        search_global= '',
        search_category= '',
        search_id= '',
        search_title= '',
        search_content= '',
        order_column = 'created_at',
        direction = 'desc',
        perPage = 10
    ) => {
        axios.get(
            '/api/steps?page=' + page +
             '&search_global=' + search_global +
             '&search_category=' + search_category +
             '&search_id=' + search_id +
             '&search_title=' + search_title +
             '&search_content=' + search_content +
             '&order_column=' + order_column +
             '&direction=' + direction +
             '&perPage=' +perPage 
        )
        .then(res => {
            steps.value = res.data
            // console.log(steps.value.data[0].image[0].image);
        })
   }
   const getStep = async (id) => {
        axios.get( '/api/steps/'+id )
        .then(res => {
            step.value = res.data.data
        })
    }
   const storeStep = async (step) => {
        // console.log(step);
        if(isLoading.value) return;

        isLoading.value = true
        validErrors.value = {}

        let serializeStep = new FormData()
        for(let item in step){
            if(step.hasOwnProperty(item)){
                serializeStep.append(item, step[item])
            }
        }

        axios.post('/api/steps', serializeStep)
        .then(res => {
           router.push({name: 'steps'}) 
           swal({icon: 'success',title:'Succesfuly created step'})
        }).catch(err => {
            if(err.response?.data){
                validErrors.value = err.response.data.errors
            }
        }).finally(() => isLoading.value = false)
   }
   const updateStep = async (step) => {

    if(isLoading.value) return;
    // console.log(step);
    isLoading.value = true
    validErrors.value = {}

    let serializeStep = new FormData()
    for(let item in step){
        if(step.hasOwnProperty(item)){
            serializeStep.append(item, step[item])
        }
    }
    serializeStep.append('_method', 'PUT');
    axios.post('/api/steps/'+ step.id, serializeStep)
    .then(res => {
       router.push({name: 'steps'})
       swal({icon: 'success',title:'Succesfuly edited step'})
    }).catch(err => {
        if(err.response?.data){
            validErrors.value = err.response.data.errors
        }
    }).finally(() => isLoading.value = false)
    }
    const deleteStep = async (id) => {
        swal({
            title: 'Are you sure ?!',
            text: 'Delete is permanent!',
            icon: 'Warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it.',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButton: true
        }).then(action => {
            if(action.isConfirmed){
                axios.delete('/api/steps/' + id)
                .then(res => {
                    getSteps()
                    router.push({name: 'steps'})
                    swal({icon: 'success',title:'Succesfuly deleted step'})
                }).catch(err => {
                    if(err.response?.data){
                        swal({icon: 'error',title: err.response.data.message}) 
                    }
                })
            }
        })
    }

   return { step, getStep, steps, getSteps, deleteStep, storeStep, updateStep, validErrors, isLoading }
}

export default useSteps