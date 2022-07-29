import './bootstrap';

import { createApp, onMounted } from 'vue';
// import App from './layouts/App'
import laravelVuePaginationUmd from 'laravel-vue-pagination';
import { createPinia } from 'pinia'
import router from './routes/index'
import VueSweetalert2 from 'vue-sweetalert2';
// import useAuth from './composables/auth';
import { useStoreUser } from './store/storeUser';


const app = createApp({
    setup(){
        const store = useStoreUser()
        // const {getUser} = useAuth()
        onMounted(() => {
            store.getUser()
        })
    }
})
app.use(router)
app.use(VueSweetalert2);
app.use(createPinia())

app.component('Pagination', laravelVuePaginationUmd)
app.mount('#app')