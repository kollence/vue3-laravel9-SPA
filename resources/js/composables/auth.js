import axios from "axios"
import { ref,  reactive, inject, toRefs } from "vue"
import { useRouter } from "vue-router"

const useAuth = () => {
    const swal = inject('$swal')
    const user = reactive({
        name: '',
        email: ''
    })
    const validUserErrors = ref({})
    const isUserLoading = ref(false)
    const router = useRouter()
    const loginForm = reactive({
        email: '',
        password: '',
        remember: false,
    })

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
    }

    const getUser =  () => {
        axios.get('/api/user')
        .then(res => {
            loggedIn(res.data.data)
        })
    }

    const loggedIn = (res) => {
        if(res?.token){
            localStorage.token = res.token
        }
        user.name = res.user.name
        user.email = res.user.email
        // console.log(user.value);
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

    return { user, getUser, submitLogin, validUserErrors, isUserLoading, loginForm, logout }
}

export default useAuth
