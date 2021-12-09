<template>
 <div id="q-app">
     <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view/>
    </transition>
  </div>
</template>
<script>
// import { defineComponent } from 'vue';
import { api } from 'boot/axios';

export default ({
  name: 'App',
  beforeCreate() {
    this.$store.dispatch('auth/init');
    const token = this.$store.getters.getToken;
    if (token) {
      api.defaults.headers.common.Authorization = `GITHUBTOKEN ${token.access}`;
    } else {
      api.defaults.headers.common.Authorization = '';
    }
  },
  created() {
    this.$q.dark.set(false);
  },
});
</script>
