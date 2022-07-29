
## About Project

The project was created with an emphasis on authentication via laravel sanctum tokens and axios interceptors in bootstrap.js

### Frontend
- [Vue3](https://vuejs.org) with modern syntax script setup in top of file).
- User auth state management [Pinia](https://pinia.vuejs.org) in [store dir](https://github.com/kollence/vue3-laravel9-SPA/tree/main/resources/js/store).
- Composables for data api from laravel 9 [composables](https://github.com/kollence/vue3-laravel9-SPA/tree/main/resources/js/composables).
- Axios setup in [bootstrap.js](https://github.com/kollence/vue3-laravel9-SPA/blob/main/resources/js/bootstrap.js) interceptors for tokens set in LocalStorage.
- [Vue Router](https://github.com/kollence/vue3-laravel9-SPA/blob/main/resources/js/routes/index.js) with two types 1.AuthLayout 2.GuestLayout. With auth() rule set in component:AuthLayout,beforeEnter: auth,
- [Simple Pages](https://laravel.com/docs/queues) with [tailwindcss](https://tailwindcss.com) and [Vue-SweetAlert2](https://www.npmjs.com/package/vue-sweetalert2).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 2000 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
