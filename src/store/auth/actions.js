import { api } from 'boot/axios';
import client from '../../config/client.js';

export const doLogin = async ({ commit, dispatch }, payload) => {
  await api.post('/login', payload).then((response) => {
    const token = response.data;
    commit('setToken', token);
    commit('SET_AUTH_USER', payload);
    commit('SET_USER_TOKEN', payload);
    api.defaults.headers.common.Authorization = `GITHUBTOKEN ${token.access}`;
    dispatch('getMe', token);
  });
};

export const doSignUp = async ({ commit, dispatch }, payload) => {
  await api.post('/register', payload).then((response) => {
    const token = response.data;
    commit('setToken', token);
    api.defaults.headers.common.Authorization = `GITHUBTOKEN ${token.access}`;
    dispatch('getMe', token);
  });
};

export function updateUserToken({ commit }, payload) {
  return client.patch(`/v1/api/${payload.id}`, payload)
    .then((response) => {
      const { data } = response;
      commit('SET_USER_TOKEN', data);
    });
}

export function getUserToken({ commit }, id) {
  return client.patch(`/v1/api/${id}`)
    .then((response) => {
      const { data } = response;
      commit('SET_USER_TOKEN', data);
    });
}

export const signOut = ({ commit }) => {
  api.defaults.headers.common.Authorization = '';
  commit('removeToken');
};

export const getMe = async ({ commit }, token) => {
  await api.get('validate/token', token.access).then((response) => {
    commit('setMe', response.data);
  });
};

export const init = async ({ commit, dispatch }) => {
  const token = localStorage.getItem('token');
  if (token) {
    await commit('setToken', JSON.parse(token));
    api.defaults.headers.common.Authorization = `JWT ${JSON.parse(token).access}`;
    dispatch('getMe', JSON.parse(token));
  } else {
    commit('removeToken');
  }
};
