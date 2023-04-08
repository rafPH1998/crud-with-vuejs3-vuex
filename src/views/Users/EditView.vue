<template>
    <PreloaderSpinner v-if="users.preloader"/>

    <div v-show="!users.preloader" 
        class="mx-auto overflow-hidden shadow-lg 
        mb-2 bg-gray-900 border-4 mt-2 -lg md:w-3/6 sm:w-4/6 
        border-gray-400">
        <div
            v-show="users.showMsgSuccess"
            class="p-4 mb-4 text-sm text-green-700 
            bg-green-100 dark:bg-green-200 
            dark:text-green-800" role="alert">
            <span class="font-medium">Sucesso!</span> Cliente atualizado com sucesso!
        </div>

        <h1 class="text-white ml-9 mt-7">Editar cliente: {{ name }}</h1>
        
        <form method="POST" 
            class="px-10 py-10" 
            action="#" 
            @submit.prevent="editClient()">
            <div class="flex flex-wrap">
                <div class="w-full">
                    <label for="name" class="leading-7 text-sm text-white">
                        Digite o nome
                    </label>
                    <input type="text" 
                        class="bg-gray-800 appearance-none 
                        rounded w-full py-2 px-3 text-white 
                        leading-tight focus:outline-none 
                        focus:shadow-outline" 
                        name="name" id="name" v-model="users.name">
                    <span 
                        class="text-red-600"
                        v-for="erro in users.errors.name" 
                        :key="erro.id">
                        {{erro}}
                    </span>
                </div>
    
                <div class="w-full">
                    <label for="email" class="leading-7 text-sm text-white">
                        Digite o e-mail
                    </label>
                    <input type="email" 
                        class="bg-gray-800 appearance-none 
                        rounded w-full py-2 px-3 text-white 
                        leading-tight focus:outline-none 
                        focus:shadow-outline" 
                        name="email" id="email" v-model="users.email">
                    <span 
                        class="text-red-600"
                        v-for="erro in users.errors.email" 
                        :key="erro.id">
                        {{erro}}
                    </span>
                </div>

                <div class="w-full">
                    <label for="phone" class="leading-7 text-sm text-white">
                        Digite o Telefone (opcional)
                    </label>
                    <input type="text" 
                        class="bg-gray-800 appearance-none 
                        rounded w-full py-2 px-3 text-white 
                        leading-tight focus:outline-none 
                        focus:shadow-outline" 
                        name="phone" id="phone" v-model="users.phone">
                    <span 
                        class="text-red-600"
                        v-for="erro in users.errors.phone" 
                        :key="erro.id">
                        {{erro}}
                    </span>
                </div>

                <div class="w-full">
                    <label for="cellphone" class="leading-7 text-sm text-white">
                        Digite o celular
                    </label>
                    <input type="text" 
                        class="bg-gray-800 appearance-none 
                        rounded w-full py-2 px-3 text-white 
                        leading-tight focus:outline-none 
                        focus:shadow-outline" 
                        name="cellphone" id="cellphone" v-model="users.cellphone">
                    <span 
                        class="text-red-600"
                        v-for="erro in users.errors.cellphone" 
                        :key="erro.id">
                        {{erro}}
                    </span>
                </div>

                <button
                    :disabled="users.loading"
                    class="mt-7 focus:outline-none text-white bg-green-700 
                    hover:bg-green-800 focus:ring-4 focus:ring-green-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
                    dark:bg-green-600 dark:hover:bg-green-700 
                    dark:focus:ring-green-800">
                    <span v-if="users.loading">Editando...</span>
                    <span v-else>Editar</span>
                </button>
            </div>
            <router-link :to="{name: 'users.index'}" 
                class="ml-2 font-medium text-blue-600 
                dark:text-blue-500 hover:underline">
                Voltar
            </router-link>
        </form>
    </div>
</template>
  
<script>
import UserService from '@/services/users.services';
import PreloaderSpinner from '@/components/PreloaderSpinner.vue'
import { onMounted, reactive } from 'vue';

export default {
    name: 'EditView',
    components: {
        PreloaderSpinner
    },
    props: {
        id: {
            require: true
        },
    },

    setup(props) {
        const users = reactive ({
            name: '',
            email: '',
            phone: '',
            cellphone: '',
            errors: '',
            showMsgSuccess: false,
            loading: false,
            preloader: false
        })

        onMounted(async () => {
            users.preloader = true

            UserService.getClient(props.id)
                        .then((response) => {
                            const value = response.data.data;
                            if (value.phone == 'Nenhum telefone cadastrado!') {
                                value.phone = ''
                            }
                            users.name      = value.name
                            users.email     = value.email
                            users.phone     = value.phone
                            users.cellphone = value.cellphone
                        })
                        .finally(() => {
                            users.preloader = false
                        })    
        })

        const editClient = () => {
            users.loading = true

            UserService.editClient(props.id, {...users})
                        .then((response) => {
                            if (response.data.updated == true) {
                                users.showMsgSuccess = true
                                
                                setTimeout(() => {
                                    users.showMsgSuccess = false
                                }, 4000);
                            }                     
                        })
                        .catch((error) => {
                            users.errors = error.response.data.errors;
                        })    
                        .finally(() => {
                            users.loading = false
                        })    
        }

        return {
            editClient,
            users
        }
    }
}
</script>
