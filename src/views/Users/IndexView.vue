<template>

    <router-link 
        :to="{name: 'users.add'}"
        class="text-white bg-blue-700 
        hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
        font-medium rounded-lg text-sm px-5 py-2.5
        mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
        focus:outline-none dark:focus:ring-blue-800">
        +
    </router-link>
  
    <alert-success v-show="messageSuccess">
      Cliente deletado com sucesso!
    </alert-success>
  
    <UserEmpty v-show="showMessageEmpty">
      Nenhum registro cadastrado em nosso sistema!
    </UserEmpty>
  
    <PreloaderSpinner v-if="loading" />
  
    <table
      v-show="!showMessageEmpty"
      class="sm:rounded-lg w-5/6 text-sm text-left mt-10
            text-gray-500 dark:text-gray-400 shadow-2xl 
            bg-gray-900">
        <thead class="text-xs text-white uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Identificação
              </th>
              <th scope="col" class="py-3 px-6">
                Nome
              </th>
              <th scope="col" class="py-3 px-6">
                E-mail
              </th>
              <th scope="col" class="py-3 px-6">
                Idade
              </th>
            </tr>
        </thead>
        <tbody v-for="user in users" :key="user.id">            
          <tr class="hover:bg-gray-700">
            <td class="py-4 px-6">
              {{user.id}}
            </td>
            <td class="py-4 px-6">
              {{user.name}}
            </td>
            <td class="py-4 px-6">
              {{user.email}}
            </td>
            <td class="py-4 px-6">
              {{user.age}}
            </td>
            <td>
              <router-link 
                class="text-blue-500"
                :to="{name: 'users.edit', params: {id: user.id}}">editar
              </router-link>
            </td>
            <td>
              <a
                href="#"
                @click.prevent="deleteUser(user.id)"
                class="text-red-500">deletar
              </a>
            </td>
          </tr>
        </tbody>
    </table>
  </template>
  
  <script>
  
  import UserEmpty from '@/components/UserEmpty.vue'
  import PreloaderSpinner from '@/components/PreloaderSpinner.vue'
  import AlertSuccess from '@/components/AlertSuccess.vue'
  import { onMounted, ref } from 'vue';
  import { useStore } from 'vuex';

  export default {
    name: 'IndexView',
    components: {
      UserEmpty,
      PreloaderSpinner,
      AlertSuccess
    },
  
    setup(){
  
      const showMessageEmpty = ref(false);
      const messageSuccess = ref(false);
      const loading = ref(false);

      const users = ref([]);
      const store = useStore();

      const getUsers = async () => {
        try {
          const response = await store.dispatch('fetchDados');
          users.value = response.data.data;
          
          if (users.value.length == 0) showMessageEmpty.value = true

        } catch (error) {
          console.log(error);
        }
      };

      onMounted(() => {
        getUsers();
      });
  
      return {
        users,
        showMessageEmpty,
        messageSuccess,
        loading
      }
    }
  }
  </script>
  