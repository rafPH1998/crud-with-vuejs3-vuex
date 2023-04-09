
import UserService from '@/services/users.services';

const state = {
  users: []
}

const mutations = {
  SET_DADOS(state, data) {
    state.users = data
  }
}

const actions = {
  async fetchDados({ commit }) {
    const response = await UserService.getAll()
    commit('SET_DADOS', response.data)
    return response
  }
}

export default {
  state,
  mutations,
  actions,
}