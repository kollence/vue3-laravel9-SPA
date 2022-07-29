import { ref, computed, watch,inject,reactive } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router"

export const useStoreUser = defineStore('user', ()=>{
    const swal = inject('$swal')
    const user = ref({
        name: '',
        email: ''
    })
    if(localStorage.getItem('user')){
        user.value = JSON.parse(localStorage.getItem('user'))
    }
    const validUserErrors = ref({})
    const isUserLoading = ref(false)
    const router = useRouter()
    const loginForm = reactive({
        email: '',
        password: '',
        remember: false,
    })
    const registerForm = reactive({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        remember: false,
    })
    const submitRegistration = async () => {
        // console.log(loginForm);
        if(isUserLoading.value) return;

        isUserLoading.value = true
        validUserErrors.value = {}

        axios.post('/api/register', registerForm)
        .then(res => {
            loggedIn(res.data.data)
            // console.log(res.data.data);
        })
        .catch(err => {
            if(err.res?.data){
                validUserErrors.value = err.res.data.errors
                console.log(res.data.message);
            }
        })
        .finally(() => isUserLoading.value = false)
    }


    const submitLogin = async () => {
        // console.log(loginForm);
        if(isUserLoading.value) return;

        isUserLoading.value = true
        validUserErrors.value = {}

        axios.post('/api/login', loginForm)
        .then(res => {
            loggedIn(res.data.data)
            // console.log(res.data.data);
        })
        .catch(err => {
            if(err.res?.data){
                validUserErrors.value = err.res.data.errors
                console.log(res.data.message);
            }
        })
        .finally(() => isUserLoading.value = false)
    }

    const getUser =  () => {
        axios.get('/api/user')
        .then(res => {
            loggedIn(res.data.data)
        })
    }

    const loggedIn = (res) => {
        if(res.token){
            localStorage.token = res.token
        }
        if(res.user){
            localStorage.setItem('user', JSON.stringify({name: res.user.name, email: res.user.email}))
            user.value = {name: res.user.name, email: res.user.email}
        }
        router.push({name: 'steps'})

    }

    const logout = async () => {
        if(isUserLoading.value) return;

        isUserLoading.value = true
        validUserErrors.value = {}
        axios.post('/api/logout')

        .then(res => {
            if(localStorage.getItem('token')){
                localStorage.removeItem('token') 
            }
            if(localStorage.getItem('user')){
                localStorage.removeItem('user') 
            }
            router.push({name: 'home'})
        })
        .catch(err => {
            swal({
                icon: 'error',
                title: err.response.status,
                text: err.response.statusText
            })
        })
        .finally(() => isUserLoading.value = false)
    }

    const website = computed(()=> user.value.email.substring(user.value.email.lastIndexOf('@') + 1))

    const changeName = (newName) =>{
        user.value.name = newName
    }

    // watch(user, (curr) =>{
    //     localStorage.setItem('user', JSON.stringify(curr))
    // },
    // {deep: true}
    // )


    return {user, website, changeName, getUser, submitLogin, validUserErrors, isUserLoading, loginForm, logout, registerForm, submitRegistration }
})