
import UserService from '@/services/users.services';

const state = {
  users: []
}

const mutations = {
  SET_DADOS(state) {
    state.users = [];
  },

  DELETE_USER(state, userId) {
    state.users = state.users.filter((user) => user.id !== userId);
  }
}

const actions = {
  async fetchDados({ commit }) {
    const response = await UserService.getAll()
    commit('SET_DADOS', response.data)
    return response
  },

  async deleteUser({ commit }, userId) {
    const response = await UserService.deleteUser(userId);
    commit('DELETE_USER', userId);
    return response;
  }
}

export default {
  state,
  mutations,
  actions,
}