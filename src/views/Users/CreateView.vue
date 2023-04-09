<template>
    <div class="mx-auto overflow-hidden shadow-lg mb-2 bg-gray-900 border-4 rounded-lg md:w-3/6 sm:w-4/6 border-gray-400">
        
        <div
            v-show="users.showMsgSuccess"
            class="p-4 mb-4 text-sm text-green-700 
            bg-green-100 dark:bg-green-200 
            dark:text-green-800" role="alert">
            <span class="font-medium">Sucesso!</span> Novo usuário cadastrado!
        </div>

        <h1 class="text-white ml-9 mt-7">Adicionar um novo usuário</h1>
        
        <form method="POST" 
            class="px-10 py-10" 
            action="#" 
            @submit.prevent="storeUser">
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
                    <label for="age" class="leading-7 text-sm text-white">
                        Digite sua idade
                    </label>
                    <input type="text" 
                        class="bg-gray-800 appearance-none 
                        rounded w-full py-2 px-3 text-white 
                        leading-tight focus:outline-none 
                        focus:shadow-outline" 
                        name="age" id="age" v-model="users.age">
                    <span 
                        class="text-red-600"
                        v-for="erro in users.errors.age" 
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
                    <span v-if="users.loading">Adicionando...</span>
                    <span v-else>Adicionar</span>
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
import { reactive } from 'vue';

export default {
    name: 'CreateView',
    setup() {
        const users = reactive ({
            name: '',
            email: '',
            age: '',
            errors: '',
            showMsgSuccess: false,
            loading: false
        })

        const storeUser = () => {
            users.loading = true

            UserService.storeUser({...users})
                        .then((response) => {
                            if (response.status == 201) {
                                users.showMsgSuccess = true
                                users.name = ''
                                users.email = ''
                                users.age = ''
                                users.errors = ''
                                
                                setTimeout(() => {
                                    users.showMsgSuccess = false
                                }, 4000);
                            }                     
                        })
                        .catch((error) => {
                            users.errors = error.response.data.errors;
                        })    
                        .finally(() => users.loading = false)    
        }

        return {
            storeUser,
            users
        }
    }
}
</script>
