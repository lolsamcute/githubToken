<template>
  <q-page class="bg-primary window-height window-width row justify-center items-center">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="~assets/login.svg" class="responsive" alt="login-image">
    </div>
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Github Token Login</h5>
      </div>
      <div class="row">

        <q-card square bordered class="q-pa-lg shadow-1">
          <form @submit.prevent="handleLogin" class="q-gutter-md">
          <q-card-section>
              <q-input
              square filled clearable
              v-model="login.email"
              label="Email"
              :rules="[
                val => !!val || 'Email is required',
                val => isValidEmail(val) || 'Invalid email'
              ]"
              />

              <q-input
              square filled clearable
              v-model="login.password"
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              :rules="[
                val => !!val || 'Password is required',
              ]"
              >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
           </q-input>

          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
            unelevated color="light-green-7"
            size="lg"
            class="full-width"
            label="Sign in"
            no-caps
            type="submit"
            />
          </q-card-actions>
         </form>
          <q-card-section class="text-center q-pa-none">
            <router-link class="text-grey-6" :to="{ name: 'signup'}">Not registered? Create an Account</router-link>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';
import Notify from 'src/helpers/notify.js';
import errorHandler from 'src/helpers/errorHandler.js';

export default {
  data() {
    return {
      isPwd: true,
      login: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    refs() {
      return [
        'email',
        'password',
      ];
    },
  },
  methods: {
    isValidEmail(email) {
      const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailValidationRegex.test(email.toLowerCase());
    },
    ...mapActions('auth', ['doLogin']),
    async handleLogin() {
      try {
        this.$q.loading.show();
        if (!this.login.email || !this.login.password) {
          Notify.error('Email or Password Incorrect');
          this.$q.loading.hide();
        } else if (this.login.password.length < 6) {
          Notify.error('Password Less than 6');
          this.$q.loading.hide();
        } else {
          await this.doLogin(this.login);
          this.$router.push({ name: 'dashboard' });
          Notify.success('Login Successful');
          this.$q.loading.hide();
        }
      } catch (err) {
        this.$q.loading.hide();
        const error = errorHandler(err);
        if (error.status === 400) {
          Notify.error('Email or Password Incorrect');
        }
        this.$q.loading.hide();
      }
    },
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
